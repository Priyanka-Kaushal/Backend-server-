//   const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");
// const User = require("../modelsDb/User");
// const { generateToken, verifyAuthToken } = require("../middleware/auth");
// const redisClient = require("../utils/redisClient");
// const sendOtpEmail = require("../utils/mailSender");
// const { signUpValidator, signInValidator } = require("../helpers/validatonMessages");

// // Sign Up Controller
// const signUp = async (req, res) => {
//   signUpValidator;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   const { first_name, last_name, email, password, role } = req.body;
//   const allowedRoles = ["superadmin", "admin", "user"];

//   if (!role || !allowedRoles.includes(role)) {
//     return res.status(400).json({ message: "Invalid or missing role" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();
   


//     // this is for OTP 
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await redisClient.setEx(`otp:${email}`, 300, otp); 
   
//     console.log("OTP:", otp);
//     await sendOtpEmail(email, otp);

//     const token = generateToken(newUser);

//     return res.status(200).json({
//       success: true,
//       message: `User registered successfully. OTP sent to email.`,
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//         is_verified: newUser.is_verified || false,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // OTP Verification Controller
// const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const storedOtp = await redisClient.get(`otp:${email}`);
//     if (!storedOtp || storedOtp !== otp) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.is_verified = true;
//     await user.save();

//     await redisClient.del(`otp:${email}`);

//     const token = generateToken(user);
//     console.log(token);

//     return res.status(200).json({
//       message: "OTP verified successfully",
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         is_verified: user.is_verified,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Sign In Controller
// const signIn = [
//   signInValidator,
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           message: "Validation failed",
//           errors: errors.array(),
//         });
//       }

//       const { email, password } = req.body;
//       console.log("SignIn attempt with email:", email);
//       console.log("Password received:", password);

//       const user = await User.findOne({
//         email: { $regex: new RegExp(`^${email}$`, "i") },
//       });

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: `User ${email} not found`,
//         });
//       }

//       console.log("Hashed password in DB:", user.password);

//       const isMatchPassword = await bcrypt.compare(password, user.password);
//       if (!isMatchPassword) {
//         return res.status(401).json({
//           success: false,
//           message: "Incorrect password",
//         });
//       }

//       const token = jwt.sign(
//         { id: user._id, email: user.email, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Sign in successfully",
//         token,
//         tokenType: "Bearer",
//         data: {
//           user: {
//             id: user._id,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email,
//             role: user.role,
//           },
//         },
//       });
//     } catch (error) {
//       console.error("SignIn error:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   },
// ];

// const loadUser = async (req, res) => {
//   const token = req.params.token;
//   const payload = verifyAuthToken(token);
//   if (!payload) return res.status(401).json({ message: "Invalid token" });

//   const user = await User.findById(payload.id).select("-password");
//   if (!user) return res.status(404).json({ message: "User not found" });

//   res.status(200).json({ user });
// };

// module.exports = { signUp, verifyOtp, signIn, loadUser };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../modelsDb/auth_model");
const { generateToken, verifyAuthToken } = require("../../middleware/auth");
const redisClient = require("../../utils/redisClient");
const sendOtpEmail = require("../../utils/mailSender");
const { signUpValidator, signInValidator } = require("../../helpers/validatonMessages");

// ================= SIGN UP =================
// const signUp = async (req, res) => {
//   signUpValidator;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   const { first_name, last_name, email, password, role } = req.body;
//   const allowedRoles = ["superadmin", "admin", "user"];

//   if (!role || !allowedRoles.includes(role)) {
//     return res.status(400).json({ message: "Invalid or missing role" });
//   }

//   try {
//     const existingUser = await User.findOne({
//       email: { $regex: new RegExp(`^${email}$`, "i") }, // case-insensitive match
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     // === OTP Generation ===
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await redisClient.setEx(`otp:${email}`, 300, otp);
//     console.log("OTP:", otp);
//     await sendOtpEmail(email, otp);

//     const token = generateToken(newUser);

//     return res.status(200).json({
//       success: true,
//       message: `User registered successfully. OTP sent to email.`,
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//         is_verified: newUser.is_verified || false,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const signUp = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   const { first_name, last_name, email, password } = req.body;

//   // Assign role based on email domain or exact email
//   let role = "user";
//   if (email === "ishani@yopmail.com") {
//     role = "superadmin";
//   } else if (email.endsWith("tushar@yopmail.com")) {
//     role = "admin";
//   }

//   const allowedRoles = ["superadmin", "admin", "user"];
//   if (!allowedRoles.includes(role)) {
//     return res.status(400).json({ message: "Invalid role assignment" });
//   }

//   try {
//     const existingUser = await User.findOne({
//       email: { $regex: new RegExp(`^${email}$`, "i") },
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await redisClient.setEx(`otp:${email}`, 300, otp);
//     await sendOtpEmail(email, otp);

//     const token = generateToken(newUser);

//     return res.status(200).json({
//       success: true,
//       message: `User registered successfully. OTP sent to email.`,
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//         is_verified: newUser.is_verified || false,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const signUp = async (req, res) => {
  signUpValidator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { first_name, last_name, email, password } = req.body;

  // Assign role based on specific email
  let role = "user";
  if (email === "ishani@yopmail.com") {
    role = "superadmin";
  } else if (email === "tushar@yopmail.com") {
    role = "admin";
  }

  try {
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`otp:${email}`, 300, otp);
    await sendOtpEmail(email, otp);

    const token = generateToken(newUser);

    return res.status(200).json({
      success: true,
      message: `User registered successfully. OTP sent to email.`,
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        is_verified: newUser.is_verified || false,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= VERIFY OTP =================
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_verified = true;
    await user.save();
    await redisClient.del(`otp:${email}`);

    const token = generateToken(user);
    console.log("Verified OTP Token:", token);

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= SIGN IN =================
const signIn = [
  signInValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;
      console.log("SignIn attempt with email:", email);

      const user = await User.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User ${email} not found`,
        });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);
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

module.exports = { signUp, verifyOtp, signIn, loginWithOtp, loadUser };
