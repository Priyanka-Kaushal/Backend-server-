const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    permissions: [
      {
        name: { type: String, required: true },
        permission_values: [
          { type: String, enum: ["create", "read", "update", "delete"] }
        ],
      }
    ]
  },
  { timestamps: true }
);

const UserPermission = mongoose.model("UserPermission", userPermissionSchema);

module.exports = UserPermission;