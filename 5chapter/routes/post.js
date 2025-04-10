const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/auth");

router.get("/", postController.getAllPosts);
router.get("/new", isLoggedIn, postController.getNewForm);
router.post("/", isLoggedIn, postController.createPost);
router.get("/:id", postController.getSinglePost);
router.get("/:id/edit", isLoggedIn, postController.getEditForm);
router.post("/:id/edit", isLoggedIn, postController.updatePost);
router.post("/:id/delete", isLoggedIn, postController.deletePost);

module.exports = router;
