import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseURL } from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import './deleteRule.scss';
import cancel from '../assets/imgs/cancel.png';

const DeleteRule = ({ showD, setShowD, club, setClub, ruleId }) => {
  const handleClose = () => setShowD(false);

  const deleteRule = async () => {
    try {
      const response = await axios.put(
        `${baseURL}/clubs/deleterule/${club._id}/${ruleId}`
      );
      setClub(response.data);
      toast.success('Rule deleted successfully');
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={showD} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="delete-modal-title">
          <div>Are you sure?</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="center-column">
        <img src={cancel} alt="cancel" className="img-fluid w-25 h-25 mb-3" />
        <span style={{ fontWeight: 'bold' }}>
          Do you really want to delete this{' '}
          <strong style={{ color: '#f44336' }}>rule?</strong>
        </span>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          <i className="fa-solid fa-xmark me-2"></i>Cancel
        </Button>
        <Button variant="danger" onClick={deleteRule}>
          <i className="fa-solid fa-trash me-2"></i>Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRule;
