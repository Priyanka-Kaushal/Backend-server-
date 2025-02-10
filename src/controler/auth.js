const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../modelsDb/User");
const mongoose = require("mongoose");
const { generateToken, authToken } = require("../middleware/auth");

// registraion in the role of customer, admin, super admin
const registerPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      success: false,
      msg: "Validation errors",
      errors: errors.array(),
    });
  }
  const { first_name, last_name, email, password, role } = req.body;

  // Allowed roles
  const allowedRoles = ["superadmin", "admin", "customer"];

  // Validate role
  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    // return hashedPassword;

    // Create new user
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    //  new user data is saved
    const userData = await newUser.save();

    //  auth token is created for the new user creation
    const tokenNewUser = authToken(newUser);

    res.status(201).json({
      message: `${role} created successfully`,
      userData,
      tokenNewUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// admin, super admin and customer all are able to login
const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      success: false,
      msg: "Validation errors",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  console.log("body data:", req.body);

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    console.log("user info :", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // password compare  with user id already created
    const isMatchPassword = await user.comparePassword(password);
    console.log("result password:", isMatchPassword);

    if (!isMatchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // token export from middleware auth file
    const token = await generateToken({ id: user._id });

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      token: token,
      tokenType: "Bearer",
      data: {
        // token,
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


module.exports = {
  registerPost,
  loginUser,
};
