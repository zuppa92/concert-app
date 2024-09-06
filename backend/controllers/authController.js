// authController.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

const SECRET_KEY = process.env.SECRET_KEY || 'my_secure_secret_key';
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;

// Register route
router.post('/register', async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      throw new BadRequestError('Missing required fields');
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(BCRYPT_WORK_FACTOR));
    const user = await User.register({ firstName, lastName, email, username, password: hashedPassword });

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    return res.status(201).json({ token });
  } catch (err) {
    console.error('Error in /auth/register:', err);
    return next(err);
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError('Missing required fields');
    }

    const user = await User.authenticate(username, password);

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error in /auth/login:', err);
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({ error: { message: err.message } });
    }
    return next(err);
  }
});

module.exports = router;