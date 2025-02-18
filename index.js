const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./src/utils/db");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files correctly
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

// Import Routes
const userRoutes = require("./src/routes/userRoutes");
const blogRoutes = require("./src/routes/blogRoutes");
const blogCommentsRoutes = require("./src/routes/blogCommentsRoutes");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs/comments", blogCommentsRoutes);
// app.use("/api", blogRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
  console.log(` Static files served from: ${path.join(__dirname, "public")}`);
});

