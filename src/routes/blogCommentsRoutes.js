const express = require("express");
const router = express.Router();
const {
  blogComment,
  commentDataget,
} = require("../controller/BlogComments/blogComments");
const { authenticate } = require("../middleware/authMiddleware");

router.post("/blogComment", authenticate, blogComment);
router.get("/blogComment/:id", commentDataget);

module.exports = router;
