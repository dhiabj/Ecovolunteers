const express = require("express");
const {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
  getPostsFromFacebook,
} = require("../controller/PostController");
const router = express.Router();
router.get("/facebookPosts/", getPostsFromFacebook);
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);

module.exports = router;
