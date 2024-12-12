import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { createChat, findChat } from "../../api/ChatRequests";
import { useContext } from "react";
import * as UserApi from "../../api/UserRequests";

import AuthContext from "../../context/AuthContext";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const dispatch = useDispatch();
  const { logged, setLogged, auth, setAuth } = useContext(AuthContext);
  // console.log(auth.followers);
  const [following, setFollowing] = useState(
    person.followers.includes(auth._id)
  );

  const handleFollow = () => {
    !following
      ? UserApi.followUser(person._id, auth) &&
        setAuth({ ...auth, following: [...auth.following, person._id] })
      : UserApi.unfollowUser(person._id, auth) &&
        handleChat() &&
        setAuth({
          ...auth,
          following: [
            ...auth.following.filter((following) => following !== person._id),
          ],
        });
    setFollowing((prev) => !prev);
  };

  const handleChat = async () => {
    console.log("handlingchat");
    try {
      const response = await findChat(auth._id, person._id);
      console.log(response.data);
      if (response.data) return;
      try {
        const dataa = {
          senderId: auth._id,
          receiverId: person._id,
        };
        const responsee = await createChat(dataa);
        console.log(responsee);
        // Handle any success actions, such as showing a success message
      } catch (error) {
        console.error(error);
        // Handle any error actions, such as showing an error message
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.picture
              ? person.picture
              : `http://localhost:5000/uploads/${person.img}`
          }
          alt="profile"
          className="followerImage"
        />

        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
