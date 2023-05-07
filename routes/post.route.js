const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authCheck = require("../middlewares/authcheck");

router.get("/", postController.getAllPosts);
router.post("/", authCheck, postController.createPost);

module.exports = router;
