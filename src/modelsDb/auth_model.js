// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { Schema } = mongoose;
// const validator = require("validator");

// // Define the user schema first
// const userSchema = new mongoose.Schema(
//   {
//     first_name: {
//       type: String,
//       required: true,
//     },
//     last_name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: [true, "Email must be unique"],
//       trim: true,
//       // validate(value) {
//       //   if (!validator.isEmail(value)) {
//       //     throw new Error("Invalid email");
//       //   }
//       // },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     forgotPasswordCode: {
//       type: String,
//       select: false,
//     },
//     forgotPasswordCodeValidation: {
//       type: Number,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ["superadmin", "admin", "user"],
//       default: "user", //0 -> normal user, 1-> admin, 2-> super admin,
//     },
//     isVerified: { type: Boolean, default: false }, // Email verification flag
//   },
//   { timestamps: true }
// );

// // Pre-save hook to hash the password
// // userSchema.pre("save", async function (next) {
// //   console.log("preMethod :", this);
// //   if (!this.isModified("password")) {
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }
// //   next();
// // });

// // userSchema.pre("save", async function (next) {
// //   console.log("preMethod :", this);
// //   if (this.isModified("password")) {
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }
// //   next();
// // });



// // UserSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) {
// //         this.password = await bcrypt.hash(this.password, 10);
// //       }

// //   if (this.isModified("role") && this.role === 1) {
// //     console.log("here role is 1");
// //     this.orders = [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Order",
// //       },
// //     ];
// //     this.products = [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Product",
// //       },
// //     ];
// //   }

// //   next();
// // });


// // Method to compare entered password with hashed password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   console.log(" compare :", enteredPassword);
//   return bcrypt.compareSync(enteredPassword, this.password);
// };

// // Create the User model using the userSchema
// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const validator = require("validator");

// Define the user schema
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
      // select: false,
    },
    forgotPasswordCode: {
      type: String,
      select: false,
    },
    forgotPasswordCodeValidation: {
      type: Number,
      select: false,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance method to compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;



