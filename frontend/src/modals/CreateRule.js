import axios from 'axios';
import React, { useContext } from 'react';
import './createRule.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { baseURL } from '../api/api';
import AuthContext from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import welcome from '../assets/imgs/Volunteering-amico.png';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const CreateRule = ({ showC, setShowC, club, setClub }) => {
  const { auth } = useContext(AuthContext);
  const handleClose = () => setShowC(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const response = await axios.put(
        `${baseURL}/clubs/createrule/${club._id}`,
        data
      );
      setClub(response.data);
      toast.success('Rule created successfully');
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={showC} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Create Rule</Modal.Title>
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    sx={{ marginBottom: '20px', display: 'block' }}
                    label="Rule title"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    {...register('title', {
                      required: true,
                      minLength: 5,
                    })}
                    error={errors.title ? true : false}
                    helperText={
                      errors.title ? 'Title must be at least 5 characters.' : ''
                    }
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
                    {...register('description', {
                      required: true,
                      minLength: 10,
                    })}
                    error={errors.description ? true : false}
                    helperText={
                      errors.description
                        ? 'Description must be at least 10 characters.'
                        : ''
                    }
                  />
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: '#3aaf9f',
                      color: '#fff',
                      width: '100%',
                    }}
                    variant="contained">
                    Create
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

export default CreateRule;
