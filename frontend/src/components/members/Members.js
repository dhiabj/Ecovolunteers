import React, { useContext, useState } from 'react';
import './members.scss';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { toast } from 'react-toastify';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import BadgeIcon from '@mui/icons-material/Badge';
import BlockIcon from '@mui/icons-material/Block';
import AssignRole from '../../modals/AssignRole';

const Members = ({ club, setClub }) => {
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(false);
  const open = Boolean(anchorEl);
  const handleShow = () => setShow(true);
  const [userId, setUserId] = useState('');
  const [isClubAdmin, setIsClubAdmin] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const acceptRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/acceptrequest/${club._id}/${userId}`
      );
      console.log(response.data);
      setClub(response.data);
      toast.success('Request accepted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const declineRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/declinerequest/${club._id}/${userId}`
      );
      console.log(response.data);
      setClub(response.data);
      toast.success('Request declined successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const removeMember = async (userId) => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/kickmember/${club._id}/${userId}`
      );
      //console.log(response.data);
      setClub(response.data);
      toast.success('Member removed successfully!');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="members">
      <h2>Members</h2>
      <div className="members-list">
        {club.members?.map((member) => (
          <div className="userInfo" key={member.userId._id}>
            <img
              src={`http://localhost:5000/uploads/${member.userId.img}`}
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${member.userId._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="name">
                  {member.userId.firstname + ' ' + member.userId.lastname}
                </span>
              </Link>
              <span className="username">@{member.userId.username}</span>
            </div>
            {auth.role === 'club_owner' && auth.clubs.includes(club._id) && (
              <>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}>
                  <MoreVertIcon style={{ color: '#333' }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <MenuItem
                    onClick={() => {
                      setUserId(member.userId._id);
                      if (member.userId.isClubAdmin) {
                        setIsClubAdmin(true);
                      }
                      handleShow();
                      handleClose();
                    }}>
                    <BadgeIcon className="me-2" />
                    Assign role
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      removeMember(member.userId._id);
                      handleClose();
                    }}>
                    <BlockIcon className="me-2" />
                    Kick
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        ))}
      </div>
      {auth.role === 'club_owner' && auth.clubs.includes(club._id) && (
        <>
          <h2>Join Requests</h2>
          <ul className="join-requests-list">
            {club.joinRequests?.map((request) => (
              <li key={request._id}>
                <img
                  className="member-picture"
                  src={`http://localhost:5000/uploads/${request.img}`}
                  alt="pfp"
                />
                <span>{request.firstname + ' ' + request.lastname}</span>
                <div className="actions">
                  <button
                    className="accept"
                    onClick={() => {
                      acceptRequest(request._id);
                    }}>
                    Accept
                  </button>
                  <button
                    className="decline"
                    onClick={() => {
                      declineRequest(request._id);
                    }}>
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <AssignRole
        show={show}
        setShow={setShow}
        userId={userId}
        club={club}
        setClub={setClub}
        isClubAdmin={isClubAdmin}
        setIsClubAdmin={setIsClubAdmin}
      />
    </div>
  );
};

export default Members;
