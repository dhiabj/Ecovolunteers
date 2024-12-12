import React, { useContext, useState } from 'react';
import './overview.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import AuthContext from '../../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import EditRule from '../../modals/EditRule';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteRule from '../../modals/DeleteRule';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Overview = ({ club, setClub }) => {
  const { auth } = useContext(AuthContext);

  const [showU, setShowU] = useState(false);
  const [showD, setShowD] = useState(false);

  const handleShowU = () => setShowU(true);
  const handleShowD = () => setShowD(true);
  const [ruleId, setRuleId] = useState('');
  const [clicked, setClicked] = useState(null);

  const clickHandler = (id) => {
    return () => {
      if (clicked === id) {
        setClicked(null);
      } else {
        setClicked(id);
      }
    };
  };

  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p className="description">{club.description}</p>
      <div className="about-group">
        <div className="visibility">
          <span>
            <VisibilityIcon fontSize="large" className="me-2" />
            <h2>Visibility</h2>
          </span>
          {club.privacy === 'public' ? (
            <p>Anyone can find this group.</p>
          ) : (
            <p>Only members can find this group.</p>
          )}
        </div>
        <div className="history">
          <span>
            <HistoryIcon fontSize="large" className="me-2" />
            <h2>History</h2>
          </span>
          <p>
            Group created on {moment(club.createdAt).format('MMMM Do YYYY')}
          </p>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <i className="fa-solid fa-scroll fa-xl me-2"></i>
        <h2>Club Rules</h2>
      </div>
      <div className="list-wrap">
        <div className="list">
          {club.rules?.map((rule, id) => (
            <div key={id} className="list-item" onClick={clickHandler(id)}>
              <span style={{ fontSize: '18px', marginRight: '10px' }}>
                {rule.title}
              </span>
              {clicked === id ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
              {auth.role === 'club_owner' && auth.clubs.includes(club._id) && (
                <>
                  <IconButton
                    aria-label="edit"
                    style={{ color: '#3aaf9f' }}
                    size="small"
                    onClick={() => {
                      setRuleId(rule._id);
                      handleShowU();
                    }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    style={{ color: '#ff1744' }}
                    size="small"
                    onClick={() => {
                      setRuleId(rule._id);
                      handleShowD();
                    }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </>
              )}
              {clicked === id && <p>{rule.description}</p>}
            </div>
          ))}
        </div>
      </div>

      <EditRule
        showU={showU}
        setShowU={setShowU}
        club={club}
        setClub={setClub}
        ruleId={ruleId}
      />
      <DeleteRule
        showD={showD}
        setShowD={setShowD}
        club={club}
        setClub={setClub}
        ruleId={ruleId}
      />
    </div>
  );
};

export default Overview;
