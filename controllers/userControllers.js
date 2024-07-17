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
async function signupUserController(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json("User Already Exists!!");
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // Generate JWT token
    const userWithNoPwrd = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
    const token = jwt.sign(userWithNoPwrd, "se7s", { expiresIn: "1111h" });
    //generate JWT token

    return res.status(200).json({ user: userWithNoPwrd }, { token: token });
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
