const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/utils/db");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const User = require("./src/modelsDb/auth_model");
const { logger, morganMiddleware } = require("./src/logger/index");
const redisClient = require('./src/utils/redisClient');

dotenv.config();


const app = express();

connectDB();
const port = process.env.PORT || 4000;

  
app.use(cors({
  origin: '*', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

const authRoutes = require("./src/routes/authRoutes");
const permissionAccess = require("./src/routes/admin"); 
const blogRoutes = require("./src/routes/blogRoutes");
const blogCommentsRoutes = require("./src/routes/blogCommentsRoutes");
const productRoutes = require("./src/routes/productsRoutes");
const ordersDetails = require("./src/routes/ordersRoutes");
const cartRoutes = require("./src/routes/cartRoute");
// const wishlistRoutes = require("./src/routes/wishlistRouter");
// const authCallBack = require("./src/routes/authCallback");
const googleAuthRoutes = require("./src/routes/googleRoutes");
const contactRoutes =  require("./src/routes/publicRoutes/contactRoutes");

const whatsappRoutes = require("./src/routes/whatsappRoute");
// const whatsappWebhook = require("./src/routes/webhookwhatsapp");
const webhookRoutes = require("./src/routes/webhookRoute");


app.use("/api", whatsappRoutes);

app.use("/api/webhook", webhookRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRoutes);
app.use("/api/admin", permissionAccess);
app.use("/api/blogs", blogRoutes);
app.use("/api/blogs/comments", blogCommentsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersDetails);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
// app.use("/api/jumpcloud", authCallBack);
// app.use("/api/wishlist", wishlistRoutes);


app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
  logger.info(
    `Static files served from: ${path.join(__dirname, "public/uploads")}`
  );
});
