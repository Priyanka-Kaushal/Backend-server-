const express = require("express");
const router = express.Router();
const {
  blogComment,
  commentDataget,
} = require("../controller/BlogComments/blogComments");
const {isAuthenticated} = require("../middleware/index");


router.post("/blogComment", isAuthenticated, blogComment);
router.get("/blogComment/:id", commentDataget);

module.exports = router;
