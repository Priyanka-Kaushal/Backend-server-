const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../modelsDb/User");
const mongoose = require("mongoose");
const { generateToken, authToken } = require("../../middleware/auth");

const registeration = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      success: false,
      msg: "Validation errors",
      errors: errors.array(),
    });
  }
  const { first_name, last_name, email, password, role } = req.body;

  const allowedRoles = ["superadmin", "admin", "customer"];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    const userData = await newUser.save();

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

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      success: false,
      msg: "Validation errors",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = await generateToken({ id: user._id, email: user.email });

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      token: token,
      tokenType: "Bearer",
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const fetchPagedUsers = async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find({}, { first_name: 1 })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!users) {
      res.status(404).json({ message: "Users data not found" });
    }

    res.json({
      totalUsers,
      page,
      totalPages,
      users,
      message: "User pagination successful",
    });

    return res.json({
      totalUsers,
      page,
      users,
      totalPages: Math.ceil(totalUsers / limit),
      message: "User pagination successful",
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

const searchProfile = async (req, res) => {
  try {
    const searchKey = req.params.key;

    if (!searchKey) {
      return res.status(400).json({ message: "Search key is required" });
    }

    const userProfileSearch = await User.find({
      $or: [
        { first_name: { $regex: searchKey, $options: "i" } },
        { email: { $regex: searchKey, $options: "i" } },
      ],
    }).lean();

    if (userProfileSearch.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users: userProfileSearch });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

const roleFilter = async (req, res) => {
  try {
    const { role } = req.query;

    const data = await User.find().where("role").equals(req.query.role);

    if (data.length === 0) {
      return res.status(404).json({
        status: "success",
        message: `No users found with role: ${role}`,
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: `${role} filtered successfully`,
      data,
    });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        status: "false",
        message: error.message,
      });
    }
  }
};

module.exports = {
  registeration,
  login,
  fetchPagedUsers,
  searchProfile,
  roleFilter,
};
