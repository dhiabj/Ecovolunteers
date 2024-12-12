import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import VideoCall from "../testvideocall/testvideocall";
import soundFile from "../../../src/Instagrameffect.mp3";
import Videos from "../../assets/imgs/9.png";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 3000);
  };
  // fetching data for header
  useEffect(() => {
    console.log(modalOpened);
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);

      const diff = new Date() - new Date(receivedMessage.createdAt);
      if (
        receivedMessage.text === "Hey i'm in the Video CAll Room Join Me 📞"
      ) {
        console.log("soundplauued");
        playSound();
      }
    }
  }, [receivedMessage]);

  const handleCall = async () => {
    console.log("call");

    const message = {
      senderId: currentUser,
      text: `Hey i'm in the Video CAll Room Join Me 📞`,

      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.picture
                        ? userData?.picture
                        : `http://localhost:5000/uploads/${userData?.img}`
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>

                <i
                  className="  mr-5 "
                  style={{
                    color: " #00e6bf",
                    fontSize: "25px",
                  }}
                  onClick={async () => {
                    await handleCall();
                    setModalOpened(true);
                  }}
                >
                  {" "}
                  <img src={Videos} alt="" />
                </i>

                {modalOpened ? (
                  <VideoCall
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                    chat={chat?._id}
                  />
                ) : null}
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={
                    message.senderId === currentUser ? "message" : "message own"
                  }
                >
                  {message.text ===
                  "Hey i'm in the Video CAll Room Join Me 📞" ? (
                    <span
                      style={{
                        color: "red",
                        fontFamily: "cursive",
                        cursor: "pointer",
                      }}
                      onClick={() => setModalOpened(true)}
                    >
                      {message.text}
                    </span>
                  ) : (
                    <span>{message.text}</span>
                  )}
                  {/* <span>{message.text}</span>{" "} */}
                  <span>{format(message.createdAt)}</span>
                </div>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
