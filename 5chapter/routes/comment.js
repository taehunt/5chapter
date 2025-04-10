const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { isLoggedIn } = require("../middlewares/auth");

router.post("/:postId", isLoggedIn, commentController.createComment);
router.post("/:commentId/delete", isLoggedIn, commentController.deleteComment);

module.exports = router;