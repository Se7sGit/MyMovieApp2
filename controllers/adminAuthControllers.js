const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

async function createAdminController(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let admin = await User.findOne({ email: req.body.email });
    if (admin) {
      return res.status(400).json("User Already Exists!!");
    }
    admin = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      isAdmin: true,
    });
    await admin.save();
    let adminWithNoPassword = { ...admin };
    delete adminWithNoPassword._doc.password;
    adminWithNoPassword = adminWithNoPassword._doc;

    return res.status(200).json({ user: adminWithNoPassword });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function loginAdminController(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let admin = await User.findOne({ email: email, isAdmin: true });
    if (!admin) {
      return res.status(404).json("Wrong User or Password!!");
    }

    const comparedPassword = bcrypt.compareSync(
      req.body.password,
      admin.password
    );
    if (!comparedPassword) {
      return res.status(404).json("Wrong User or Password!!");
    }
    let adminWithoutPassword = { ...admin };
    delete adminWithoutPassword._doc.password;
    adminWithoutPassword = adminWithoutPassword._doc;
    // Generate JWT token
    const token = jwt.sign(adminWithoutPassword, process.env.JWT_ADMIN_SECRET, {
      expiresIn: "1111h",
    });
    //generate JWT token
    return res.status(200).json({ admin: adminWithoutPassword, token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createAdminController, loginAdminController };
