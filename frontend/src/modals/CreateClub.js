import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './createClub.scss';
import { useForm } from 'react-hook-form';
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
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateClub = ({
  show,
  setShow,
  clubs,
  newClubs,
  setClubs,
  setNewClubs,
  clubsCreated,
  setClubsCreated,
}) => {
  const { auth, setAuth } = useContext(AuthContext);
  const handleClose = () => setShow(false);

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/clubs/followers/${auth._id}`
        );
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, [auth._id]);

  useEffect(() => {
    console.log(followers);
  }, [followers]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      privacy: 'public',
    },
  });

  const privacy = watch('privacy');

  const onSubmit = async (data) => {
    //console.log(personName);
    const members = personName.map((person) => {
      return { userId: person };
    });
    //console.log(members);
    console.log({ ...data, userId: auth._id, members: members });

    try {
      const response = await axios.post(`${baseURL}/clubs/create`, {
        ...data,
        userId: auth._id,
        members: members,
      });
      console.log(response.data);
      setAuth(response.data.user);
      setClubs([...clubs, response.data.club]);
      setNewClubs([...newClubs, response.data.club]);
      setClubsCreated([...clubsCreated, response.data.club]);
      handleClose();
      toast.success('Club created successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Create new club</Modal.Title>
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
                    label="Club name"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    {...register('name', {
                      required: true,
                      minLength: 5,
                    })}
                    error={errors.name ? true : false}
                    helperText={
                      errors.name ? 'Name must be at least 5 characters.' : ''
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
                      label="Privacy"
                      {...register('privacy', { required: true })}>
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Invite followers
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      sx={{ marginBottom: '20px', display: 'block' }}
                      id="demo-multiple-name"
                      color="primary"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput label="Invite followers" />}
                      MenuProps={MenuProps}>
                      {followers.map((follower) => (
                        <MenuItem
                          key={follower._id}
                          value={follower._id}
                          style={getStyles(
                            follower.firstname + ' ' + follower.lastname,
                            personName,
                            theme
                          )}>
                          <img
                            src={`http://localhost:5000/uploads/${follower.img}`}
                            alt=""
                            className="follower-img"
                          />
                          {follower.firstname + ' ' + follower.lastname}
                        </MenuItem>
                      ))}
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

export default CreateClub;
