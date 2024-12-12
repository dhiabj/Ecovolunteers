import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { getUser } from "../../api/UserRequests";

const ProfileCard = ({ location }) => {
  const posts = useSelector((state) => state.postReducer.posts);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { auth } = useContext(AuthContext);
  const [followersNumber, setFollowersNumber] = useState(0);
  const [followingNumber, setFollowingNumber] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(id);
        console.log(data);
        setFollowersNumber(data.followers?.length);
        setFollowingNumber(data.following?.length);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [auth, id]);
  useEffect(() => {}, [auth]);
  return (
    <div className="ProfileCard mt-2">
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{followersNumber}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{followingNumber}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post.userId === id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${auth._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
