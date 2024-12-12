import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import RightBar from "../../components/rightBar/RightBar";
import "./EventDetails.css";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";
import { FaStar } from "react-icons/fa";
import "../../components/Rating/StarRating.css";
import { useContext, useEffect, useState } from "react";
import LeftBar from "../../components/leftBar/LeftBar";
import EventTemp from "../EventTemp";
import ExploreIcon from '@mui/icons-material/Explore';
import "./EventDetails.scss"
import VideoChatIcon from '@mui/icons-material/VideoChat';
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Padding } from "@mui/icons-material";
const EventDetails = ({ club }) => {
  const [show, setShow] = useState(false);
  const [duplicateevents, setduplicateevents] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchkey, setsearchkey] = useState("");
  const [types, settypes] = useState([]);
  const [type, settype] = useState("");
  const [participation, setparticipation] = useState([]);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const { auth } = useContext(AuthContext);
  const currentDate = new Date();

  useEffect(() => {
    axios
      .post(`http://localhost:5000/events/getparticipbyuserid`, {
        userid: auth._id,
      })
      .then((response) => {
        setparticipation(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // axios.get('http://localhost:5000/events')
    axios
      .get(`http://localhost:5000/events/findClub/${club.name}`)
      .then((response) => {
        setUsers(response.data);
        setduplicateevents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const { data, loading, error } = useFetch(
    `http://localhost:5000/events/getAllByType`
  );
  function filterBySearch() {
    const temprooms = duplicateevents.filter((room) =>
      room.title.toLowerCase().includes(searchkey.toLowerCase())
    );

    setUsers(temprooms);
  }
  function sendEmail() {
    axios
      .get(`http://localhost:5000/events/send`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function filterByType(e) {
    const temprooms = duplicateevents.filter(
      (room) => room.type.toLowerCase() == e.toLowerCase()
    );

    setUsers(temprooms);
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/events/getAllByType")
      .then((response) => {
        settypes(response.data);
        console.log(types);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  async function cancelParticipation(partid, event) {
    try {
      const result = await (
        await axios.post("http://localhost:5000/events/cancelpart", {
          partid,
          event,
        })
      ).data;
      console.log(result);
      Swal.fire("Success", "Your participation is cancelled ", "success");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ display: "flex" }}>
      {/* <LeftBar /> */}

      


      <div style={{ flex: 6, paddingTop: "20px" }}>
        <div className="container">


        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center" id="span">
            <ExploreIcon className="me-2" fontSize="large" />
            Discover
          </span>
          <div className="search-container">
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchkey}
              onChange={(e) => {
                setsearchkey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
            
          </div>
          <div className="search-container">
          
          <select
             id="select"
              
              value={type}
              onChange={(e) => {
                filterByType(e.target.value);
              }}
            >
              <option value="">Select</option>
              {types.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </select>
            </div>
        </div>


          

          <div className="row justify-content-center mt-5">
            {loading ? (
              <h1>Loading....</h1>
            ) : error ? (
              <h1>Error</h1>
            ) : (
              users.map((room) => {
                return (
                  <div className="row bs">
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:5000/uploads/${room.img}`}
                        className="smalling"
                      ></img>
                    </div>
                    
                    <div className="col-md-7">
                      <h1>Title: {room.title}</h1>
                      <p>Place: {room.place}</p>
                      <p>Description: {room.description}</p>
                      <p>Type: {room.type}</p>
                      <br/>
                      
                      <div style={{ float: "right" }}>
                        <Link to={`/participate/${room._id}`}>
                          <button className="btn btn-primary m-2" id="buttonParticipate">
                            Participate now
                          </button>
                        </Link>
                        
                        <Link to={`/Live`}>
                        <span  id="spanVideo">
                        <VideoChatIcon className="me-2" fontSize="large"  />
            
          </span>
         
                        </Link>
                        </div>
                        
                        
                        
                       
                      
                       
                        
                
                       

                        {/* <button className='btn btn-primary' onClick={handleShow} id="btn">View Details</button> */}
                      

                      {/* <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header >
                      <Modal.Title>{room.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                      <Carousel>
                       
                          <Carousel.Item>
                            <img
                              className="d-block w-100 bigimg"
                              src={room.img}
                            />


                          </Carousel.Item>
                      


                      </Carousel>
                      <p>Description :{room.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal> */}
                    </div>
                    
                    <div>
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label>
                            <input
                              type="radio"
                              name="rating"
                              value={ratingValue}
                            />
                            <FaStar
                              className="star"
                              color={
                                ratingValue <= room.totalrating
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              size={20}
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div>({room.ratings.length} reviews)</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="participation-right-bar">
        <div className="container">
          <br/>
          <span className="d-flex align-items-center" id="span" >
           
           Your participations
          </span>
<br/>
          {participation.map((part) => {
            return (
              <div>
                <div className="item">
                  <div className="FollowersCard  " style={{ overflow: "auto" }}>
                    {/*" "*/}<h1 id="h1">Title: {part.title}</h1>
                    <b></b>
                    <p>Date: {new Date(part.date).toLocaleDateString()}</p>
                    <p>Type: {part.type}</p>
                    <p>
                      <b>Status</b> :{" "}
                      {part.status == "cancelled" ? (
                        <Tag color="orange">Cancelled</Tag>
                      ) : (
                        <Tag color="#3aaf9f">Confirmed</Tag>
                      )}
                    </p>
                    <div style={{ float: "right" }}>
                      {part.status !== "cancelled" && (
                        <button
                          className="btn btn-primary"
                          id="buttonParticipate"
                          onClick={() => {
                            cancelParticipation(part._id, part.event);
                          }}
                        >
                          Cancel Participation
                        </button>
                      )}
                    </div>
                  </div>
                  <hr/>
                </div>
              </div>
            );
          })}

         
        </div>
      </div>
      <EventTemp />
    </div>
  );
};

export default EventDetails;
