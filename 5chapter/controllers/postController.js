const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author").sort({ createdAt: -1 });
  res.render("posts/index", { posts });
};

exports.getNewForm = (req, res) => {
  res.render("posts/new");
};

exports.createPost = async (req, res) => {
  await Post.create({
    title: req.body.title,
    body: req.body.body,
    author: req.session.user._id,
  });
  res.redirect("/posts");
};

exports.getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author");
  res.render("posts/show", { post });
};

exports.getEditForm = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.author.equals(req.session.user._id)) {
    return res.status(403).send("수정 권한이 없습니다.");
  }
  res.render("posts/edit", { post });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.author.equals(req.session.user._id)) {
    return res.status(403).send("수정 권한이 없습니다.");
  }
  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();
  res.redirect("/posts/" + req.params.id);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.author.equals(req.session.user._id) && !req.session.user.isAdmin) {
    return res.status(403).send("삭제 권한이 없습니다.");
  }
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
};

const Comment = require("../models/Comment");

exports.getSinglePost = async (req, res) => {
	const post = await Post.findById(req.params.id).populate("author");
  
	const allComments = await Comment.find({ post: post._id })
	  .populate("author")
	  .sort({ createdAt: 1 });
  
	const comments = allComments.filter(c => !c.parentComment);
	const replies = allComments.filter(c => c.parentComment);
  
	res.render("posts/show", { post, comments, replies });
  };
  