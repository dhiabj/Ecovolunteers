import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './createRule.scss';
import { toast } from 'react-toastify';
import { baseURL } from '../api/api';
import AuthContext from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import welcome from '../assets/imgs/Volunteering-amico.png';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const EditRule = ({ showU, setShowU, club, setClub, ruleId }) => {
  const { auth } = useContext(AuthContext);

  const handleClose = () => setShowU(false);

  const [rule, setRule] = useState(null);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const rule = club.rules?.find((rule) => rule._id === ruleId);
    setRule(rule);
  }, [club.rules, ruleId]);

  useEffect(() => {
    if (rule) {
      setTitle(rule.title || '');
      setDescription(rule.description || '');
    }
  }, [rule]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(title, description);
    try {
      const response = await axios.put(
        `${baseURL}/clubs/editrule/${club._id}/${ruleId}`,
        {
          title,
          description,
        }
      );
      setClub(response.data);
      toast.success('Rule updated successfully');
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={showU} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Update Rule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6} className="flex-center">
                <img src={welcome} alt="" className="img-fluid" />
              </Col>
              <Col md={6}>
                <div className="userInfo mb-2">
                  <img
                    src={`http://localhost:5000/uploads/${auth.img}`}
                    alt=""
                  />
                  <div className="details">
                    <span className="name">
                      {auth.firstname} {auth.lastname}
                    </span>
                    <span className="username">Admin</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    sx={{ marginBottom: '20px', display: 'block' }}
                    label="Title"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    error={title.length < 5}
                    helperText={
                      title.length < 5 && 'Title must be at least 5 characters.'
                    }
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <TextField
                    sx={{ marginBottom: '20px', display: 'block' }}
                    label="Description"
                    variant="outlined"
                    color="primary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={description.length < 10}
                    helperText={
                      description.length < 10 &&
                      'Description must be at least 10 characters.'
                    }
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#3aaf9f',
                      color: '#fff',
                      width: '100%',
                    }}
                    variant="contained">
                    Update
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditRule;
