import React, { useState, useEffect } from 'react';
import './Post.css';
import './post.scss';
import './comments.scss';

import { Modal, useMantineTheme } from '@mantine/core';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { format } from 'timeago.js';
import logoo from '../../img/ecovulentlogooo.png';
import fbuserlogo from '../../img/facebook-silhouette_thumb..png';
const PostFb = ({ data }) => {
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [postCreator, setPostCreator] = useState(null);

  useEffect(() => {
    console.log(data);
  });

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={logoo} alt="" />
            <div className="details">
              <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="name">Eco Volunteers</span>
              </Link>
              <span className="date">
                Facebook Pinned{' '}
                <i
                  className="fa-solid fa-thumbtack"
                  style={{ color: '#959ca7', marginLeft: '2px' }}></i>
              </span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{data.description}</p>
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
            {data.reacts !== '0' ? (
              <FavoriteOutlinedIcon style={{ cursor: 'pointer' }} />
            ) : (
              <FavoriteBorderOutlinedIcon style={{ cursor: 'pointer' }} />
            )}
            {data.reacts}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {data.commentNumber} Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        <div className="comments">
          {commentOpen && (
            <div className="comment">
              <img src={fbuserlogo} alt="" />
              <div className="info">
                <span>{data.comment?.commentCreator}</span>
                <p>{data.comment?.commentText}</p>
              </div>
              <span className="date">{data.comment?.commentCreatedAgo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFb;
