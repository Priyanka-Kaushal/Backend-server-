const mongoose = require("mongoose");
const Permission = require("../models/Permission");

const permissions = [
  {
    name: "create_product",
    description: "Create new product",
    is_default: ["admin", "superadmin"],
  },
  {
    name: "delete_product",
    description: "Create new product",
    is_default: ["admin", "superadmin"],
  },
  {
    name: "preview_products",
    description: "Create new product",
    is_default: ["admin", "superadmin"],
  },
  {
    name: "view_orders",
    description: "View customer orders",
    is_default: ["admin", "superadmin"],
  },
  {
    name: "assign_roles",
    description: "Assign user roles",
    is_default: ["superadmin"],
  },
  {
    name: "write_reviews",
    description: "Submit product reviews",
    is_default: ["user", "admin", "superadmin"],
  }
];

const seedPermissions = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/your_database_name");

    for (const permission of permissions) {
      const exists = await Permission.findOne({ name: permission.name });
      if (!exists) {
        await Permission.create(permission);
        console.log(`Permission "${permission.name}" added`);
      } else {
        console.log(`ℹPermission "${permission.name}" already exists`);
      }
    }

    console.log(" Permission seeding complete.");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedPermissions();
