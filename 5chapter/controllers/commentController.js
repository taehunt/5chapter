const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
	const { content, parentId } = req.body;
  
	await Comment.create({
	  content,
	  author: req.session.user._id,
	  post: req.params.postId,
	  parentComment: parentId || null,
	});
  
	res.redirect("/posts/" + req.params.postId);
  };  

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment.author.equals(req.session.user._id) && !req.session.user.isAdmin) {
    return res.status(403).send("삭제 권한이 없습니다.");
  }
  await Comment.findByIdAndDelete(req.params.commentId);
  res.redirect("/posts/" + comment.post);
};
