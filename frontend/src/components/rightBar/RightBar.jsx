import "./rightBar.scss";
import FollowersCard from "./../FollowersCard/FollowersCard";
import ChatLive from "./../../components/chat/LiveChat";
import { io } from "socket.io-client";
import { useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthContext";

const RightBar = () => {
  useEffect(() => {});

  // const socket = io("ws://localhost:8800"); // connect to the server

  const { auth, setAuth, logged, setLogged, socket } = useContext(AuthContext);
  return (
    <div className="rightBar">
      <div className="containerrr">
        <div className="item">
          <FollowersCard />
        </div>

        <div className="cardBox">
          <div className="cardd">
            <ChatLive className="ChatLive" socket={socket} user={auth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
