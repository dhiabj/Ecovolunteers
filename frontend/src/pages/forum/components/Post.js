import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NavBarForum from "./NavBarForum";
import PostModal from "./PostModal";
import Button from "./Button";
import axios from "axios";
import { baseURL } from "../../../api/api";
import TimeAgo from "timeago-react";
import parse from "html-react-parser";
import AuthContext from "../../../context/AuthContext";
const Post = ({ comment }) => {
  const { auth } = useContext(AuthContext);
  const [showD, setShowD] = useState(false);
  const handleShowD = () => setShowD(true);
  const [img, setImg] = useState("");
  const [closed, SetClosed] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${baseURL}/Comment/createurDuComment/${comment.author}`
      );

      setImg(response.data[0].img);
    };

    getUser();
  }, []);
  useEffect(() => {
    if (auth.username === comment.author && comment.closed) {
      SetClosed(true);
    } else {
      SetClosed(false);
    }
  }, [auth.username, comment.closed, comment.author]);
  const close = async () => {
    const response = await axios.put(
      `${baseURL}/Comment/closeComment/${comment._id}`
    );
    window.location.reload();
  };
  return (
    <div>
      <div className="px-6  text-eco_text pb-4 ">
        <PostModal showD={showD} setShowD={setShowD} comment={comment} />
        <NavLink
          onClick={handleShowD}
          className=" block border-2 border-gray-300 bg-gray-200 hover:border-eco_text p-2 rounded-md cursor-pointer"
        >
          <img
            src={`http://localhost:5000/uploads/${img}`}
            className="pfp me-3"
            alt="pfp"
          />
          <h5 className="text-eco_text-darker text-sm mb-1">
            Posted by {comment.author}{" "}
            <TimeAgo
              className="leading-10 px-2 text-md font-sans text-white"
              datetime={comment.postedAt}
            />
          </h5>
          <h2 className="  text-black text-xl mb-3">{comment.title}</h2>
          <div className="text-black text-sm leading-6 ">
            <p className="break-words">{parse(comment.body)}</p>
          </div>
        </NavLink>
        {!closed ? (
          <div className="text-black text-sm relative">
            <div className=" bottom-0 right-0 underline">
              <p>Do you want to close this post?</p>
              <button className="hover:font-bold mx-1" onClick={close}>
                Yes
              </button>
              <button className="hover:font-bold">No</button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Post;
