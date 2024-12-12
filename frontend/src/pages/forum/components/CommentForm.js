import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import TextArea from "./TextArea";
import Button from "./Button";
import { baseURL } from "../../../api/api";
import axios from "axios";
import { toast } from "react-toastify";

const CommentForm = ({ rootId, parentId }) => {
  const { auth } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    body: "",
    author: "",
    postedAt: new Date(),
    rootid: rootId,
    parentid: "",
  });

  const { title, body, author, postedAt, rootid, parentid } = post;
  const onValueChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };
  const onSubmit = async () => {
    const response = await axios.post(`${baseURL}/Comment/createComment`, {
      ...post,
      author: auth.username,

      parentid: parentId,
    });
    toast.success("Comment created successfully!");
  };
  return (
    <div className="">
      <div className="mb-3 text-left text-black text-sm ">
        Comment as {auth.username}
      </div>

      <form>
        <div className=" mb-3 text-black">
          <TextArea
            onChange={(e) => onValueChange(e)}
            value={body}
            name="body"
            className="w-full mb-3 text-white"
            placeholder="Your comment.You can use markdown here"
          />
        </div>

        <div className="text-right">
          <Button className="mr-10 pl-2 p-2" onClick={() => onSubmit()}>
            Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
