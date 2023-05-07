const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // post to which this comment belongs to
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  // comment to which this comment is a reply to
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
