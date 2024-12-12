import React, { useState, useEffect } from 'react';
import './Post.css';
import './post.scss';

import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { likePost } from '../../api/PostsRequests';
import { useSelector } from 'react-redux';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { format } from 'timeago.js';
import { getUser } from '../../api/UserRequests';
import axios from 'axios';

const Post = ({ data }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [liked, setLiked] = useState(data.likes.includes(auth._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showViewer, setShowViewer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [postCreator, setPostCreator] = useState(null);

  const handleLike = () => {
    likePost(data._id, auth._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    const userid = data.userId;
    const getUserData = async () => {
      try {
        const { data } = await getUser(userid);
        setPostCreator(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`http://localhost:5000/comments/comments/${data._id}`)
        .then(({ data }) => {
          setComments(data);
        })
        .catch((err) => console.error(err));
    };
    getComments();
  }, [data]);
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={`http://localhost:5000/uploads/${postCreator?.img} `}
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${data.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="name">{postCreator?.username}</span>
              </Link>
              <span className="date">{format(data.createdAt)}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{data.desc}</p>
          <img
            src={
              data?.image
                ? process.env.REACT_APP_PUBLIC_FOLDER + data?.image
                : ''
            }
            alt=""
            onClick={() => setModalOpened(true)}
          />
          <Modal
            overlayColor={
              theme.colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2]
            }
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%">
            <img
              src={
                data.image
                  ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                  : ''
              }
              className="d-block w-100"
              alt="..."
            />
          </Modal>
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FavoriteOutlinedIcon
                style={{ cursor: 'pointer' }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                style={{ cursor: 'pointer' }}
                onClick={handleLike}
              />
            )}
            {likes}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments.length} Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && (
          <Comments post={data} comments={comments} setComments={setComments} />
        )}
      </div>
    </div>
  );
};

export default Post;
