import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './createClub.scss';
import { toast } from 'react-toastify';
import { baseURL } from '../api/api';
import AuthContext from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import welcome from '../assets/imgs/Volunteering-amico.png';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

import { Col, Container, Modal, Row } from 'react-bootstrap';

const UpdateClub = ({ showU, setShowU, club, setClub }) => {
  const { auth } = useContext(AuthContext);
  const handleClose = () => setShowU(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [privacy, setPrivacy] = useState('');

  //console.log(club);

  useEffect(() => {
    if (club) {
      setName(club.name || '');
      setDescription(club.description || '');
      setPrivacy(club.privacy || '');
    }
  }, [club]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${baseURL}/clubs/update/${club._id}`, {
        name,
        description,
        privacy,
      });
      setClub(response.data);
      toast.success('Club updated successfully');
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={showU} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Edit club info</Modal.Title>
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
                    label="Club name"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    error={name.length < 5}
                    helperText={
                      name.length < 5 && 'Name must be at least 5 characters.'
                    }
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Privacy
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      variant="outlined"
                      color="primary"
                      id="demo-simple-select"
                      sx={{ marginBottom: '20px', display: 'block' }}
                      value={privacy}
                      onChange={(event) => setPrivacy(event.target.value)}
                      label="Privacy">
                      <MenuItem value={'public'}>
                        <PublicIcon className="me-2" />
                        Public
                      </MenuItem>
                      <MenuItem value={'private'}>
                        <LockIcon className="me-2" />
                        Private
                      </MenuItem>
                    </Select>
                  </FormControl>

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

export default UpdateClub;
