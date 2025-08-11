const express = require('express');
const Posts = require('../models/post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (!Posts) {
      return res.status(500).json({ message: "Posts model is not defined" });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const post = await Posts.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);  // More detailed logging
    res.status(500).json({ message: error.message });
  }
});



router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;  // Extract user ID from the authenticated user
    const posts = await Posts.findAll({ where: { userId: userId } });  // Filter by userId
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

  

    router.get("/:id", authMiddleware, async (req, res, next) => {
        try {
          const post = await Posts.findByPk(req.params.id);
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
          res.status(200).json({ success: true, data: post });
        } catch (err) {
          next(err);
        }
      });
      
      // Update a post
      router.put("/:id", authMiddleware, async (req, res, next) => {
        const { title, content } = req.body;
        try {
          const post = await Posts.findByPk(req.params.id);
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
          await post.update({ title, content });
          res.status(200).json({ success: true, data: post, message: "Post updated successfully" });
        } catch (err) {
          next(err);
        }
      });
      
      // Delete a post
      router.delete("/:id", authMiddleware, async (req, res, next) => {
        try {
          const post = await Posts.findByPk(req.params.id);
          if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
          }
          await post.destroy();
          res.status(200).json({ success: true, message: "Post deleted successfully" });
        } catch (err) {
          next(err);
        }
      });  
    module.exports = router;