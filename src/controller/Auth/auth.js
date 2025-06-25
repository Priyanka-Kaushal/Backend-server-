const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../../modelsDb/auth_model");
const { generateToken } = require("../../middleware/auth");
const redisClient = require("../../utils/redisClient");
const {sendOtpEmail} = require("../../utils/mailSender");

const { signUpValidator, signInValidator } = require("../../helpers/validatonMessages");

const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { first_name, last_name, email, password } = req.body;

  let role = "user";
  if (email === "ishani@yopmail.com") role = "superadmin";
  else if (email === "tushar@yopmail.com") role = "admin";

  try {
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUser) {
      if (!existingUser.password) {
        return res.status(400).json({
          success: false,
          message: "This account was created using Google. Please log in using Google.",
        });
      }
      return res.status(409).json({ message: "This email is already associated with an account." });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      password, 
      role,
      isVerified: false,
    });

    await newUser.save(); 

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
await redisClient.setEx(`otp:${email.toLowerCase()}`, 300, otp);
console.log("OTP stored in Redis:", otp);
await sendOtpEmail(email, otp);


    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email.",
      token,
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ================= VERIFY OTP =================

const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    const lowerEmail = email.toLowerCase();

    const storedOtp = await redisClient.get(`otp:${lowerEmail}`);
    console.log("🔍 Entered OTP:", code);
    console.log("📦 Stored OTP:", storedOtp);
    

     if (!storedOtp) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (storedOtp !== code) {
      return res.status(400).json({ message: "OTP is incorrect. Please enter the correct OTP." });
    }
   
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${lowerEmail}$`, "i") },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isVerified = true;
    await user.save();
    await redisClient.del(`otp:${lowerEmail}`);

    const token = generateToken(user);
    
    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error(" OTP verification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ================= SIGN IN ================

const signIn = [
  signInValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password } = req.body;
      console.log("🔑 SignIn Email:", email);
      console.log("🔑 SignIn Password:", password);

      const user = await User.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this email",
        });
      }

      if (!user.password) {
        return res.status(400).json({
          success: false,
          message: "This account was created using Google. Please log in using Google.",
        });
      }

      console.log("🛡️ Stored Hashed Password:", user.password);
      const isMatchPassword = await bcrypt.compare(password, user.password);
      console.log("🔍 Password Match:", isMatchPassword);

      if (!isMatchPassword) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Sign in successfully",
        token,
        tokenType: "Bearer",
        data: {
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
      console.error("SignIn error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
];

// ================= LOGIN WITH OTP =================
const loginWithOtp = async (req, res) => {
  const { email } = req.body;
  console.log("Login with OTP - Email:", email);

  try {
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`otp:${email}`, 300, otp);
    console.log("Login OTP:", otp);
    await sendOtpEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("loginWithOtp error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= LOAD USER =================
const loadUser = async (req, res) => {
  const token = req.params.token;
  const payload = verifyAuthToken(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  const user = await User.findById(payload.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with this email" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { signUp, verifyOtp, signIn, loginWithOtp, loadUser, forgotPassword };
