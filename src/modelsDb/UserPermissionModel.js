const mongoose = require("mongoose");

// Define the user schema first
const userPermissionSchema = new mongoose.Schema(
  {
    // which kind of permission acces by the user lik customer, admin, admin etc
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    permissions: {
      permission_name: String,
      permision_value: [String], //create, read, update, delete
    },
  },
  { timestamps: true }
);

// Create the User model using the userSchema
const User = mongoose.model("UserPermission", userPermissionSchema);
