const express = require("express");
const mongoose = require("mongoose");
const BlogCommentDb = require("../../modelsDb/comment"); // ✅ Correct import
const JWT = require("../../middleware/auth");
// const Blog = require("../../modelsDb/Blog"); // Assuming Blog model exists
const User = require("../../modelsDb/User"); 
const comment = require("../../modelsDb/comment");
const Blog = require("../../modelsDb/Blog");


const blogComment = async (req, res) => {
        try {
          console.log("Request Body:", req.body);
      
          const { text, blog } = req.body; // assuming the blog ID is also sent in the body
      
          console.log("User object:", req.user);

          if (!req.user || !req.user.id) {
            return res
              .status(400)
              .json({ error: "User authentication failed. ID missing." });
          }
          
          const blogData = await Blog.findById(blog).select('title description'); // select only title and description
              console.log( "blogData :", blogData);

    if (!blogData) {
      return res.status(404).json({ error: "Blog not found." });
    }

    
          const newComment = new BlogCommentDb({
            text,
            author: req.user.id, 
            blog: blogData._id,
          });
      
          console.log("newComment data:", newComment);
      
          const comment_data = await newComment.save();
          console.log("saved data:", comment_data);
      
          // Populate the author field with user's name after saving the comment
          const populatedComment = await BlogCommentDb.findById(comment_data._id).populate('author', 'first_name').populate({
            path: "blog", 
            select: "title description", // Fields to populate from the Blog model
          });;
         
          res.status(200).json({
            message: "Comment successful",
            comment: populatedComment, // Return the populated comment
          });
        } catch (error) {
          res.status(500).json({ "errorlast ": error.message });
        }
      };

const commentDataget = async (req, res) => {
      try {
    

        const findBlogCommentById = await BlogCommentDb.findById(req.params.id).populate('author', 'first_name').populate({
            path: "blog", 
            select: "title description", // Fields to populate from the Blog model
          });;
    
        if (!findBlogCommentById) {
          return res.status(404).json({ error: "Comment not found" });
        }
    
        res.status(200).json(findBlogCommentById);
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve comment" });
      }
    };
  

module.exports = { blogComment, commentDataget };
