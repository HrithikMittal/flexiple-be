const Post = require("../models/post.model");

const getAllPosts = async (req, res) => {
  try {
    // get all the posts without parent_id
    const posts = await Post.find({
      parentId: null,
    }).populate("user", "name email profileImage");
    // get all the posts with parent_id = 123, 989, 656
    const replies = await Post.find({
      parentId: {
        $in: posts.map((post) => post._id),
      },
    }).populate("user", "name email profileImage");

    const postsWithReplies = posts.map((post) => {
      const postReplies = replies.filter(
        (reply) => reply.parentId.toString() === post._id.toString()
      );
      return {
        ...post._doc,
        replies: postReplies,
      };
    });

    res.status(200).json({ data: postsWithReplies, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPost = async (req, res) => {
  try {
    const { content, parentId, replyTo } = req.body;

    const post = await Post.create({
      content: content,
      user: req.user.id,
      parentId: parentId,
      replyTo: replyTo,
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const upvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const newPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { likes: req.user.id },
      },
      { new: true }
    );
    return res.json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  upvotePost,
};
