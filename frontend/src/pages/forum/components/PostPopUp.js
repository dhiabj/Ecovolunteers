import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Post from "./Post";
import { baseURL } from "../../../api/api";
const PostPopUp = () => {
  const { id } = useParams();
  const [comment, setComment] = useState({});
  useEffect(() => {
    const getComment = async () => {
      const response = await axios.get(`${baseURL}/Comment//${id}`);
      setComment(response.data);
      console.log(comment);
    };

    getComment();
  }, [id]);
  return (
    <div className="bg-eco_dark py-4 ">
      <Post comment={comment} />
    </div>
  );
};

export default PostPopUp;
