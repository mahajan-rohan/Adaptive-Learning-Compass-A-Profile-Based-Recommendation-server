const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
