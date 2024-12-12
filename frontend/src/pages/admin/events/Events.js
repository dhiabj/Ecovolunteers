import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import "./events.scss"
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import logo from "../../../assets/imgs/logo.png";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Select,
} from "react-bootstrap";
import "../users/Users.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icons } from "react-toastify";
import { Carousel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Evented } from "@tomtom-international/web-sdk-maps";
import EventDet from "./EventDet";

const Events = () => {
  const [msg, setMsg] = useState("");
  const [id, setId] = useState();

  const [showEdit, setShowEdit] = useState(false);
  const [event, setEvent] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState("");
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setShowEdit(true);
    axios
      .get(`http://localhost:5000/events/find/${id}`)
      .then((response) => {
        setEvent(response.data);

        console.log(id);
      })
      .catch((error) => {
        console.log(error);
      });
    setId(id);
  };
  const buttonStyle = {
    backgroundColor: '#3aaf9f',
    textTransform: 'none',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
  };

  const spanStyle ={
    
      fontSize:'26px',
      fontWeight: 'bold',
      color: '#3aaf9f',
  
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clubs/getClubsByName")
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);

  const handleUserSelection = (e, user) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(
        selectedUsers.filter((u) => u.username !== user.username)
      );
    }
  };
  const handleDeleteSelectedUsers = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) {
      return;
    }

    axios
      .delete("http://localhost:5000/events", {
        data: { usernames: selectedUsers.map((user) => user.username) },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(users.filter((user) => !selectedUsers.includes(user)));
        setSelectedUsers([]);
        toast.success("deleted successfully!");
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    //console.log(data.pfp[0]);
    console.log(club);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("place", data.place);
    formData.append("type", data.type);
    formData.append("maxParticipant", data.maxParticipant);
    formData.append("date", data.date);
    formData.append("description", data.description);

    formData.append("pfp", data.pfp[0]);
    formData.append("club", club);

    axios
      .post(`http://localhost:5000/events/addEvent`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status === "ok") {
          toast.success("Event added successfully!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
        <div className="d-flex justify-content-between">
          <span style={spanStyle} className="d-flex align-items-center">
            <AutoAwesomeIcon className="me-2" fontSize="large" />
            New Events
          </span>
          <Button
            variant="contained"
            style={buttonStyle}
            startIcon={<AddCircleIcon style={{ color: '#fff' }} />}
            onClick={handleShow}>
            Create new event
          </Button>
          
        </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-12">
            <div className="table-wrap">
              <table className="table table-responsive-xl">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Place</th>
                    <th>Type</th>
                    <th>Max participants</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Participants</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user) => (
                    <tr key={user.username} className="alert" role="alert">
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user)}
                          onChange={(e) => handleUserSelection(e, user)}
                        />
                      </td>
                      <td className="d-flex align-items-center">
                        <img
                          src={`http://localhost:5000/uploads/${user.img}`}
                          className="pfp me-3"
                          alt=""
                        />
                        <div className="pl-3 email"></div>
                      </td>

                      <td>{user.title}</td>
                      <td>{user.place}</td>
                      <td>{user.type}</td>
                      <td>{user.maxParticipant}</td>
                      <td>{new Date(user.date).toLocaleDateString()}</td>
                      <td>{user.description}</td>
                      <td>
                        <Dropdown className="form-control">
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="custom-toggle"
                          >
                            Paricipant List
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {user.participants.map((type) => {
                              return (
                                <div>
                                  {" "}
                                  <Dropdown.Item>
                                    {type.firstname} {type.lastname}
                                    {user.participants.length}
                                    {user.participants.length === 0 && (
                                      <p>No participants</p>
                                    )}
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                </div>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>

                      <td>
                        <img
                          onClick={() => handleShowEdit(user._id)}
                          src="/imgs/employee.png"
                          alt="View details"
                        />
                      </td>
                    </tr>
                  ))}
                  <td>
                    {/* <button
                      className="btn btn-primary"
                      onClick={handleShow}
                      id="btn"
                    >
                      Add a new event
                    </button> */}
                  </td>
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-primary" id="btnDel"
              disabled={selectedUsers.length === 0}
              onClick={handleDeleteSelectedUsers}
            >
              Delete Selected
            </button>

            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={users.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>Add a new event </Modal.Title>
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
                              />
                            </InputGroup>
                            {errors.type && (
                              <small className="text-danger">
                                Please enter your address.
                              </small>
                            )}
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formGridPlace"
                          >
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
                              />
                            </InputGroup>
                            {errors.description && (
                              <small className="text-danger">
                                Please enter your address.
                              </small>
                            )}
                          </Form.Group>
                          {/* <Form.Group className="mb-3" controlId="formGridClub">
                    <InputGroup>
                      <InputGroup.Text id="basic-addon3">
                      <i className="fa-solid fa-location-dot"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="club"
                        type="text"
                        {...register("club", {
                          required: true,
                          pattern: /^[A-Za-z]+$/i,
                        })}
                        isInvalid={!!errors.club}
                        defaultValue={event.club}

                      />
                    </InputGroup>
                    {errors.club && (
                      <small className="text-danger">
                        Please enter a place.
                      </small>
                    )}
                  </Form.Group> */}

                          <select
                            className="form-control"
                            value={club}
                            onChange={(e) => {
                              setClub(e.target.value);
                            }}
                          >
                            {clubs.map((club) => {
                              return (
                                <option value={club.name}>{club.name}</option>
                              );
                            })}
                          </select>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Choose a profile picture</Form.Label>
                            <Form.Control
                              type="file"
                              {...register("pfp", { required: true })}
                            />
                            {errors.pfp && (
                              <small className="text-danger">
                                Please enter your profile picture.
                              </small>
                            )}
                            {msg && <div className="success_msg">{msg}</div>}
                          </Form.Group>
                          <div className="form-group mt-2"></div>

                          <Button
                            variant="primary"
                            type="submit"
                            className="w-100 my-btn"
                            onClick={handleClose}
                          >
                            Register
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
        <EventDet
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          selectedUser={selectedUsers}
          setSelectedUser={setSelectedUsers}
          event={event}
        />
      </div>
    </section>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Events;
