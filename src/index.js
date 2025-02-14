const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./utils/db");
const cors = require("cors");


// Import Routes
const userRoutes = require("./routes/userRoutes");
// const superAdminRoutes = require("./routes/superAdmin");
const blogRoutes = require("./routes/blogRoutes");

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enable CORS

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/superAdmin", superAdminRoutes);
if (!blogRoutes) {
  console.error("Error: blogRoutes is undefined");
} else {
  app.use("/api/blogs", blogRoutes);
}


// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
