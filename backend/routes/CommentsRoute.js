const express = require("express");
const router = express.Router();
const Comment = require("../models/comments");

router.route("/comments/:postId/").post(async (req, res) => {
  const { description, userId } = req.body;
  const { postId } = req.params;

  const newComment = new Comment({
    description,
    userId,
    postId,
  });
  try {
    await newComment.save().then((comment) => {
      res.status(201).json(comment);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: err.message });
  }
});

router.route("/comments/:postId").get(async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await Comment.find({ postId });
    if (!comment) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.get("comments/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId);

  c.then((comments) => {
    res.status(200).json(comments);
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
