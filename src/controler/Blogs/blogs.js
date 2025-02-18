const express = require("express");
const mongoose = require("mongoose");
const JWT = require("../../middleware/auth");
const Blog = require("../../modelsDb/Blog");
const {upload} = require("../../middleware/uploadFile"); // Multer middleware for image upload
const router = express.Router();

const blogCurator = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // console.log("Uploaded File:", req.file);

    const { title, description } = req.body;
    // console.log("Authenticated User:", req.user);

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ error: "User authentication failed. ID missing." });
    }
     
    const image = req.file ? `http://localhost:3000/public/uploads/${req.file.filename}` : null;
 

    const newBlog = new Blog({
      title,
      description,
      image: image,
      author: req.user.id,
    });

    const savedBlog = await newBlog.save();

    // console.log("dataatatatatatatt save:", savedBlog);

    res.status(201).json({ message: "Blog created", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataGet = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author", "first_name"
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataUpdate = async (req, res) => {
  try {
    // Extract the blog post ID from the request parameters
    const blogId = req.params.id;
    // console.log("request data:", postId);

    // Retrieve the existing blog post from the database
    const existingBlogPost = await Blog.findById(blogId);
    // console.log("Data retrieved:", existingBlogPost);

    if (!existingBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Update the blog post with new data
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      // title: req.body.title,
      // description: req.body.description,
      updatedAt: Date.now(),
      new: true, // Return the updated document
      runValidators: true, // Ensure the update follows schema validation
    });

    // console.log("Blog after update:", updatedBlog);

    return res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    // console.error("Error updating blog:", error);
    res.status(500).json({ error: error.message });
  }
};

const blogDelete = async (req, res) => {
  try {
    const postId = req.params.id;
    // console.log("request data:", postId);

    const blog = await Blog.findById(postId);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
    }

    const deleteBlogByid = await Blog.findByIdAndDelete(req.params.id);
    // console.log("Blog after delte:", deleteBlogByid);
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blogDataGetAll = async (req, res) => {
  try {
    // Assuming you are using MongoDB with Mongoose
    const blogs = await Blog.find();  // Fetch all blogs from your Blog collection
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);  // Return the list of blogs
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { blogCurator, blogDataGet, blogDataUpdate, blogDelete, blogDataGetAll };
