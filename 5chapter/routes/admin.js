const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.get("/dashboard", isLoggedIn, isAdmin, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  const posts = await Post.find().populate("author").sort({ createdAt: -1 });
  const comments = await Comment.find().populate("author").populate("post").sort({ createdAt: -1 });

  // 통계
  const userCount = users.length;
  const postCount = posts.length;
  const commentCount = comments.length;

  res.render("admin/dashboard", {
    users,
    posts,
    comments,
    userCount,
    postCount,
    commentCount,
  });
});

module.exports = router;
