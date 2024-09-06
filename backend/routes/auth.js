// backend/routes/auth.js
const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const { generateToken } = require("../helpers/tokens");
const { BadRequestError, UnauthorizedError } = require("../expressError");
const jsonschema = require("jsonschema");
const userRegisterSchema = require("../schemas/userRegister.json");
const userAuthSchema = require("../schemas/userAuth.json");

// Route to register a new user
router.post("/register", async function (req, res, next) {
  try {
    // Validate the request body against the user registration schema
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    // Register the user and generate a token
    const newUser = await User.register(req.body);
    const token = generateToken({ username: newUser.username, isAdmin: newUser.isAdmin });

    console.log("User registered:", newUser); // Add logging
    console.log("Token generated:", token); // Add logging

    return res.status(201).json({ token });
  } catch (err) {
    console.error("Error in /auth/register:", err); // Ensure errors are logged for debugging
    return next(err);
  }
});

// Route to log in an existing user
router.post("/login", async function (req, res, next) {
  try {
    // Validate the request body against the user authentication schema
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    console.log("Attempting to authenticate user:", username); // Add logging
    const user = await User.authenticate(username, password);

    if (!user) {
      throw new UnauthorizedError("Invalid username/password");
    }

    const token = generateToken({ username: user.username, isAdmin: user.isAdmin });
    console.log("Token generated:", token); // Add logging

    return res.json({ token });
  } catch (err) {
    console.error("Error in /auth/login:", err); // Ensure errors are logged for debugging
    return next(err);
  }
});

module.exports = router;