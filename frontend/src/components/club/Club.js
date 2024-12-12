import React from 'react';
import './club.scss';
import defaultCover from '../../assets/imgs/default-cover-photo.png';
import defaultPfp from '../../assets/imgs/default-pfp.png';
import { Link, useNavigate } from 'react-router-dom';

const Club = ({ club }) => {
  const navigate = useNavigate();
  const handleVisit = () => {
    navigate(`/clubs/${club._id}`);
  };
  return (
    <div className="club-box">
      <div className="cover">
        <img
          src={
            club.cover
              ? `http://localhost:5000/uploads/${club.cover}`
              : defaultCover
          }
          alt="club-cover"
          className="img-fluid"
        />
        <div className="profile">
          <img
            src={
              club.img
                ? `http://localhost:5000/uploads/${club.img}`
                : defaultPfp
            }
            alt=""
          />
        </div>
      </div>

      <div className="content">
        <div>
          <Link to={`/clubs/${club._id}`} className="club-name">
            {club.name}
          </Link>
          <p>{club.members.length} members</p>
        </div>
        <button onClick={handleVisit}>Visit Club</button>
      </div>
    </div>
  );
};

export default Club;
