const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const {
  blogCurator,
  blogDataGet,
  blogDataUpdate,
  blogDelete,
  blogDataGetAll,
} = require("../controller/Blogs/blogs");
const upload = require("../middleware/uploadFile");

// console.log("Upload Middleware:", upload);// Debugging

router.post("/blogPost", verifyToken, upload.single("imageNew"), blogCurator);

router.get("/blogpost/:id", blogDataGet);
router.put("/blogpost/:id", verifyToken, blogDataUpdate);
router.delete("/blogpost/:id", verifyToken, blogDelete);
router.get("/blogposts", blogDataGetAll);

module.exports = router;
