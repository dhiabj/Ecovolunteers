import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Weather from '../components/weather/Weather';

const ShowWeather = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Weather />
      </Modal.Body>
    </Modal>
  );
};

export default ShowWeather;
