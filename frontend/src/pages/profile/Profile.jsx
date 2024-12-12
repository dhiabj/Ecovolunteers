import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import Profilee from "./Profilee";
const Profile = () => {
  return (
    <div>
      <Profilee></Profilee>
      <div className="Profile mt-1">
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location="profilePage" />
          <PostSide />
        </div>
      </div>
    </div>
  );
};

export default Profile;
