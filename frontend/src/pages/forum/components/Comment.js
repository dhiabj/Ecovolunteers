import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { baseURL } from "../../../api/api";
import TimeAgo from "timeago-react";
import Button from "../components/Button";
import CommentForm from "./CommentForm";
import Voting from "./Voting";
const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [img, setImg] = useState("");
  const [commentVote, setCommentVote] = useState(comment);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${baseURL}/Comment/createurDuComment/${comment.author}`
      );
      setUser(response.data);

      setImg(response.data[0].img);
    };

    getUser();
  }, []);

  return (
    // <div className=" block border-2 border-eco_border bg-eco_dark-brighter hover:border-eco_text p-2 rounded-md cursor-pointer">
    //   <img
    //     src={`http://localhost:5000/uploads/${img}`}
    //     className="pfp me-3"
    //     alt="pfp"
    //   />
    //   <h5 className="text-eco_text-darker text-sm mb-1">
    //     Posted by {comment.author}{" "}
    //     <TimeAgo
    //       className="leading-10 px-2 text-md font-sans text-white"
    //       datetime={comment.postedAt}
    //     />
    //   </h5>

    //   <h2 className="text-white text-xl mb-3">{comment.title}</h2>
    //   <div className="text-white text-sm leading-6">
    //     <p>{comment.body}</p>
    //   </div>
    // </div>
    <div className=" block border-2 border-eco_border bg-eco_dark-brighter p-2 rounded-md ">
      <div className="bg-eco_text w-10 h-10 rounded-full mr-2">
        <img
          src={`http://localhost:5000/uploads/${img}`}
          className="pfp me-3"
          alt="pfp"
        />
      </div>
      <div className="leading-10 px-2 text-lg front-sans text-gray-500">
        {comment.author}
        <TimeAgo
          className="leading-10 px-2 text-md font-sans text-white"
          datetime={comment.postedAt}
        />
        <div className=" text-white boder-l-2 border-eco_text-darker p-3 ml-4">
          {comment.body}
        </div>
        <Voting comment={commentVote} />
      </div>
    </div>
  );
};

export default Comment;
