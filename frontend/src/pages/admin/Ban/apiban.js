import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import "./apiban.css"

const BanUser = ({ username, isAlreadyBanned }) => {
  const [duration, setDuration] = useState('');
  const [isBanned, setIsBanned] = useState(isAlreadyBanned);
  const [reason, setReason] = useState('');


  const handleDurationChange = (event) => {
    const selectedDuration = event.target.value;
    setDuration(selectedDuration);
  };





  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleBanClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/userB/ban/${username}`, { duration, reason });
      console.log(response.data);
      setIsBanned(response.data.message === 'User banned');
      toast.warning('User Banned !!!!!!');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ab">
      <label>
        Reason:
        <input type="text" value={reason} onChange={(event) => setReason(event.target.value)} />
      </label>

      <label>
        Duration:
        <select name="duration" value={duration} onChange={handleDurationChange}>
          <option value="">Select duration</option>
          <option value="2 months">2 months</option>
          <option value="4 months">4 months</option>
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
          <option value="permanent">Permanent</option>
        </select>
      </label>

      <br />
      <button onClick={handleBanClick}>{isBanned ? 'Unban' : 'Ban'}</button>
      {isBanned && <p>User is currently banned</p>}
    </form>
  );
};

export default BanUser;
