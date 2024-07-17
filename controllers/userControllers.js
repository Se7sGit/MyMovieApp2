const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    if (!users[0]) {
      return res.status(404).json("NO USERS AVAILABLE!");
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User Not Found!");
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json("User deleted successfully!");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteUserById, getAllUsers };
