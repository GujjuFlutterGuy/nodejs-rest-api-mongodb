const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Post = require("../models/Post");

//get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//create a post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific post
router.get("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.findById(req.params.postId);
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete the post
router.delete("/:postId", async (req, res) => {
  try {
    const post = await Post.remove({ _id: req.params.postId });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//update the post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );

    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
