const express = require("express");
const mongoose = require("mongoose");
const BlogCommentDb = require("../../modelsDb/comment");
const JWT = require("../../middleware/auth");
const User = require("../../modelsDb/User");
const comment = require("../../modelsDb/comment");
const Blog = require("../../modelsDb/Blog");

const blogComment = async (req, res) => {
  try {
    const { text, blog } = req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ error: "User authentication failed. ID missing." });
    }

    const blogData = await Blog.findById(blog).select("title description");

    if (!blogData) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const newComment = new BlogCommentDb({
      text,
      author: req.user.id,
      blog: blogData._id,
    });

    const comment_data = await newComment.save();

    await Blog.findByIdAndUpdate(
      blogData._id,
      {
        $push: { comments: comment_data._id },
      },
      { new: true }
    );

    const populatedComment = await BlogCommentDb.findById(comment_data._id)
      .populate("author", "first_name")
      .populate({
        path: "blog",
        select: "title description",
      });

    res.status(200).json({
      message: "Comment successful",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const commentDataget = async (req, res) => {
  try {
    const findBlogCommentById = await BlogCommentDb.findById(req.params.id)
      .populate("author", "first_name")
      .populate({
        path: "blog",
        select: "title description",
      });

    if (!findBlogCommentById) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(findBlogCommentById);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comment" });
  }
};

module.exports = { blogComment, commentDataget };
