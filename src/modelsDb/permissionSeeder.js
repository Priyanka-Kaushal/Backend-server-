const mongoose = require("mongoose");

[
    {
      name: "create_product",
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
  ]
  