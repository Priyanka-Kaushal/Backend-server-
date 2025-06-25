// const { OAuth2Client } = require("google-auth-library");
// const jwt = require("jsonwebtoken");
// const GoogleAuth = require("../../modelsDb/auth_google_model");

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const JWT_SECRET = process.env.JWT_SECRET;

// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, picture } = payload;

//     let user = await GoogleAuth.findOne({ email });  // Use GoogleAuth here

//     if (!user) {
//       user = new GoogleAuth({
//         first_name: name?.split(' ')[0],
//         last_name: name?.split(' ')[1] || "",
//         email,
//         avatar: picture,
//         password: '',  
//         provider: "google",
//         role: "user",  
//       });

//       await user.save();
//     }

//     const appToken = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token: appToken, user });
//   } catch (error) {
//     console.error("Google Login Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { googleLogin }
// const { OAuth2Client } = require("google-auth-library");
// const jwt = require("jsonwebtoken");
// const GoogleAuth = require("../../modelsDb/auth_google_model");

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const JWT_SECRET = process.env.JWT_SECRET;

// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { token, user } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const { email, name, picture } = payload;

//     let user = await GoogleAuth.findOne({ email });

//     if (!user) {
//       user = new GoogleAuth({
//         first_name: name?.split(' ')[0],
//         last_name: name?.split(' ')[1] || "",
//         email,
//         avatar: picture,
//         provider: "google",
//         role: "user",
//       });
//       await user.save();
//     }

//     const appToken = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ success: true, token: appToken, user });
//   } catch (error) {
//     console.error("Google Login Error:", error.message);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// module.exports = { googleLogin };
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const GoogleAuth = require("../../modelsDb/auth_google_model");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await GoogleAuth.findOne({ email });

    if (!user) {
      user = new GoogleAuth({
        first_name: name?.split(" ")[0],
        last_name: name?.split(" ")[1] || "",
        email,
        avatar: picture,
        provider: "google",
        role: "user",
      });

      await user.save();
    }

    const appToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Respond with the token and user — no nesting inside `data`
    res.json({ success: true, token: appToken, user }); // ✅ This sends the token correctly

    // res.json({ token: appToken, user });
  } catch (error) {
    console.error("Google Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { googleLogin };
