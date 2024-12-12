let UserModel = require("../models/user");
let PostModel = require("../models/postModel");

const mongoose = require("mongoose");
const { By, Key, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("msedgedriver");

// creating a post

const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//get posts from fb
const getPostsFromFacebook = async (req, res) => {
  console.log("in getPostsFromFacebook");
  const books = [];

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--headless"))
    .build();
  try {
    await driver.get(
      "https://www.facebook.com/people/Eco-Volunteers/100080777250341/"
    );

    await driver.wait(until.titleContains("Eco"), 10000);

    let posts = await driver.findElements(
      By.css(
        ".x9f619.x1n2onr6.x1ja2u2z.xeuugli.x1iyjqo2.xs83m0k.x1xmf6yo.x1emribx.x1e56ztr.x1i64zmx.xjl7jj.x19h7ccj.x65f84u"
      )
    );

    //   names.map(async (n) => {
    //     console.log(await n.get_attribute("value"));
    //   });

    for (let postElement of posts) {
      //sleep 5sec?
      await driver.sleep(1000); // Wait for 5 seconds
      let description;
      let reacts;
      let commentNumber;
      let commentsOfPost = [];
      let commentCreatedAgo = "";
      let commentText = "";
      let commentCreator = "";
      try {
        let postContentElement = await postElement?.findElement(
          By.css(".x1iorvi4.x1pi30zi.x1swvt13.xjkvuk6")
        );
        description = await postContentElement?.getText();
      } catch (error) {
        console.log("description element not found, skipping...");
        description = "";
      }
      try {
        let reactElement = await postElement.findElement(
          By.css(".xrbpyxo.x6ikm8r.x10wlt62.xlyipyv.x1exxlbk")
        );
        reacts = await reactElement?.getText();
      } catch (error) {
        console.log("no reacts");
        reacts = "0";
      }
      try {
        let commentElement = await postElement.findElement(
          By.css(
            ".x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xeuugli.xg83lxy.x1h0ha7o.x10b6aqq.x1yrsyyn"
          )
        );
        commentNumber = await commentElement?.getText();
      } catch (error) {
        console.log("no comments");
        commentNumber = "0";
      }
      try {
        let comments = await postElement.findElements(
          By.css(".x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x1pi30zi")
        );
        for (let comm of comments) {
          let z = await comm.getText();

          const lines = z.split("\n");
          commentCreator = lines[1];
          commentText = lines[2];
          commentCreatedAgo = lines[3];
          console.log({ commentCreator, commentText, commentCreatedAgo });
        }
      } catch (error) {
        console.log("no comments");
      }
      books.push({
        description,
        reacts,
        commentNumber,
        comment: { commentCreator, commentText, commentCreatedAgo },
      });
    }
    res.status(200).json(books);
    console.log(books);
  } finally {
  }
};

// update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getPostsFromFacebook,
};
