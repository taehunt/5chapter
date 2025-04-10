const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

router.get("/dashboard", isLoggedIn, isAdmin, (req, res) => {
  res.render("admin");
});

module.exports = router;
