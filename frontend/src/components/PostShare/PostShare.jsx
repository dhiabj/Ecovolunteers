import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Button } from "@mui/material";
import Friend from "../../assets/imgs/friend.png";
import "./share.scss";
import Image from "../../assets/imgs/img.png";
import Map from "../../assets/imgs/map.png";
const PostShare = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { auth, setAuth } = useContext(AuthContext);
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: auth._id,
      desc: desc.current.value,
      createdAt: Date.now(),
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    // <div className="PostShare">
    //   <img
    //     src={
    //       auth.picture
    //         ? auth.picture
    //         : `http://localhost:5000/uploads/${auth.img}`
    //     }
    //     alt="Profile"
    //   />
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="What's happening?"
    //       required
    //       ref={desc}
    //     />
    //     <div className="postOptions">
    //       <div
    //         className="option"
    //         style={{ color: "var(--photo)" }}
    //         onClick={() => imageRef.current.click()}
    //       >
    //         <UilScenery />
    //         Photo
    //       </div>

    //       <div className="option" style={{ color: "var(--video)" }}>
    //         <UilPlayCircle />
    //         Video
    //       </div>
    //       <div className="option" style={{ color: "var(--location)" }}>
    //         <UilLocationPoint />
    //         Location
    //       </div>
    //       <div className="option" style={{ color: "var(--shedule)" }}>
    //         <UilSchedule />
    //         Shedule
    //       </div>
    //       <button
    //         className="button ps-button"
    //         onClick={handleUpload}
    //         disabled={loading}
    //       >
    //         {loading ? "uploading" : "Share"}
    //       </button>

    //       <div style={{ display: "none" }}>
    //         <input type="file" ref={imageRef} onChange={onImageChange} />
    //       </div>
    //     </div>

    //     {image && (
    //       <div className="previewImage">
    //         <UilTimes onClick={() => setImage(null)} />
    //         <img src={URL.createObjectURL(image)} alt="preview" />
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={
              auth.picture
                ? auth.picture
                : `http://localhost:5000/uploads/${auth.img}`
            }
            alt="Profile"
          />
          <input
            type="text"
            placeholder={`${auth.firstname}, share your volunteering experiences!`}
            ref={desc}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item" onClick={() => imageRef.current.click()}>
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading}
            >
              {" "}
              {loading ? "uploading" : "Share"}{" "}
            </Button>
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img
              style={{ size: "10px" }}
              src={URL.createObjectURL(image)}
              alt="preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
