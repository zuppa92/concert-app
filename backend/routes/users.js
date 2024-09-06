"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

// Register a new user (admin-only route)
router.post("/", authenticateJWT, ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

// Get all users (admin-only route)
router.get("/", authenticateJWT, ensureAdmin, async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

// Get the current user's profile
router.get("/me", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    console.log("res.locals.user:", res.locals.user); // Debugging line
    const user = await User.get(res.locals.user.username);
    return res.json({ user });
  } catch (err) {
    console.error(err); // Log error for debugging
    return next(err);
  }
});

// Get a specific user by username
router.get("/:username", authenticateJWT, ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

// Update a user's information
router.patch("/:username", authenticateJWT, ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

// Delete a user by username
router.delete("/:username", authenticateJWT, ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;