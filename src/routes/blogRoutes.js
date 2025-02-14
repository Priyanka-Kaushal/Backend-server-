const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const {blogCurator, blogDataGet, blogDataUpdate, blogDelete, imageUpload}  = require("../controler/Blogs/blogs"); 
const multer  = require("multer");
const fileUpload = require('express-fileupload');
const path = require("path");
const upload = require("../middleware/uploadFile");

console.log("blogCurator:", upload); // Debugging

router.post("/blogPost", verifyToken, upload.single("imageLion"), blogCurator);


router.get("/blogpost/:id", blogDataGet);
router.put("/blogpost/:id", verifyToken, blogDataUpdate);
router.delete("/blogpost/:id", verifyToken, blogDelete);

module.exports = router;