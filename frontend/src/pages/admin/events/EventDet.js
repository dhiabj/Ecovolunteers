import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "../../../modals/editProfile.scss";
import { json, useParams } from "react-router-dom";
const EventDet = ({ showEdit, setShowEdit, event }) => {
  const handleClose = () => setShowEdit(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [msg, setMsg] = useState("");

  const [ev, setEv] = useState();

  const onSubmit = async (data) => {
    //console.log(data);
    //console.log(auth._id);

    try {
      const response = await axios.put(
        `http://localhost:5000/events/editEvent/${event._id}`,
        data
      );

      console.log(response.data);
      setEv(response.data);
      handleClose();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={showEdit} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Add a new event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg">
            <Container>
              <Row className="justify-content-center py-5">
                <Col md={8}>
                  <Card className="register-card">
                    <Card.Body>
                      <Form
                        className="register-form"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridTitle">
                            <InputGroup>
                              <Form.Control
                                placeholder="Title"
                                type="text"
                                {...register("title", {
                                  required: true,
                                  pattern: /^[A-Za-z]+$/i,
                                })}
                                isInvalid={!!errors.title}
                                defaultValue={event.title}
                              />
                            </InputGroup>
                            {errors.title && (
                              <small className="text-danger">
                                Please enter the title
                              </small>
                            )}
                          </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridType">
                          <InputGroup>
                            <Form.Control
                              type="text"
                              placeholder="Type"
                              {...register("type", {
                                required: true,
                                pattern: /^[A-Za-z0-9, ]+$/i,
                              })}
                              isInvalid={!!errors.address}
                              defaultValue={event.type}
                            />
                          </InputGroup>
                          {errors.type && (
                            <small className="text-danger">
                              Please enter your address.
                            </small>
                          )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPlace">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon3">
                              <i className="fa-solid fa-location-dot"></i>
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="place"
                              type="text"
                              {...register("place", {
                                required: true,
                                pattern: /^[A-Za-z]+$/i,
                              })}
                              isInvalid={!!errors.place}
                              defaultValue={event.place}
                            />
                          </InputGroup>
                          {errors.place && (
                            <small className="text-danger">
                              Please enter a place.
                            </small>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridDate">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon7">
                              <i className="fa-solid fa-cake-candles"></i>
                            </InputGroup.Text>
                            <Form.Control
                              type="date"
                              {...register("date", { required: true })}
                              isInvalid={!!errors.date}
                              defaultValue={moment(event.date).format(
                                "yyyy-MM-DD"
                              )}
                            />
                          </InputGroup>
                          {errors.date && (
                            <small className="text-danger">
                              Please enter your birthday.
                            </small>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGridParticipants"
                        >
                          <InputGroup>
                            <InputGroup.Text id="basic-addon6">
                              <i className="fa-solid fa-users"></i>
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Max participants"
                              {...register("maxParticipant", {
                                required: true,
                                pattern: /^[A-Za-z0-9, ]+$/i,
                              })}
                              isInvalid={!!errors.maxParticipant}
                              defaultValue={event.maxParticipant}
                            />
                          </InputGroup>
                          {errors.maxParticipant && (
                            <small className="text-danger">
                              Please enter your address.
                            </small>
                          )}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGridDescription"
                        >
                          <InputGroup>
                            <InputGroup.Text id="basic-addon6">
                              <i className="fa-solid fa-text"></i>
                            </InputGroup.Text>
                            <Form.Control
                              as="textarea"
                              type="text"
                              placeholder="Description"
                              {...register("description", {
                                required: true,
                                pattern: /^[A-Za-z0-9, ]+$/i,
                              })}
                              isInvalid={!!errors.description}
                              defaultValue={event.description}
                            />
                          </InputGroup>
                          {errors.description && (
                            <small className="text-danger">
                              Please enter your address.
                            </small>
                          )}
                        </Form.Group>

                        <div className="form-group mt-2"></div>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 my-btn"
                          onClick={handleClose}
                        >
                         Update 
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventDet;
