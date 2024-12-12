import React, { useState } from "react";
import "./home.scss";
import Share from "../../components/share/Share";

import LeftBar from "../../components/leftBar/LeftBar";
import RightBar from "../../components/rightBar/RightBar";
import Posts from "../../components/Posts/Posts";
import PostShare from "./../../components/PostShare/PostShare";
import io from "socket.io-client";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import ChatLive from "./../../components/chat/LiveChat";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";

const alanKey =
  "719a4db1bd22c5579a847170b8b532b62e956eca572e1d8b807a3e2338fdd0dc/stage";
const Homee = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    console.log(auth);
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        // if (command === "newHeadlines") {
        //   console.log(articles);
        //   setNewsArticles(articles);
        // }
      },
    });
  });

  return (
    <div style={{ display: "flex" }}>
      <LeftBar />
      <div style={{ flex: 6, paddingTop: "20px" }}>
        <PostShare />
        <Posts />
      </div>
      <RightBar />
    </div>
  );
};

export default Homee;
