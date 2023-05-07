const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authCheck = require("../middlewares/authcheck");

router.get("/", postController.getAllPosts);
router.post("/", authCheck, postController.createPost);
router.post("/:postId/upvote", authCheck, postController.upvotePost);
router.post("/:postId/downvote", authCheck, postController.downvotePost);
router.delete("/:postId", authCheck, postController.deletePost);
router.put("/:postId", authCheck, postController.updatePost);

module.exports = router;
