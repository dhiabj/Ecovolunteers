import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Modal from "react-bootstrap/Modal";
import cancel from "../../../assets/imgs/cancel.png";
import { Input } from "@mui/material";
import TextArea from "./TextArea";
import axios from "axios";
import { baseURL } from "../../../api/api";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const PostFormModal = ({ showD, setShowD, setComments, comments }) => {
  const handleClose = () => setShowD(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("");
  const [post, setPost] = useState({
    title: "",
    body: "",
    author: "",
    postedAt: new Date(),
    tags: "",
  });

  const { title, body, author, postedAt } = post;
  const onValueChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };
  const onSubmit = async () => {
    const response = await axios.post(`${baseURL}/Comment/createComment`, {
      ...post,
      author: auth.username,
      tags: selectedTag,
    });
    console.log(response);
    toast.success("Post created successfully!");
    handleClose();
    setComments([...comments, response.data]);
    // navigate("/forum");
  };
  return (
    <Modal show={showD} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="CreatePost-modal-title">
          <div>Create Post</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="center-column">
        <Input
          onChange={(e) => onValueChange(e)}
          className={"w-full mb-3"}
          placeholder="Title"
          name="title"
          value={title}
        />
        {/* <TextArea
          onChange={(e) => onValueChange(e)}
          name="body"
          value={body}
          className={"w-full mb-3"}
          placeholder="Text (required)"
        /> */}
        <ReactQuill
          theme="snow"
          value={body}
          onChange={(value) =>
            onValueChange({ target: { name: "body", value } })
          }
          className={"w-full mb-3"}
          placeholder="Text (required)"
        />
        <div className="ml-4 flex justify-content-center mt-2 mb-2  ">
          <div className="px-3">
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

          <div className="px-3">
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
          <div className="px-3">
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

          <div className="px-3">
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
      </Modal.Body>
      <div className="text-right">
        <Button className="px-4 py-2" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button className="px-4 py-2" onClick={() => onSubmit()}>
          Post
        </Button>
      </div>

      <Modal.Footer className="justify-content-center"></Modal.Footer>
    </Modal>
  );
};

export default PostFormModal;
