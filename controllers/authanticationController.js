const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

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
      //   isAdmin: newUser.isAdmin, // Default user is not admin
    };
    const token = jwt.sign(userWithNoPwrd, process.env.JWT_SECRET, {
      expiresIn: "1111h",
    });
    //generate JWT token

    return res.status(200).json({ user: userWithNoPwrd, token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("Wrong User or Password!!");
    }

    const comparedPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!comparedPassword) {
      return res.status(401).json("Wrong User or Password!!");
    }
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    userWithoutPassword = userWithoutPassword._doc;
    // Generate JWT token
    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
      expiresIn: "1111h",
    });
    //generate JWT token
    return res.status(200).json({ user: userWithoutPassword, token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { signupUserController, loginUserController };
