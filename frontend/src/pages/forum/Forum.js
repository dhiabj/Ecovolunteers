import React, { useEffect, useState } from "react";

import Boardheader from "./components/Boardheader";

import PostForm from "./components/PostForm";
import axios from "axios";
import { baseURL } from "../../api/api";
import Post from "./components/Post";

import { SearchIcon, AcademicCapIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
const Forum = () => {
  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const getAllComment = async () => {
      const response = await axios.get(`${baseURL}/Comment/`);
      setComments(response.data);
    };
    getAllComment();
  }, []);

  const filteredComments = comments.filter(
    (comment) =>
      comment.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || comment.tags.includes(selectedTag))
  );

  return (
    <div className="bg-gray-200 ">
      <header className=" w-full bg-gray-200 p-2">
        <div className="mx-4 flex">
          <NavLink to="/forum">
            <AcademicCapIcon className="w-8 h-8 mr-4 text-white" />
          </NavLink>
          <form
            action=""
            className="bg-white  px-3 flex rounded-md border-gray-400 mx-4 flex-grow"
          >
            <SearchIcon className="text-black h-6 w-6 mt-1 " />
            <input
              type="text"
              placeholder="Search comments..."
              className="bg-white text-sm p-1 pl-2 pr-0 block  border-0 focus:outline-none text-black"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            ></input>
          </form>
        </div>
        <div className="ml-4 flex justify-content-center mt-2 mb-2  ">
          <div className="px-4">
            <button
              className={`btn tag-btn px-2 ${
                selectedTag === "Ecology"
                  ? "selected btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedTag("Ecology")}
            >
              Ecology
            </button>
          </div>

          <div className="px-4">
            <button
              className={`btn tag-btn   ${
                selectedTag === "Environment"
                  ? "selected btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedTag("Environment")}
            >
              Environment
            </button>
          </div>
          <div className="px-4">
            <button
              className={`btn tag-btn px-2 ${
                selectedTag === "Volunteering"
                  ? "selected btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedTag("Volunteering")}
            >
              Volunteering
            </button>
          </div>

          <div className="px-4">
            <button
              className={`btn tag-btn px-2 ${
                selectedTag === "Help"
                  ? "selected btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedTag("Help")}
            >
              Help
            </button>
          </div>
        </div>
      </header>
      <Boardheader />

      <PostForm setComments={setComments} comments={comments} />
      {!modalOpen ? (
        <div className="bg-gray-150">
          {filteredComments.map((comment, index) => (
            <Post comment={comment} key={index} />
          ))}
        </div>
      ) : (
        <div
          className={"w-screen h-screen fixed top-20 left-0 z-20 flex "}
          style={{ backgroundColor: "rgba(0,0,0,.6" }}
        >
          <div className="border-2 border-eco_dark-brightest w-3/4 sm:w-1/2 md:w-1/4 bg-eco_text self-center mx-auto rounded-md "></div>
        </div>
      )}
    </div>
  );
};

export default Forum;
