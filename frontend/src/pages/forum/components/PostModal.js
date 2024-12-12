import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import axios from "axios";
import { baseURL } from "../../../api/api";
import TimeAgo from "timeago-react";
import parse from "html-react-parser";
const PostModal = ({ showD, setShowD, comment }) => {
  const handleClose = () => setShowD(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${baseURL}/Comment/createurDuComment/${comment.author}`
      );

      setImg(response.data[0].img);
    };

    getUser();
  }, []);
  return (
    <Modal show={showD} onHide={handleClose}>
      <div className="block border-2 border-gray-300 bg-gray-200  p-2 rounded-md cursor-pointer">
        <Modal.Header closeButton className="bg-gray-400">
          <img
            src={`http://localhost:5000/uploads/${img}`}
            className="pfp me-3"
            alt="pfp"
          />
          <Modal.Title className="text-black text-xl mb-3 center">
            <div className=""> {comment.title}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="center-column">
          <h5 className="text-eco_text-darker text-sm mb-1">
            Posted by {comment.author}{" "}
            <TimeAgo
              className="leading-10 px-2 text-md font-sans text-white"
              datetime={comment.postedAt}
            />
          </h5>
          <h2 className="text-black text-sm leading-6">{comment.title}</h2>
          <div className="text-black text-sm leading-6">
            <p>{parse(comment.body)}</p>
          </div>
        </Modal.Body>
        <div className="text-right"></div>
        <div className="border-top my-3"></div>
        <div className="bg-gray-400">
          {!!comment && !!comment._id & !comment.closed && (
            <>
              <div className="border-top my-3"></div>
              <CommentForm rootId={comment._id} parentId={comment._id} />
              <div className="border-top my-3"></div>
            </>
          )}
          <Comments parentId={comment._id} />
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
