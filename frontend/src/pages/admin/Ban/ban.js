import React, { useState } from 'react';
import banU from './apiban';


const Ban = ({ username }) => {
  const [isBanned, setIsBanned] = useState(false);

  const handleBanClick = async () => {
    try {
      const message = await banU(username);
      setIsBanned((prevIsBanned) => !prevIsBanned);
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{username}</h2>
      <button onClick={handleBanClick}>{isBanned ? 'Unban' : 'Ban'}</button>
    </div>
  );
};

export default Ban;
