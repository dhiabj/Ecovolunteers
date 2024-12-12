import React from 'react';
import { useLocation } from 'react-router-dom';
import "./UserBanned.css";

const Userbanned = () => {
  const location = useLocation();
  const duration = new URLSearchParams(location.search).get('duration');
  const reason = new URLSearchParams(location.search).get('reason');

  return (
    <div className='user-banner'>
      <h1 className='user-banner-heading'>You are banned for {duration} because of {reason}</h1>
      <img src='/imgs/bannn.jpg'></img>
    </div>
  );
};




export default Userbanned;
