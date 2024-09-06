"use strict";

const User = require("../models/user");
const { BadRequestError, NotFoundError } = require("../expressError");

const userController = {};

userController.getUsers = async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
};

userController.getUser = async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

userController.updateUser = async function (req, res, next) {
  try {
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

userController.deleteUser = async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
};

userController.applyToJob = async function (req, res, next) {
  try {
    await User.applyToJob(req.params.username, req.params.id);
    return res.json({ applied: req.params.id });
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;