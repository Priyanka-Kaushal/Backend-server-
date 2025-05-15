const express = require("express");
const { verifyAuthToken } = require("../middleware/auth");
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

router.post("/blogPost", verifyAuthToken, upload.single("imageNew"), blogCurator);

router.get("/blogpost/:id", blogDataGet);
router.put("/blogpost/:id", verifyAuthToken, blogDataUpdate);
router.delete("/blogpost/:id", verifyAuthToken, blogDelete);
router.get("/blogposts", blogDataGetAll);

module.exports = router;
