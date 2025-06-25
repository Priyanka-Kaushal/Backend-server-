// const express = require("express");
// const { body } = require("express-validator");
// // const {Permission} = require("../modelsDb/PermissionModel");
// const jwt = require("jsonwebtoken");
// const router = express.Router();
// const {
//   addPermission,
// } = require("../controller/accessPermission/permissionController");

// const { permissionAddValidator } = require("../helpers/adminValidator");

// // Register route
// router.post("/add-permission", permissionAddValidator, addPermission);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { authenticate, authorize } = require("../middleware/authMiddleware");

// // router.post("/superadmin", authenticate, authorize("superadmin", "admin"), (req, res) => {
// //   res.json({ message: "Access granted to Super Admin" });
// // });

// // router.post("/admin", authenticate, authorize("admin", "user"), (req, res) => {
// //   res.json({ message: "Access granted to Admin or higher" });
// // });

// // router.post("/user", authenticate, authorize("user"), (req, res) => {
// //   res.json({ message: "Access granted to user or higher" });
// // });

// router.post("/admin", authenticate, authorize("admin", "user"), (req, res) => {
//   res.json({ message: "Access granted to Admin or higher" });
// });


// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { permissionAddValidator } = require("../helpers/validators/permissionValidator");
// const { signInValidator, Validate } = require("../middleware/validate");
// const checkRole = require("../middleware/roleBased");
// const authenticate = require("../middleware/authMiddleware");
// const { addPermission } = require("../controller/accessPermission/permissionController");

// router.post(
//   "/add-permission",
//   authenticate,
//   checkRole(["superadmin"]),
//   permissionAddValidator,
//   Validate,
//   addPermission
// );

// module.exports = router;


// const express = require("express");
// const router = express.Router();


// const validate = require("../middleware/validate"); 
// const checkRole = require("../middleware/roleBased");   
// const authenticate = require("../middleware/authMiddleware");
// const permissionAddValidator = require("../helpers/validators/permissionValidator");
// const addPermission = require("../controller/accessPermission/permissionController");


// router.post(
//   "/add-permission",
//   authenticate,                 
//   checkRole(["superadmin"]),  
//   permissionAddValidator,     
//   validate,                  
//   addPermission             
// );

// module.exports = router;


const express = require("express");
// const { body } = require("express-validator");
// const {Permission} = require("../modelsDb/PermissionModel");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { addPermission } = require("../controller/accessPermission/permissionController");

// Import validator
const { permissionAddValidator } = require("../helpers/adminValidator");

// Register route
router.post("/add-permission", permissionAddValidator, addPermission);

module.exports = router;