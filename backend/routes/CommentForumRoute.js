const router = require("express").Router();
let CommentForum = require("../models/commentForumModel");
let User = require("../models/user");
let Vote = require("../models/Vote");
const BadWords = require("bad-words");
const badWordsFilter = new BadWords();
//bring only the post which are the roots
router.route("/").get((req, res) => {
  CommentForum.find({ rootid: null })
    .sort({ postedAt: -1 })
    .then((Comments) => res.json(Comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  const comment = await CommentForum.findById(req.params.id);
  res.send(comment);
});
// Add custom bad words
badWordsFilter.addWords("fuck");

router.route("/createComment").post(async (req, res) => {
  const { title, author, body, postedAt, rootid, parentid, tags, closed } =
    req.body;

  const sanitizedBody = badWordsFilter.clean(body);

  try {
    const newComment = new CommentForum({
      title,
      author,
      body: sanitizedBody,
      postedAt,
      rootid,
      parentid,
      tags,
      closed,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.route("/createComment").post(async (req, res) => {
//   const { title, author, body, postedAt, rootid, parentid } = req.body;

//   try {
//     const newComment = new Comment({
//       title,
//       author,
//       body,
//       postedAt,
//       rootid,
//       parentid,
//     });
//     const savedComment = await newComment.save();
//     res.status(201).json(savedComment);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
//Post Route
router.route("/RoutComment").get((req, res) => {
  CommentForum.find({ rootid: null })
    .then((Comments) => res.json(Comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/commentairedupost/:id").get(async (req, res) => {
  try {
    const comment = await CommentForum.find({ parentid: req.params.id });
    res.send(comment);
  } catch (err) {
    console.error(err);
  }
});
router.route("/createurDuComment/:username").get(async (req, res) => {
  try {
    const user = await User.find({ username: req.params.username });
    res.send(user);
  } catch (err) {
    console.error(err);
  }
});
router.route("/CreateVote").post(async (req, res) => {
  const { author, commentId, direction } = req.body;

  try {
    const newVote = new Vote({
      author,
      commentId,
      direction,
    });
    const savedVote = await newVote.save();
    res.status(201).json(savedVote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.route("/VoteduCommentaire/:id").get(async (req, res) => {
  try {
    const vote = await Vote.find({ commentId: req.params.id });
    res.send(vote);
  } catch (err) {
    console.error(err);
  }
});
router.route("/VoteduCommentaireUp/:id").put(async (req, res) => {
  try {
    const vote = await Vote.findByIdAndUpdate(
      req.params.id,
      { $inc: { direction: 1 } },
      { new: true }
    );
    res.send(vote);
  } catch (err) {
    console.error(err);
  }
});
router.route("/closeComment/:id").put(async (req, res) => {
  try {
    const vote = await CommentForum.findByIdAndUpdate(
      req.params.id,
      { closed: true },
      { new: true }
    );
    res.send(vote);
  } catch (err) {
    console.error(err);
  }
});
router.route("/VoteduCommentaireDown/:id").put(async (req, res) => {
  try {
    const vote = await Vote.findByIdAndUpdate(
      req.params.id,
      { $inc: { direction: -1 } },
      { new: true }
    );
    res.send(vote);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
