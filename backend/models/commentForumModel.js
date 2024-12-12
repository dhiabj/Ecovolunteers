const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: false,
  },
  rootid: {
    type: mongoose.ObjectId,
    required: false,
  },
  parentid: {
    type: mongoose.ObjectId,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});
const CommentForum = mongoose.model("CommentForum", schema);

module.exports = CommentForum;
