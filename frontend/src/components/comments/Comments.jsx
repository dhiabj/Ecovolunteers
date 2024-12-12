import { useContext, useRef } from "react";
import "./comments.scss";
import AuthContext from "../../context/AuthContext";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getComment } from "../../api/comments";
import Comment from "../comment/comment";
const Comments = ({ comments, post, setComments }) => {
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const description = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      const commentData = {
        description: comment,
        userId: auth._id,
      };

      try {
        const response = await axios.post(
          `http://localhost:5000/comments/comments/${post._id}`,
          commentData
        );
        console.log(response.data); // the created comment object
        const newComments = [...comments, response.data];
        setComments(newComments);
        description.current.value = "";
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={`http://localhost:5000/uploads/${auth.img}`} alt="" />
        <input
          type="text"
          ref={description}
          onChange={(e) => setComment(e.target.value)}
          placeholder="write a comment"
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
      {comments.map((comment, id) => {
        return <Comment data={comment} user={comment.userId} key={id} />;
      })}
    </div>
  );
};

export default Comments;
