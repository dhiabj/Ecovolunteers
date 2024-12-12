import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import CloudIcon from '@mui/icons-material/Cloud';
import ShowWeather from '../modals/ShowWeather';

const EventTemp = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3f51b5',
    color: '#fff',
  };
  return (
    <div>
      <Fab variant="extended" style={fabStyle} onClick={handleShow}>
        <CloudIcon sx={{ mr: 1 }} />
        Weather
      </Fab>
      <ShowWeather show={show} setShow={setShow} />
    </div>
  );
};

export default EventTemp;
