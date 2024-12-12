import React, { useContext, useEffect, useState } from 'react';
import './profile.scss';
import moment from 'moment';

import { Dropdown } from 'react-bootstrap';
import EditProfile from '../../modals/EditProfile';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AuthContext from '../../context/AuthContext';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import badge from '../../assets/imgs/medal.png';

const Profilee = () => {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [selectedCover, setSelectedCover] = useState(null);
  const [selectedPfp, setSelectedPfp] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [hovered, setHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${baseURL}/users/user/${id}`)
      .then((res) => {
        setSelectedUser(res.data);
        console.log(res.data);
        setImageSrc(`http://localhost:5000/uploads/${res.data.img}`);
      })
      .catch((error) => {
        console.log(error);
        navigate('/404');
      });
    if (selectedPfp) {
      //console.log(selectedPfp);
      submitPfp();
    }
    if (selectedCover) {
      //console.log(selectedPfp);
      submitCover();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selectedPfp, selectedCover]);

  const handleShow = () => setShow(true);

  const submitCover = async () => {
    //console.log(selectedCover);
    try {
      const formData = new FormData();
      formData.append('cover', selectedCover);
      const response = await axios.put(
        `${baseURL}/users/addcover/${selectedUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //console.log(response.data);
      setSelectedUser(response.data);
      toast.success('Cover picture added successfully!');
      setSelectedCover(null);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPfp = async () => {
    try {
      const formData = new FormData();
      formData.append('pfp', selectedPfp);
      const response = await axios.put(
        `${baseURL}/users/editpfp/${selectedUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //console.log(response.data);
      setSelectedUser(response.data);
      toast.success('Profile picture updated successfully!');
      setSelectedPfp(null);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <div>
      <div
        className="profile-cover"
        style={{
          backgroundImage: `url("http://localhost:5000/uploads/${selectedUser.cover}")`,
        }}>
        {!selectedUser.cover && <div className="cover-overlay"></div>}
        {auth._id === selectedUser._id ? (
          <div
            className="profile-picture"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}>
            <label htmlFor="file-pfp">
              <img src={imageSrc} alt="pfp" />
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
        ) : (
          <img src={imageSrc} alt="pfp" className="profile-picture" />
        )}
        {auth._id === selectedUser._id && (
          <>
            <label htmlFor="file-cover">
              <div className="add-cover-button">
                <i className="fa-solid fa-camera me-2" />
                {selectedUser.cover ? 'Edit cover' : 'Add cover'}
              </div>
            </label>
            <input
              id="file-cover"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                setSelectedCover(e.target.files[0]);
              }}
              name="cover"
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
      <div className="profile-info">
        <div className="position">
          <div className="d-flex justify-content-between align-items-center">
            <div className="profile-name">
              <div className="name-group">
                {selectedUser.firstname} {selectedUser.lastname}{' '}
                <small className="text-muted profile-username">
                  @{selectedUser.username}
                </small>
              </div>
              {selectedUser.points >= 100 && (
                <img src={badge} className="badge" alt="" />
              )}
            </div>

            <div className="d-flex align-items-center">
              {auth._id === selectedUser._id ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="dot-toggle">
                    <div className="circle">
                      <MoreHorizIcon />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShow}>
                      <i className="fa-regular fa-pen-to-square me-2"></i>edit
                      profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/canvas');
                      }}>
                      <i className="fa-solid fa-user-astronaut me-2"></i>
                      edit EcoMii
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <div className="circle">
                    <MailOutlineIcon />
                  </div>
                  <button className="follow-btn ms-2">
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-text">
              <i className="fa-solid fa-location-dot me-2"></i>
              {selectedUser.address}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-envelope me-2"></i>
              {selectedUser.email}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-cake-candles me-2"></i>
              Born {moment(selectedUser.birthday).format('LL')}
            </div>
            <div className="contact-text">
              <i className="fa-solid fa-calendar-days me-2"></i>
              Joined {moment(selectedUser.createdAt).format('MMM Do YY')}
            </div>
          </div>
        </div>
      </div>
      <EditProfile
        show={show}
        setShow={setShow}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default Profilee;
