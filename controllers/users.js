const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("User");

// Create
async function Create(req, res, next) {
  try {
    const user = new User(req.body);
    // Modify the password and hash it
    // base64 is NOT a secure hash, but works as example
    user.password = Buffer.from(user.password).toString("base64");
    const response = await user.save();
    return res.status(201).json(response);
  } catch (e) {
    next(e);
  }
}

// Read
async function Read(_, res, next) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (e) {
    next(e);
  }
}

// Update
async function Update(req, res, next) {}

// Delete
async function Delete(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  Create,
  Read,
  Update,
  Delete,
};
