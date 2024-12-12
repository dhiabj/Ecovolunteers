// import React, { useEffect, useMemo, useRef, useState,useCallback } from "react";
// import {
//   MeetingProvider,
//   useMeeting,
//   useParticipant,
//   Constants,
// } from "@videosdk.live/react-sdk";
// import "./live.css"
// import ReactPlayer from "react-player";
// import Hls from "hls.js";
// // importing usePubSub hook from react-sdk
// import { usePubSub } from "@videosdk.live/react-sdk";
// function ChatView() {
//      // State to store the user typed message
//      const [message, setMessage] = useState("");
  
//     // destructure publish method from usePubSub hook
//     const { publish, messages } = usePubSub("CHAT", {
//         onMessageReceived: (message)=>{
//           window.alert(message.senderName + "says" + message.message);
//         }
//       });
   
//     const handleSendMessage = () => {
//       // Sending the Message using the publish method
//       publish(message, { persist: true });
//       // Clearing the message input
//       setMessage("");
//     };
  
//     return (
//       <>
//       <div>
//       <p>Messages: </p>
//       {messages.map((message) => {
//         return (
//           <p>
//             {message.senderName} says {message.message}
//           </p>
//         );
//       })}
//       </div>
//         <input
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//         />
//         <button onClick={handleSendMessage}>Send Message</button>
//       </>
//     );
//   }
//   function MeetingView() {
//     const { localParticipant } = useMeeting();
//     // destructure publish method from usePubSub hook
//     const { publish } = usePubSub("NOTIFY_ATTENDEES", {
//         onMessageReceived: (message) => {
//           if (localParticipant.mode == "VIEWER") window.alert(`${message.message}`);
//         },
//       });    const [message, setMessage] = useState("");
  
//     return (
//       <>
//         <input
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             publish(message);
//           }}
//         >
//           Notfiy Attendees
//         </button>
//       </>
//     );
//   }
// function ParticipantView(props) {
//     const micRef = useRef(null);
//     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
//       useParticipant(props.participantId);
//     const videoStream = useMemo(() => {
//       if (webcamOn && webcamStream) {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(webcamStream.track);
//         return mediaStream;
//       }
//     }, [webcamStream, webcamOn]);
//     useEffect(() => {
//       if (micRef.current) {
//         if (micOn && micStream) {
//           const mediaStream = new MediaStream();
//           mediaStream.addTrack(micStream.track);
//           micRef.current.srcObject = mediaStream;
//           micRef.current
//             .play()
//             .catch((error) =>
//               console.error("videoElem.current.play() failed", error)
//             );
//         } else {
//           micRef.current.srcObject = null;
//         }
//       }
//     }, [micStream, micOn]);  
//     return (
//       <div>
//         <audio ref={micRef} autoPlay playsInline muted={isLocal} />
//         {webcamOn && (
//           <ReactPlayer
//             playsinline // very very imp prop
//             pip={false}
//             light={false}
//             controls={false}
//             muted={true}
//             playing={true}
//             url={videoStream}
//             height={"300px"}
//             width={"300px"}
//             onError={(err) => {
//               console.log(err, "participant video error");
//             }}
//           />
          
//         )}
        
//       </div>
//     );
//     }
    
//   function Controls() {
//     const { hlsState, startHls, stopHls } = useMeeting();
//   const _handleHLS = () => {
//     console.log("hlsState", hlsState);
//     if (!hlsState || hlsState === "HLS_STOPPED") {
//       startHls({
//         layout: {
//           type: "SPOTLIGHT",
//           priority: "PIN",
//           gridSize: 4,
//         },
//         theme: "DARK",
//         orientation: "landscape",
//       });
//     } else if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
//       stopHls();
//     }
//   };
//     return (
//       <>
//         {hlsState === "HLS_STARTED" ||
//         hlsState === "HLS_STOPPING" ||
//         hlsState === "HLS_STARTING" ||
//         hlsState === "HLS_PLAYABLE" ? (
//           <button
//             onClick={() => {
//               _handleHLS();
//             }}
//             style={{
//               backgroundColor: "#FF5D5D",
//             }}
//           >
//             {hlsState === "HLS_STARTED"
//               ? "Live Starting"
//               : hlsState === "HLS_STOPPING"
//               ? "Live Stopping"
//               : hlsState === "HLS_PLAYABLE"
//               ? "Stop Live"
//               : "Loading..."}
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               _handleHLS();
//             }}
//             style={{
//               backgroundColor: "#FF5D5D",
//             }}
//           >
//             Go Live
//           </button>
//         )}
//       </>
//     );
//   };
//   function FlyingEmojisOverlay () {
//     const EMOJI_MAP = {
//     confetti: "🎉",
//     clap: "👏",
//   };
//     //Subscribing to the PubSub topic REACTION to recive other participants reactions.
//   const pubsubData = usePubSub("REACTION", {
//     onMessageReceived: ({ message }) => {
//       handleReceiveFlyingEmoji(message);
//     },
//   });
//   useEffect(() => {
//     pubsubDataRef.current = pubsubData;
//   }, [pubsubData]);

//   const pubsubDataRef = useRef(pubsubData);

//     //Handler to remove the flying emoji once animation is completed
//   const handleRemoveFlyingEmoji = useCallback((node) => {
//     if (!overlayRef.current) return;
//     overlayRef.current.removeChild(node);
//   }, []);
//      // Hanlder to dispaly the emoji and start is animations
//   const handleDisplayFlyingEmoji = useCallback(
//     (emoji) => {
//       if (!overlayRef.current) {
//         return;
//       }
//       const node = document.createElement("div");
//       node.appendChild(document.createTextNode(EMOJI_MAP[emoji]));
//       //Randomly choosing the animations of wiggle, rotation and position
//       node.className =
//         Math.random() * 1 > 0.5 ? "emoji wiggle-1" : "emoji wiggle-2";
//       node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
//       node.style.left = `${Math.random() * 100}%`;
//       node.src = "";
//       overlayRef.current.appendChild(node);

//       node.addEventListener("animationend", (e) => {
//         handleRemoveFlyingEmoji(e.target);
//       });
//     },
//     [handleRemoveFlyingEmoji]
//   );
  
//   //Showing other participants reactions
//   const handleReceiveFlyingEmoji = useCallback(
//     (message) => {
//       if (!overlayRef.current) {
//         return;
//       }
//       handleDisplayFlyingEmoji(message);
//     },
//     [handleDisplayFlyingEmoji]
//   );

//    // Remove all event listeners on unmount to prevent console warnings
//    useEffect(
//     () =>  
//      { overlayRef.current?.childNodes.forEach((n) =>
//         n.removeEventListener("animationend", handleRemoveFlyingEmoji)
//       )},
//     [handleRemoveFlyingEmoji]
//   );
//     const overlayRef = useRef("");
//     // Listen to window events to show local user emojis and send the emoji to all participants on the call
//     useEffect(() => {
//       function handleSendFlyingEmoji(e) {
//         const { emoji } = e.detail;
  
//         if (emoji) {
//           pubsubDataRef.current.publish(emoji);
//         }
//       }
  
//       window.addEventListener("reaction_added", handleSendFlyingEmoji);
//       return () =>
//         window.removeEventListener("reaction_added", handleSendFlyingEmoji);
//     }, [handleDisplayFlyingEmoji]);
  
//     return <div className="flying-emojis" ref={overlayRef}></div>;
//   };
//   function ILSView() {
//     const { publish } = usePubSub("REACTION");
//     function sendEmoji(emoji) {
//       // Dispatch custom event here so the local user can see their own emoji
//       window.dispatchEvent(
//         new CustomEvent("reaction_added", { detail: { emoji } })
//       );
//     }
//     return (
//       <>
//       <FlyingEmojisOverlay/>
//         <button
//           onClick={() => {
//             sendEmoji("confetti");
//             publish("confetti");
//           }}
//         >
//           Send 🎉 Reaction
//         </button>
  
//         <button
//           onClick={() => {
//             sendEmoji("clap");
//             publish("clap");
//           }}
//         >
//           Send 👏 Reaction
//         </button>
//       </>
//     );
//   }
//   const EMOJI_MAP = {
//     confetti: "🎉",
//     clap: "👏",
//   };
  
//     function SpeakerView() {
//     const [joined, setJoined] = useState(null);
//     //Get the method which will be used to join the meeting.
//     //We will also get the participant list to display all participants
//     const { participants } = useMeeting();
//     const mMeeting = useMeeting({
//       onMeetingJoined: () => {
//         setJoined("JOINED");
//         //we will pin the local participant if he joins in CONFERENCE mode
//         if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
//           mMeetingRef.current.localParticipant.pin();
//         }
//       },
//   });
//   //We will create a ref to meeting object so that when used inside the
//   //Callback functions, meeting state is maintained
//   const mMeetingRef = useRef(mMeeting);
//   useEffect(() => {
//     mMeetingRef.current = mMeeting;
//   }, [mMeeting]);
//   //Filtering the host/speakers from all the participants
//   const speakers = useMemo(() => {
//     const speakerParticipants = [...participants.values()].filter(
//       (participant) => {
//         return participant.mode == Constants.modes.CONFERENCE;
//       }
//     );
//     return speakerParticipants;
//   }, [participants]);
//   return (
//     <div className="container">
//       {joined && joined == "JOINED" ? (
//         <div>
//           {speakers.map((participant) => (
//             <ParticipantView
//               participantId={participant.id}
//               key={participant.id}
//             />
//           ))}
//           <Controls />
//           <ChatView/>
//           <MeetingView/>
//           <ILSView/>
//         </div>
//       ) : (
//         <p>Joining the meeting...</p>
//       )}
//     </div>
//   );
// }
// function ViewerView() {
//     // States to store downstream url and current HLS state
//     const playerRef = useRef(null);
//     //Getting the hlsUrls
//     const { hlsUrls, hlsState } = useMeeting();
//     //Playing the HLS stream when the downstreamUrl is present and it is playable
//     useEffect(() => {
//       if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
//         if (Hls.isSupported()) {
//           const hls = new Hls({
//             capLevelToPlayerSize: true,
//             maxLoadingDelay: 4,
//             minAutoBitrate: 0,
//             autoStartLoad: true,
//             defaultAudioCodec: "mp4a.40.2",
//           });
//           let player = document.querySelector("#hlsPlayer");
//           hls.loadSource(hlsUrls.downstreamUrl);
//           hls.attachMedia(player);
//         } else {
//           if (typeof playerRef.current?.play === "function") {
//             playerRef.current.src = hlsUrls.downstreamUrl;
//             playerRef.current.play();
//           }
//         }
//       }
//     }, [hlsUrls, hlsState, playerRef.current]);
//     return (
//       <div>
//         {/* Showing message if HLS is not started or is stopped by HOST */}
//         {hlsState != "HLS_PLAYABLE" ? (
//           <div>
//             <p>Please Click Go Live Button to start HLS</p>
//           </div>
//         ) : (
//           hlsState == "HLS_PLAYABLE" && (
//             <div>
//               <video
//                 ref={playerRef}
//                 id="hlsPlayer"
//                 autoPlay={true}
//                 controls
//                 style={{ width: "50%", height: "50%" }}
//                 playsinline
//                 playsInline
//                 muted={true}
//                 playing
//                 onError={(err) => {
//                   console.log(err, "hls video error");
//                 }}
//               ></video>
//             </div>
//           )
//         )}
//          <ChatView/>
//           <MeetingView/>
//           <ILSView/>
//       </div>
//     );
//     }
// const Live = () => {
//   const [mode, setMode] = useState(null);

//   return mode ? (
//     <MeetingProvider
//       config={{
//         meetingId: "uk7z-mh39-kk0z",
//         micEnabled: true,
//         webcamEnabled: true,
//         name: "Aya's Org",
//         mode,
//       }}
//       joinWithoutUserInteraction
//       token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjZGQ2ZGM5Ni1mYzQ0LTRiNjAtYTcwZi02NmFjMTI3YmU0ZDciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzQ2NTA2MywiZXhwIjoxNjgzNTUxNDYzfQ.Arrnd_c3buuVKcGcOE4Z_DD2Gpgr1cd0M6VCEo5dPjc"
//     >
//       {mode === Constants.modes.CONFERENCE ? <SpeakerView /> : <ViewerView />}
//     </MeetingProvider>
//   ) : (
//     <div>
//       <button
//         onClick={() => {
//           setMode(Constants.modes.CONFERENCE);
//         }}
//       >
//         Join as Speaker
//       </button>
//       <button
//         style={{ marginLeft: 12 }}
//         onClick={() => {
//           setMode(Constants.modes.VIEWER);
//         }}
//       >
//         Join as Viewer
//       </button>
//     </div>
//   );
// };


// export default Live;
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
import { LeaveScreen } from "../screens/LeaveScreen";
import { MeetingContainer } from "../../meeting/MeetingContainer";
import {JoiningScreen} from "../screens/JoiningScreen"
import { MeetingAppProvider } from "../../MeetingAppContextDef";
import "./live.css"
const Live = () => {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjZGQ2ZGM5Ni1mYzQ0LTRiNjAtYTcwZi02NmFjMTI3YmU0ZDciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzQ2NTA2MywiZXhwIjoxNjgzNTUxNDYzfQ.Arrnd_c3buuVKcGcOE4Z_DD2Gpgr1cd0M6VCEo5dPjc"
  );
  const { auth } = useContext(AuthContext);

  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(true);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;

  useEffect(() => {
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <>
      {isMeetingStarted ? (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId: "uk7z-mh39-kk0z",
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: participantName ? participantName : "TestUser",
              mode: meetingMode,
              multiStream: true,
            }}
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlZTc1NzNiZi0wMjA3LTQ3NzktYTNjYS1kZTRhYmM5Mzg2MjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MzQ4MTQ1NywiZXhwIjoxNjg2MDczNDU3fQ.1W4WVv26xTQYVx_WZ4kh4-kVAB9ihsNGG3mK0CkTNZs"
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} />
      ) : (
        <JoiningScreen
          participantName={participantName}
          setParticipantName={setParticipantName}
          setMeetingId={setMeetingId}
          setToken={setToken}
          setMicOn={setMicOn}
          micEnabled={micOn}
          webcamEnabled={webcamOn}
          setSelectedMic={setSelectedMic}
          setSelectedWebcam={setSelectedWebcam}
          setWebcamOn={setWebcamOn}
          onClickStartMeeting={() => {
            setMeetingStarted(true);
          }}
          startMeeting={isMeetingStarted}
          setIsMeetingLeft={setIsMeetingLeft}
          meetingMode={meetingMode}
          setMeetingMode={setMeetingMode}
        />
      )}
    </>
  );
};

export default Live;


