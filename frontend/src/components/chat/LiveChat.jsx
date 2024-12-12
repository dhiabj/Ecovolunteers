import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Livechat.scss";
const LiveChat = ({ socket, user }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    let img = "";
    if (user.picture) img = user.picture;
    if (user.img) img = `http://localhost:5000/uploads/${user.img}`;
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        user: user.username,

        picture: img,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      //   setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="chat-window">
      <div className="chat-headerr">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={messageContent.index}
                className="messagee"
                id={user.username === messageContent.user ? "other" : "you"}
              >
                <div>
                  {user.username !== messageContent.user && (
                    <div className="message-meta">
                      <p id="author">{messageContent.user}</p>
                    </div>
                  )}
                  <div className="d-flex">
                    <img
                      src={messageContent.picture}
                      className="img-chat "
                      alt="pfp"
                    />
                    <div
                      className={
                        user.username === messageContent.user
                          ? "message-contentYou"
                          : "message-contentother"
                      }
                      style={{ marginLeft: "-1px" }}
                    >
                      <p> {messageContent.message}</p>
                    </div>
                  </div>

                  <div className="message-meta">
                    <p id="time"> {messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          style={{ color: "black" }}
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     // listen for incoming messages from server
//     socket.on("chat_message", (msg) => {
//       setMessages((messages) => [...messages, msg]);
//     });
//   }, [socket]);

//   // send message to server
//   const sendMessage = (event) => {
//     event.preventDefault();
//     if (input) {
//       const messageData = {
//         message: input,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       socket.emit("chat message", messageData);
//       setInput("");
//     }
//   };
//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         <ScrollToBottom className="message-container">
//           {messages.map((messageContent) => {
//             return (
//               <div key={messageContent.index} className="message" id="you">
//                 <div>
//                   <div className="message-content">
//                     <p>{messageContent.message}</p>
//                   </div>
//                   <div className="message-meta">
//                     <p id="time">{messageContent.time}</p>
//                     <p id="author">{messageContent.author}</p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </ScrollToBottom>
//       </div>
//       <div className="chat-footer">
//         <input
//           type="text"
//           value={input}
//           placeholder="Hey..."
//           onChange={(event) => {
//             setInput(event.target.value);
//           }}
//           onKeyPress={(event) => {
//             event.key === "Enter" && sendMessage();
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// };

export default LiveChat;
