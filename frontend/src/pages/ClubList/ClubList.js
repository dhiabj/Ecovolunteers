import React, { useContext, useEffect, useState } from 'react';
import Club from '../../components/club/Club';
import './clubList.scss';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import ClubLeftBar from '../../components/clubLeftBar/ClubLeftBar';
import CreateClub from '../../modals/CreateClub';
import axios from 'axios';
import { baseURL } from '../../api/api';
import AuthContext from '../../context/AuthContext';

const ClubList = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [clubs, setClubs] = useState([]);
  const [newClubs, setNewClubs] = useState([]);
  const [clubsCreated, setClubsCreated] = useState([]);
  const [clubsJoined, setClubsJoined] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const getNewestClubs = async () => {
      try {
        const response = await axios.get(`${baseURL}/clubs/newest`);
        setNewClubs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewestClubs();
  }, [newClubs.length]);

  useEffect(() => {
    const getClubsCreated = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/clubs/created/${auth._id}`
        );
        setClubsCreated(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getClubsJoined = async () => {
      try {
        const response = await axios.get(`${baseURL}/clubs/joined/${auth._id}`);
        setClubsJoined(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClubsJoined();
    getClubsCreated();
  }, [auth._id, clubsCreated.length, clubsJoined.length]);

  useEffect(() => {
    const getClubs = async () => {
      try {
        const response = await axios.get(`${baseURL}/clubs`);
        setClubs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchClubs = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/clubs/search?name=${searchTerm}`
        );
        setClubs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      fetchClubs();
    } else {
      getClubs();
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const buttonStyle = {
    backgroundColor: '#3aaf9f',
    textTransform: 'none',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
  };

  return (
    <div className="club-list">
      <ClubLeftBar
        clubsCreated={clubsCreated}
        clubsJoined={clubsJoined}
        setClubsJoined={setClubsJoined}
      />
      <div className="club-list-content">
        <div className="d-flex justify-content-between">
          <span  className="d-flex align-items-center">
            <AutoAwesomeIcon className="me-2" fontSize="large" />
            New clubs
          </span>
          <Button
            variant="contained"
            style={buttonStyle}
            startIcon={<AddCircleIcon style={{ color: '#fff' }} />}
            onClick={handleShow}>
            Create new club
          </Button>
        </div>

        <div className="clubs">
          {newClubs.map((club) => (
            <Club club={club} key={club._id} />
          ))}
        </div>
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center">
            <ExploreIcon className="me-2" fontSize="large" />
            Discover
          </span>
          <div className="search-container">
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="clubs">
          {clubs.map((club) => (
            <Club club={club} key={club._id} />
          ))}
        </div>
      </div>
      <CreateClub
        show={show}
        setShow={setShow}
        clubs={clubs}
        newClubs={newClubs}
        setClubs={setClubs}
        setNewClubs={setNewClubs}
        clubsCreated={clubsCreated}
        setClubsCreated={setClubsCreated}
      />
    </div>
  );
};

export default ClubList;
