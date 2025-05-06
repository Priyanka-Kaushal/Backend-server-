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
  console.log("bodyyyyyy :", req.body);




  
    
  // Allowed roles
  const allowedRoles = ["admin", "customer"];

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


    console.log("newwwww user: ", newUser);
    //  new user data is savedclea
    const userData = await newUser.save();

    //  auth token is created for the new user creation
    const tokenNewUser = authToken(newUser);
    console.log(tokenNewUser);

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
    const token = await generateToken({ id: user._id, email: user.email});

    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      token: token,
      tokenType: "Bearer",
      data: {
        // token,
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
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getPaginatedUsers = async (req, res) => {
  try {
    console.log("Query Params:", req.query);
    let { page = 1, limit = 5 } = req.query;
   
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 5; // Default to 5 users per page
    const skip = (page - 1) * limit;
   
    //Get total user count first
    const totalUsers = await User.countDocuments();
    console.log({ message : "totalUsers"});
    const totalPages = Math.ceil(totalUsers / limit);
    
    // Fetch paginated users with limit
    const users = await User.find({}, { first_name: 1 }).skip(skip).limit(limit).sort({ createdAt: -1 });
    console.log("Fetched Users:", users);
    
    if(!users){
      res.status(404).json({message: "Users data not found"});
   }
    // Send a single response
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


const userProfileSearching = async (req, res) => {
  try {
      console.log("message :", req.params.key);
    const searchKey = req.params.key; // Now using req.params.key
    
    console.log("searchKey :", searchKey);
    if (!searchKey) {
      return res.status(400).json({ message: "Search key is required" });
    }

    const userProfileSearch = await User.find(
      {
        "$or": [
          { "first_name": { $regex: searchKey, $options: "i" } }, // Case-insensitive search
          { "email": { $regex: searchKey, $options: "i" } }
        ]
      }
    ).lean();

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


const userRoles_filter = async(req, res) => {
  try{
    console.log(req.query); 

    // Extract role from query parameters
    const { role } = req.query;
    
    // Ensure role exists in query before filtering
    // const filter = role ? { role } : {};  

    // Fetch users based on the filter
    // const data = await User.find( filter);
    // const data = await User.find( {role: req.query.role}); //we will add the + if we want value in numbers
    // const data = await User.find( req.query);
    const data = await User.find().where("role").equals(req.query.role);
    console.log("Filtered users:", data);

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
  }catch(error){
    if (!res.headersSent) {
      res.status(500).json({ 
        status: "false",
         message: error.message 
        });
    }
  }
}


module.exports = {
  registerPost,
  loginUser,
  getPaginatedUsers,
  userProfileSearching,
  userRoles_filter
};
