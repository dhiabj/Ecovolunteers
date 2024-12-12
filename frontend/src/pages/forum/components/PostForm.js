import React, { useContext, useState } from "react";
import { UserIcon } from "@heroicons/react/outline";
import PostFormModal from "./PostFormModal";
import AuthContext from "../../../context/AuthContext";
const PostForm = ({ setComments, comments }) => {
  const [showD, setShowD] = useState(false);
  const handleShowD = () => setShowD(true);
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <PostFormModal
        showD={showD}
        setShowD={setShowD}
        setComments={setComments}
        comments={comments}
      />
      <div className="bg-gray-150 px-6 py-4 text-gray-400">
        <div className=" p-2 rounded-md border-2 border-gray-300 flex bg-white">
          <div className="rounded-full  bg-gray-600  overflow-hidden h-10 w-10">
            <img
              src={
                auth.picture
                  ? auth.picture
                  : `http://localhost:5000/uploads/${auth.img}`
              }
              className="pfp me-3"
              alt="pfp"
            />
          </div>
          <form
            action=""
            className="flex-grow  border-2 border-gray-300 ml-4 mr-2 rounded-md"
          >
            <input
              onClick={handleShowD}
              type="text"
              className="bg-white p-2  px-2 block w-full rounded-md "
              placeholder="New Post"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
