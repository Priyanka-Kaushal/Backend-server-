const mongoose = require("mongoose");

// Define the permission schema
const permissionSchema = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true // create, read, update, delete
  },
  is_default: {
    type: String,
    default: "customer" // Default permission type
  }
}, { timestamps: true });

// Create the Permission model using the permissionSchema
const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;