import React, { useState, useEffect } from "react";
import "./comments.scss";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequests";
import AuthContext from "../../context/AuthContext";

const Comment = ({ data, user }) => {
  const [commentCreator, setCommentCreator] = useState(null);

  useEffect(() => {
    const userid = data.userId;

    const getUserData = async () => {
      try {
        const { data } = await getUser(userid);

        setCommentCreator(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data]);
  return (
    <div className="comment" key={data._id}>
      <img
        src={`http://localhost:5000/uploads/${commentCreator?.img} `}
        alt=""
      />
      <div className="info">
        <span>{commentCreator?.username}</span>
        <p>{data.description}</p>
      </div>
      <span className="date">{format(data?.createdAt)}</span>
    </div>
  );
};

export default Comment;
