 import { usePubSub } from "@videosdk.live/react-sdk";
import { useCallback, useEffect, useRef } from "react";

  
  function FlyingEmojisOverlay () {
    const EMOJI_MAP = {
    confetti: "🎉",
    clap: "👏",
  };
    //Subscribing to the PubSub topic REACTION to recive other participants reactions.
  const pubsubData = usePubSub("REACTION", {
    onMessageReceived: ({ message }) => {
      handleReceiveFlyingEmoji(message);
    },
  });
  useEffect(() => {
    pubsubDataRef.current = pubsubData;
  }, [pubsubData]);

  //Showing other participants reactions
  const handleReceiveFlyingEmoji = useCallback(
    (message) => {
      if (!overlayRef.current) {
        return;
      }
      handleDisplayFlyingEmoji(message);
    },
    [handleDisplayFlyingEmoji]
  );

  const pubsubDataRef = useRef(pubsubData);

    //Handler to remove the flying emoji once animation is completed
  const handleRemoveFlyingEmoji = useCallback((node) => {
    if (!overlayRef.current) return;
    overlayRef.current.removeChild(node);
  }, []);
     // Hanlder to dispaly the emoji and start is animations
  const handleDisplayFlyingEmoji = useCallback(
    (emoji) => {
      if (!overlayRef.current) {
        return;
      }
      const node = document.createElement("div");
      node.appendChild(document.createTextNode(EMOJI_MAP[emoji]));
      //Randomly choosing the animations of wiggle, rotation and position
      node.className =
        Math.random() * 1 > 0.5 ? "emoji wiggle-1" : "emoji wiggle-2";
      node.style.transform = `rotate(${-30 + Math.random() * 60}deg)`;
      node.style.left = `${Math.random() * 100}%`;
      node.src = "";
      overlayRef.current.appendChild(node);

      node.addEventListener("animationend", (e) => {
        handleRemoveFlyingEmoji(e.target);
      });
    },
    [handleRemoveFlyingEmoji]
  );
   // Remove all event listeners on unmount to prevent console warnings
   useEffect(
    () =>  
     { overlayRef.current?.childNodes.forEach((n) =>
        n.removeEventListener("animationend", handleRemoveFlyingEmoji)
      )},
    [handleRemoveFlyingEmoji]
  );
    const overlayRef = useRef("");
    // Listen to window events to show local user emojis and send the emoji to all participants on the call
    useEffect(() => {
      function handleSendFlyingEmoji(e) {
        const { emoji } = e.detail;
  
        if (emoji) {
          pubsubDataRef.current.publish(emoji);
        }
      }
  
      window.addEventListener("reaction_added", handleSendFlyingEmoji);
      return () =>
        window.removeEventListener("reaction_added", handleSendFlyingEmoji);
    }, [handleDisplayFlyingEmoji]);
  
    return <div className="flying-emojis" ref={overlayRef}></div>;
  };
  
  export default FlyingEmojisOverlay;