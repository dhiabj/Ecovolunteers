import { createContext, useContext, useState } from "react";
import * as UserApi from "../api/UserRequests";

const FollowingContext = createContext();

export const useFollowing = () => useContext(FollowingContext);

export const FollowingProvider = ({ children }) => {
  const [following, setFollowing] = useState([]);

  const followUser = (userId) => {
    setFollowing([...following, userId]);
    UserApi.followUser(userId, following);
    // Add your API call here to update the user's following list on the server
  };

  const unfollowUser = (userId) => {
    setFollowing(following.filter((id) => id !== userId));
    UserApi.unfollowUser(userId, following);
    // Add your API call here to update the user's following list on the server
  };

  return (
    <FollowingContext.Provider value={{ following, followUser, unfollowUser }}>
      {children}
    </FollowingContext.Provider>
  );
};
