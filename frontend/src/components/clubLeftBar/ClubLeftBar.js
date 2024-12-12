import React, { useContext, useState } from "react";
import "./clubLeftBar.scss";
import logo from "../../assets/imgs/logo.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import defaultPfp from "../../assets/imgs/default-pfp.png";
import { Link } from "react-router-dom";
import { baseURL } from "../../api/api";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ClubLeftBar = ({ clubsCreated, clubsJoined, setClubsJoined }) => {
  const [clicked, setClicked] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickHandler = (id) => {
    return () => {
      if (clicked === id) {
        setClicked(null);
      } else {
        setClicked(id);
      }
    };
  };

  const handleLeave = async (id) => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/leaveclub/${id}/${auth._id}`
      );
      console.log(response.data);
      setClubsJoined(clubsJoined.filter((club) => club._id !== id));
      toast.success("You have left the club!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="club-left-bar">
      <div className="club-container">
        <span>Clubs you've created</span>
        {clubsCreated?.map((club) => (
          <div key={club._id}>
            <div className="club-item" onClick={clickHandler(club._id)}>
              <img
                src={
                  club.img
                    ? `http://localhost:5000/uploads/${club.img}`
                    : defaultPfp
                }
                alt="club-pfp"
              />
              <div className="club-name-container">
                <div className="club-name-box">
                  <span>{club.name}</span>
                  {clicked === club._id ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
                <p>Last active about an hour</p>
              </div>
            </div>
            {clicked === club._id && (
              <Button
                component={Link}
                to={`/clubs/${club._id}`}
                className="view-profile-btn"
                variant="outlined"
                startIcon={<PeopleOutlineIcon className="icon-color" />}
              >
                view Profile
              </Button>
            )}
          </div>
        ))}

        <span>Clubs you've joined</span>
        {clubsJoined?.map((club) => (
          <div key={club._id}>
            <div className="club-item" onClick={clickHandler(club._id)}>
              <img
                src={
                  club.img
                    ? `http://localhost:5000/uploads/${club.img}`
                    : defaultPfp
                }
                alt="club-pfp"
              />
              <div className="club-name-container">
                <div className="club-name-box">
                  <span>{club.name}</span>
                  {clicked === club._id ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </div>
                <p>Last active about an hour</p>
              </div>
            </div>
            {clicked === club._id && (
              <div className="button-group">
                <Button
                  className="leave-club-btn"
                  variant="outlined"
                  onClick={() => handleLeave(club._id)}
                  startIcon={<LogoutIcon className="icon-color" />}
                >
                  Leave Club
                </Button>
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon style={{ color: "#333" }} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to={`/clubs/${club._id}`}
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      <PeopleOutlineIcon className="me-2" />
                      view club profile
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubLeftBar;
