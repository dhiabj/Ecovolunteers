import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../../../api/api";

const Voting = ({ comment }) => {
  const [like, setLike] = useState(0);

  function handleVoteUp() {
    setLike(like + 1);
  }
  function handleVoteDown() {
    setLike(like - 1);
  }
  return (
    <div className={"inline-block mr-2"}>
      <button
        onClick={() => handleVoteUp()}
        className="inline-block  h-4 text-eco_text-darker hover:text-white relative top-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7l4-4m0 0l4 4m-4-4v18"
          />
        </svg>
      </button>

      <span className="inline-block ">{like}</span>
      <button
        onClick={() => handleVoteDown()}
        className="inline-block  h-4 text-eco_text-darker hover:text-white relative top-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 17l-4 4m0 0l-4-4m4 4V3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Voting;
