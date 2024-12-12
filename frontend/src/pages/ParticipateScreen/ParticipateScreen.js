import React, { useState } from "react";
import axios from "axios";
import "../EventDetails/EventDetails.css";
import "../EventDetails/EventDetails.scss";

import { redirect, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Container, Button, Form } from "react-bootstrap";
import StarRating from "../../components/Rating/StarRating";
import "../../components/comments/comments.scss";
import SendIcon from "@mui/icons-material/Send";
function ParticipateScreen({ match }) {
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [event, setevent] = useState();
  const [comments, setComments] = useState([]);
  const [status, setstatus] = useState();
  const [commentid, setCommentid] = useState();

  const [date, setdate] = useState();
  const [participation, setparticipation] = useState();
  const [maxParticipant, setmaxParticipant] = useState();
  const { auth } = useContext(AuthContext);
  const disabled = false;
  //rating ,desc
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comments]);

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted with input value:", inputValue);
    axios
      .post(`http://localhost:5000/events/addComment`, {
        firstname: auth.firstname,
        lastname: auth.lastname,
        image: auth.img,
        userid: auth._id,
        eventid: id,
        contenu: inputValue,
      })
      .then((response) => {
        // setparticipation(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteComment(commentid, eventid) {
    setCommentid(commentid);
    axios
      .post(`http://localhost:5000/events/deleteComment`, {
        eventid: eventid,
        commentid: commentid,
      })
      .then((response) => {
        // setparticipation(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  //Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'John Doe',
  //     userId: 1,
  //     profilePicture:
  //       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 2,
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
  //     name: 'Jane Doe',
  //     userId: 2,
  //     profilePicture:
  //       'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //   },
  // ];

  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:5000/events/find/${id}`)
      .then((response) => {
        setevent(response.data);

        setloading(false);
        setstatus(response.data.status);
      })
      .catch((error) => {
        setloading(false);
        seterror(true);
        console.log(error);
      });
  }, []);

  async function removeparticipate(id) {}

  async function participate() {
    const participationDetails = {
      event,
      userid: auth._id,
      date: event.date,
      type: event.type,
      title: event.title,
    };
    //console.log(participationDetails)

    axios
      .post(`http://localhost:5000/events/participate`, participationDetails)
      .then((response) => {
        setparticipation(response.data);
        Swal.fire(
          "Success",
          "Your participation to this event is saved",
          "success"
        );
      })
      .catch((error) => {
        setloading(false);
        seterror(true);
        console.log(error);
      });
  }
  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : error ? (
        <h1>Error...</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5 bss">
            <div className="col-md-5">
              <h1>Event :{event.title}</h1>
              <img
                src={`http://localhost:5000/uploads/${event.img}`}
                className="bigimg"
              />
            </div>
            <div className="col-md-5">
              <div>
                <br></br>
                <br />
                <h1>Event Details</h1>
                <hr />
                <br />
                <br />
                <b>
                  <p>Place: {event.place}</p>
                  <p> Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Max participants: {event.maxParticipant}</p>
                  <p>Description: {event.description}</p>
                </b>
                <br />
                <br />
              </div>
              <hr />
              <div></div>

              <br />
              <br />
              <br />
              <div style={{ float: "left" }}>
                <StarRating evid={id} userid={auth._id} />
              </div>

              <div style={{ float: "right" }}>
                <button
                  className="btn btn-primary"
                  id="buttonParticipate"
                  onClick={participate}
                  hidden={event.status === "participating"}
                >
                  Participate now
                </button>
              </div>

              {/* <h1>Add a review</h1>
                        <hr />
                        <Form onSubmit={addPreviewHandler} method="POST" encType='multipart/form-data'>



                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>




                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                />
                            </Form.Group>




                            <Button variant="primary" type="submit">
                                Add Preview
                            </Button>
                        </Form> */}
            </div>
            {/* ///////////////////////////comments///////////////////////////// */}

            <br />
            <br />
            <br />

            <div className="comments">
              <form onSubmit={handleFormSubmit}>
                <div className="write">
                  <img
                    src={`http://localhost:5000/uploads/${auth.img}`}
                    alt=""
                  />

                  <input
                    type="text"
                    placeholder="write a comment"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              </form>
              {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <img
                    src={`http://localhost:5000/uploads/${comment.image}`}
                    alt=""
                  />
                  <div className="info">
                    <span>
                      {comment.firstname} {comment.lastname}{" "}
                      <span className="date">{comment.createdAt}</span>
                    </span>
                    <p>{comment.contenu} </p>
                    <button
                      onClick={() =>
                        deleteComment(comment._id, comment.eventId)
                      }
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ParticipateScreen;

export function MyParticipations() {
  const { auth } = useContext(AuthContext);

  useEffect(async () => {
    const particips = await axios.post(
      `http://localhost:5000/events/getparticipbyuserid`,
      { userid: auth._id }
    );
    console.log(particips.data);
  }, []);
}
