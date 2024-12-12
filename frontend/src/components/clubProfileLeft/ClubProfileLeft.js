import React, { useContext, useEffect, useState } from 'react';
import './clubProfileLeft.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import defaultPfp from '../../assets/imgs/default-pfp.png';
import defaultCover from '../../assets/imgs/default-cover-photo.png';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { toast } from 'react-toastify';
import CreateRule from '../../modals/CreateRule';
import UpdateClub from '../../modals/UpdateClub';
import DeleteClub from '../../modals/DeleteClub';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckIcon from '@mui/icons-material/Check';

const ClubProfileLeft = ({ club, setClub }) => {
  const { auth } = useContext(AuthContext);
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(defaultPfp);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showC, setShowC] = useState(false);
  const handleShowC = () => setShowC(true);
  const [showU, setShowU] = useState(false);
  const handleShowU = () => setShowU(true);
  const [showD, setShowD] = useState(false);
  const handleShowD = () => setShowD(true);
  const [member, setMember] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (club.img) {
      setImageSrc(`http://localhost:5000/uploads/${club.img}`);
    }
  }, [club.img]);

  useEffect(() => {
    if (selectedPfp) {
      const submitPfp = async () => {
        try {
          const formData = new FormData();
          formData.append('img', selectedPfp);
          const response = await axios.put(
            `${baseURL}/clubs/editpfp/${club._id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          console.log(response.data);
          setClub(response.data);

          toast.success('Club profile picture updated successfully!');
          setSelectedPfp(null);
        } catch (error) {
          console.error(error);
        }
      };
      //console.log(selectedPfp);
      submitPfp();
    }

    if (selectedCover) {
      const submitCover = async () => {
        //console.log(selectedCover);
        try {
          const formData = new FormData();
          formData.append('cover', selectedCover);
          const response = await axios.put(
            `${baseURL}/clubs/editcover/${club._id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          //console.log(response.data);
          setClub(response.data);
          toast.success('Club cover picture updated successfully!');
          setSelectedCover(null);
        } catch (error) {
          console.error(error);
        }
      };
      submitCover();
    }
  }, [selectedPfp, selectedCover, club._id, setClub]);

  useEffect(() => {
    const memberFound = club.members?.find(
      (member) => member.userId._id === auth._id
    );
    const joinRequest = club.joinRequests?.find(
      (request) => request._id === auth._id
    );
    //console.log(joinRequest);
    if (memberFound) {
      setMember(true);
    }
    if (joinRequest) {
      setRequestSent(true);
    }
  }, [auth._id, club.members, club.joinRequests]);

  const handleHover = () => {
    setHovered(!hovered);
  };

  const handleFileChange = (e) => {
    const pfp = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(pfp);
    reader.onload = (e) => {
      const newImageUrl = e.target.result;
      setImageSrc(newImageUrl);
    };
    setSelectedPfp(pfp);
  };

  const handleJoin = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/requesttojoin/${club._id}`,
        {
          userId: auth._id,
        }
      );
      console.log(response.data);
      setClub(response.data);
      toast.success('Request sent successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/leaveclub/${club._id}/${auth._id}`
      );
      console.log(response.data);
      setClub(response.data);
      toast.success('You have left the club!');
      navigate('/clubs');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="club-profile-container">
      <div className="club-profile-header">
        <div
          className="club-cover-image"
          style={{
            backgroundImage: `${
              club.cover
                ? `url("http://localhost:5000/uploads/${club.cover}")`
                : `url(${defaultCover})`
            }`,
          }}>
          {/* {!club.cover && <div className="cover-overlay"></div>} */}
          {auth.role === 'club_owner' && auth.clubs.includes(club._id) && (
            <IconButton
              style={{ backgroundColor: '#3aaf9f', color: '#fff' }}
              className="club-btn"
              aria-label="upload picture"
              component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setSelectedCover(e.target.files[0]);
                }}
              />
              <PhotoCamera />
            </IconButton>
          )}
        </div>
        {auth.role === 'club_owner' && auth.clubs.includes(club._id) ? (
          <>
            <div
              className="change-club-profile-image"
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}>
              <label htmlFor="file-pfp" className="p-0">
                <img src={imageSrc} alt="club-pfp" />
                {hovered && (
                  <div className="camera-label">
                    <i className="fa-solid fa-camera"></i>
                    <span>Change Picture</span>
                  </div>
                )}
              </label>
              <input
                id="file-pfp"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                name="pfp"
                style={{ display: 'none' }}
              />
            </div>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              className="club-more"
              onClick={handleClick}>
              <MoreHorizIcon style={{ color: '#333' }} />
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
                  handleShowU();
                  handleClose();
                }}>
                <EditIcon className="me-2" />
                Edit Club
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleShowC();
                  handleClose();
                }}>
                <PostAddIcon className="me-2" />
                Add rule
              </MenuItem>
            </Menu>
          </>
        ) : (
          <img className="club-profile-image" src={imageSrc} alt="club-pfp" />
        )}
      </div>
      {!auth.clubs.includes(club._id) && (
        <>
          {!member ? (
            <>
              {requestSent ? (
                <Button
                  variant="contained"
                  className="request-btn"
                  disabled
                  style={{ backgroundColor: '#9BE186', color: '#fff' }}
                  size="small"
                  startIcon={<CheckIcon />}>
                  Request sent
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#3aaf9f', color: '#fff' }}
                  size="small"
                  className="request-btn"
                  onClick={handleJoin}
                  startIcon={<GroupAddIcon />}>
                  Join
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: '#DE8A44', color: '#fff' }}
              className="request-btn"
              size="small"
              onClick={handleLeave}
              startIcon={<LogoutIcon />}>
              leave club
            </Button>
          )}
        </>
      )}

      <div className="club-profile-info">
        <h1 className="club-profile-name">{club.name}</h1>
        <div className="profile-pictures">
          {club.members?.slice(0, 5).map((member) => (
            <img
              key={member.userId._id}
              src={`http://localhost:5000/uploads/${member.userId.img}`}
              alt=""
            />
          ))}
        </div>
        {club.privacy === 'public' ? (
          <p>
            <PublicIcon className="me-1" /> Public group -{' '}
            {club.members?.length} members
          </p>
        ) : (
          <p>
            <LockIcon className="me-1" /> Private group - {club.members?.length}{' '}
            members
          </p>
        )}
      </div>
      <div className="club-admins">
        <h3 className="club-admins-title">Admins</h3>
        <div className="club-admins-list">
          {club.members?.map(
            (member) =>
              member.userId.isClubAdmin && (
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
                </div>
              )
          )}
        </div>
      </div>
      {auth.role === 'club_owner' && auth.clubs.includes(club._id) && (
        <Button
          variant="contained"
          style={{ backgroundColor: '#DE8A44', color: '#fff' }}
          className="club-btn"
          startIcon={<DeleteIcon />}
          onClick={handleShowD}>
          delete club
        </Button>
      )}
      <CreateRule
        showC={showC}
        setShowC={setShowC}
        club={club}
        setClub={setClub}
      />
      <UpdateClub
        showU={showU}
        setShowU={setShowU}
        club={club}
        setClub={setClub}
      />
      <DeleteClub showD={showD} setShowD={setShowD} club={club} />
    </div>
  );
};

export default ClubProfileLeft;
