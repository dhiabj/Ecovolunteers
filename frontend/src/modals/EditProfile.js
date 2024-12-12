import axios from "axios";
import moment from "moment";
import React, { useContext } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { baseURL } from "../api/api";
import AuthContext from "../context/AuthContext";
import "./editProfile.scss";

const EditProfile = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { auth, setAuth } = useContext(AuthContext);

  const onSubmit = async (data) => {
    //console.log(data);
    //console.log(auth._id);

    try {
      const response = await axios.put(
        `${baseURL}/users/editprofile/${auth._id}`,
        data
      );
      console.log(response.data);
      setAuth(response.data);
      handleClose();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center py-4">
            <Col md={8}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <div className="flex-center mb-4">
                    <img
                      src={`http://localhost:5000/uploads/${auth.img}`}
                      className="modal-pfp"
                      alt="pfp"
                    />
                  </div>
                  <Form.Group as={Col} controlId="formGridFirstname">
                    <InputGroup>
                      <InputGroup.Text id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="First Name"
                        type="text"
                        {...register("firstname", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        isInvalid={!!errors.firstname}
                        defaultValue={auth.firstname}
                      />
                    </InputGroup>
                    {errors.firstname && (
                      <small className="text-danger">
                        Please enter your first name.
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridLastname">
                    <InputGroup>
                      <InputGroup.Text id="basic-addon2">
                        <i className="fa-solid fa-user"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Last Name"
                        type="text"
                        {...register("lastname", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        isInvalid={!!errors.lastname}
                        defaultValue={auth.lastname}
                      />
                    </InputGroup>
                    {errors.lastname && (
                      <small className="text-danger">
                        Please enter your last name.
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridUsername">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon3">
                      <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Username"
                      type="text"
                      {...register("username", {
                        required: true,
                        pattern: /^[A-Za-z]+$/i,
                      })}
                      isInvalid={!!errors.username}
                      defaultValue={auth.username}
                    />
                  </InputGroup>
                  {errors.username && (
                    <small className="text-danger">
                      Please enter a username.
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon4">
                      <i className="fa-solid fa-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      isInvalid={!!errors.email}
                      defaultValue={auth.email}
                    />
                  </InputGroup>
                  {errors.email && (
                    <small className="text-danger">
                      Please enter a valid email address.
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon6">
                      <i className="fa-solid fa-location-dot"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      {...register("address", {
                        required: true,
                        pattern: /^[A-Za-z0-9, ]+$/i,
                      })}
                      isInvalid={!!errors.address}
                      defaultValue={auth.address}
                    />
                  </InputGroup>
                  {errors.address && (
                    <small className="text-danger">
                      Please enter your address.
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon6">
                      <i className="fa-solid fa-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      {...register("number", {
                        required: false,
                        pattern: /^[0-9]+$/i,
                      })}
                      isInvalid={!!errors.number}
                      defaultValue={auth.number ? auth.number : ""}
                    />
                  </InputGroup>
                  {errors.address && (
                    <small className="text-danger">
                      Please enter your Number.
                    </small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridBirthday">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon7">
                      <i className="fa-solid fa-cake-candles"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      {...register("birthday", { required: true })}
                      isInvalid={!!errors.birthday}
                      defaultValue={moment(auth.birthday).format("yyyy-MM-DD")}
                    />
                  </InputGroup>
                  {errors.birthday && (
                    <small className="text-danger">
                      Please enter your birthday.
                    </small>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 my-btn"
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfile;
