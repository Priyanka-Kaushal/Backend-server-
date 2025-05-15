const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/utils/db");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./src/modelsDb/User");
const { logger, morganMiddleware } = require("./src/logger/index");

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

const authRoutes = require("./src/routes/userRoutes"); 
const permissionAccess = require("./src/routes/admin"); 
const blogRoutes = require("./src/routes/blogRoutes");
const blogCommentsRoutes = require("./src/routes/blogCommentsRoutes");
const productRoutes = require("./src/routes/productsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", permissionAccess);
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs/comments", blogCommentsRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`);
  logger.info(
    `📂 Static files served from: ${path.join(__dirname, "public/uploads")}`
  );
});
