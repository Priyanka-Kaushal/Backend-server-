const express = require("express");
const mongoose = require("mongoose");
const JWT = require("../../middleware/auth");
const Blog = require("../../modelsDb/Blog");
const { upload } = require("../../middleware/uploadFile"); // Multer middleware for image upload
const router = express.Router();
const BlogCommentDb = require("../../modelsDb/comment");

const blogCurator = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ error: "User authentication failed. ID missing." });
    }

    const image = req.file
      ? `http://localhost:3000/public/uploads/${req.file.filename}`
      : null;

    const newBlog = new Blog({
      title,
      description,
      image: image,
      author: req.user.id,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({ message: "Blog created", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataGet = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate({
      path: "comments",
      select: "text",
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataUpdate = async (req, res) => {
  try {
    const blogId = req.params.id;

    const existingBlogPost = await Blog.findById(blogId);

    if (!existingBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      updatedAt: Date.now(),
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDelete = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }

    const deleteBlogByid = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataGetAll = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  blogCurator,
  blogDataGet,
  blogDataUpdate,
  blogDelete,
  blogDataGetAll,
};
