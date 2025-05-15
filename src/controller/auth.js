const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../modelsDb/User");
const { generateToken, verifyAuthToken } = require("../middleware/auth");
const redisClient = require("../utils/redisClient");
const sendOtpEmail = require("../utils/mailSender");
const { signUpValidator, signInValidator } = require("../helpers/validatonMessages");

// const signUp = async (req, res) => {
//   signUpValidator; 

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ success: false, errors: errors.array() });
//   }

//   const { first_name, last_name, email, password, role } = req.body;
 
//   const allowedRoles = ["superadmin", "admin", "user"];
  
//    // Validate role
//    if (!role || !allowedRoles.includes(role)) {
//     return res.status(400).json({ message: "Invalid or missing role" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(409).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // const newUser = await User.create({
//     //   first_name,
//     //   last_name,
//     //   email,
//     //   password: hashedPassword,
//     //   role,
//     // });

//     // const saveUser = newUser.save();

//      const newUser = new User({
//           first_name,
//           last_name,
//           email,
//           password: hashedPassword,
//           role,
//         });
    
//       await newUser.save();
      
          
//         const tokenNewUser = authToken(newUser);
// console.log(tokenNewUser);


//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await redisClient.setEx(`otp:${email}`, 300, otp);

//     console.log("otp :", otp);

//     await sendOtpEmail(email, otp);

//     const token = generateToken(newUser);
//     console.log(token);

//     return res.status(200).json({
//       success: true,
//       message: `User registered successfully with username ${first_name}. OTP sent to email.`,
//       token,
//       tokenNewUser,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const storedOtp = await redisClient.get(`otp:${email}`);
//   if (!storedOtp || storedOtp !== otp) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   user.is_verified = true;
//   await user.save();
//   await redisClient.del(`otp:${email}`);

//   const token = generateToken(user);
//   res.status(200).json({
//     message: "OTP verified",
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//       is_verified: true,
//     },
//   });
// };


// Sign Up Controller
const signUp = async (req, res) => {

  signUpValidator;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { first_name, last_name, email, password, role } = req.body;
  const allowedRoles = ["superadmin", "admin", "user"];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role" });
  }

  try {
    const existingUser = await User.findOne({ email });
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
    await redisClient.setEx(`otp:${email}`, 300, otp); // 5 minutes expiry

    console.log("OTP:", otp);
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

// OTP Verification Controller
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_verified = true;
    await user.save();

    await redisClient.del(`otp:${email}`);

    const token = generateToken(user);
    console.log(token);
    
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
      console.log("body data:", req.body);

      const user = await User.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },
      });

      console.log("user info :", user);


      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User  ${first_name} not found`,
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

const loadUser = async (req, res) => {
  const token = req.params.token;
  const payload = verifyAuthToken(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  const user = await User.findById(payload.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ user });
};

module.exports = { signUp, verifyOtp, signIn, loadUser };
