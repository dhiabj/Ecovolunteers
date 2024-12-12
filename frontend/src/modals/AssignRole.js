import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { baseURL } from '../api/api';
import { toast } from 'react-toastify';

const AssignRole = ({
  show,
  setShow,
  userId,
  club,
  setClub,
  isClubAdmin,
  setIsClubAdmin,
}) => {
  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    setIsClubAdmin(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log({ userId, isAdmin });
    try {
      const response = await axios.put(
        `${baseURL}/clubs/assignrole/${club._id}/${userId}`,
        { isClubAdmin }
      );
      setClub(response.data);
      toast.success('Role assigned successfully');
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth className="mb-3">
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isClubAdmin}
              label="Role"
              onChange={handleChange}>
              <MenuItem value={false}>Member</MenuItem>
              <MenuItem value={true}>Admin</MenuItem>
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
      </Modal.Body>
    </Modal>
  );
};

export default AssignRole;
