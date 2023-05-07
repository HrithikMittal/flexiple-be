const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authCheck = require("../middlewares/authcheck");

router.get("/", postController.getAllPosts);
router.post("/", authCheck, postController.createPost);
router.post("/:postId/upvote", authCheck, postController.upvotePost);

module.exports = router;
