const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { isLoggedIn } = require("../middlewares/auth");

router.post("/:postId", isLoggedIn, commentController.createComment);
router.post("/:commentId/delete", isLoggedIn, commentController.deleteComment);

module.exports = router;

app.js에 라우터 등록
const commentRoutes = require("./routes/comment");
app.use("/comments", commentRoutes);
