import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseURL } from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import './deleteRule.scss';
import cancel from '../assets/imgs/cancel.png';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteClub = ({ showD, setShowD, club }) => {
  const handleClose = () => setShowD(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteClub = async () => {
    try {
      const response = await axios.delete(
        `${baseURL}/clubs/delete/${club._id}/${auth._id}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success('Club deleted successfully');
        handleClose();
        navigate('/clubs');
      }
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
          <strong style={{ color: '#f44336' }}>club?</strong>
        </span>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          <i className="fa-solid fa-xmark me-2"></i>Cancel
        </Button>
        <Button variant="danger" onClick={deleteClub}>
          <i className="fa-solid fa-trash me-2"></i>Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteClub;
