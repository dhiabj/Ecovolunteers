import React, { useState, useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Modal, useMantineTheme } from "@mantine/core";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const VideoCall = ({ modalOpened, setModalOpened, chat }) => {
  const { auth } = useContext(AuthContext);

  const zpRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    return () => {
      // Clean up when the component is unmounted
      if (zpRef.current) {
        console.log("destroy", zpRef);
        zpRef.current.destroy();
      }
    };
  });
  function toggleSearchBar() {
    setIsOpen(!isOpen);
  }

  const myMeeting = async (element) => {
    const roomID = chat || Math.floor(Math.random() * 10000) + "";
    const userID = Math.floor(Math.random() * 10000) + "";
    const userName = auth.username;
    const appID = 1210827865;
    const serverSecret = "658be93957544685ef24c32dcc7636be";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },

      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
    });
    zpRef.current = zp;
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        VideoCall
        <div id="myMeeting" ref={myMeeting}></div>
      </div>
    </Modal>
  );
};

export default VideoCall;
