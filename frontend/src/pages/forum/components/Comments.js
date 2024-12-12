import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../api/api";
import Post from "./Post";
import Comment from "./Comment";

const Comments = ({ parentId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComment = async () => {
      const response = await axios.get(
        `${baseURL}/Comment/commentairedupost/${parentId}`
      );
      setComments(response.data);
      console.log(comments);
    };

    getAllComment();
  }, []);
  return (
    <div className="bg-eco_dark">
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </div>
  );
};

export default Comments;
