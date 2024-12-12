

  export const addComment = (req, res) => {
    const userInfo = req.user;
  
      const commentsCollection = db.collection("comments");
  
    const newComment = {
      desc: req.body.desc,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userId: userInfo.id,
      postId: req.body.postId
    };
  
    commentsCollection.insertOne(newComment, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created.");
    });
  };
  
  