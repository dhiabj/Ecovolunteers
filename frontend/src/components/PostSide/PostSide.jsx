import React, { useContext } from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PostSide = () => {
  const { id } = useParams();
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div className="PostSide mt-1">
      {id === auth._id ? <PostShare /> : null}
      <Posts />
    </div>
  );
};

export default PostSide;
