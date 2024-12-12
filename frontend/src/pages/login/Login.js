import axios from "axios";

import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState, useRef } from "react";

import * as faceapi from "face-api.js";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../api/api";

import logo from "../../assets/imgs/logo.png";
import welcome from "../../assets/imgs/Reforestation-amico.png";
import AuthContext from "../../context/AuthContext";
import "./login.scss";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
const Login = () => {
  const [humanVerif, setHumanVerif] = useState(true);
  const [human, setHuman] = useState(true);
  const { auth, setAuth, setLogged, setAuthPicture } = useContext(AuthContext);
  const [wrongPasswordCount, setWrongPasswordCount] = useState(0);

  const [initializing, setInitializing] = useState(false);
  const [profile, setProfile] = useState(null);
  const videoHeight = 480;
  const videoWidth = 640;
  const videoRef = useRef();
  const canvasRef = useRef();

  function handleFacebookResponse(userObject) {
    const formData = new FormData();
    formData.append("username", userObject.name);
    formData.append("firstname", userObject.first_name);
    formData.append("lastname", userObject.last_name);
    formData.append("email", userObject.email);
    formData.append("birthday", Date.now());
    formData.append("password", userObject.email);
    formData.append("address", "tunis");
    formData.append("pfp", "");
    loginOrRegister(formData, userObject);
  }

  function handleCallbackResponse(respone) {
    var userObject = jwt_decode(respone.credential);
    const formData = new FormData();
    formData.append("username", userObject.name);
    formData.append("firstname", userObject.given_name);
    formData.append("lastname", userObject.family_name);
    formData.append("email", userObject.email);
    formData.append("birthday", userObject.iat);
    formData.append("password", userObject.email);
    formData.append("address", "tunis");
    formData.append("pfp", userObject.picture);
    loginOrRegister(formData, userObject);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "482236655781-sqve4d29bf5lonta4b6birj59cil8cbl.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    setInitializing(true);
    setHumanVerif(true);
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(startVideo);
  };

  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        videoRef.current.srcObject = stream;
        window.localStream = stream;
      },

      (err) => console.error(err)
    );
  };
  const handlevideoOnPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      if (videoRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };
        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        if (detections.length !== 0) {
          setTimeout(() => {
            window.localStream.getTracks().forEach((track) => {
              track.stop();
            });
            setHumanVerif(false);
            setHuman(true);
            clearInterval(handlevideoOnPlay);
          }, 3000);
        }
      }
    }, 100);
  };
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState(null);

  const [longitude, setLongitude] = useState("");
  const [time, setTime] = useState("");
  const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  const API_key = `d30502a20d66f888fbb1a45e4320b4d3`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    axios
      .post(`${baseURL}/users/login`, data)
      .then((res) => {
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user);
        setAuth(res.data.user);
        setLogged(true);
        toast.success("Login successful!");
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          console.log("WEEEEEEEEEEEEEE", latitude);
          setLongitude(position.coords.longitude);
          axios
            .post(`${baseURL}/localisation/createlocalisation`, {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              emailuser: auth.email,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        });

        // let finalApiEndPoint=`${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`
        // let test=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d30502a20d66f888fbb1a45e4320b4d3`
        // console.log(test)
        //axios.get(finalApiEndPoint).then((response)=>{console.log(response.data)})
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          // Call checkBanned function here for non-admin users
          checkBanned();
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password!");
        setWrongPasswordCount(wrongPasswordCount + 1);
        if (wrongPasswordCount === 2) {
          console.log(wrongPasswordCount);
          sendSms(data);
        }
      });
  };

  const checkBanned = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/userconnected",
        {
          headers: {
            Authorization: localStorage.getItem("token"), // Ajoutez ici votre token
          },
        }
      );

      const data = await response.json();

      if (data.user.banned === "banned") {
        // Rediriger vers le composant Banned en passant la propriété duration
        const { banduration, reason } = data.user;
        const queryParams = new URLSearchParams({
          duration: banduration,
          reason: reason,
        }).toString();
        navigate(`/userbanned?${queryParams}`);
        setTimeout(() => {
          localStorage.removeItem("token");
          setLogged(false);
          navigate("/login");
        }, 3000);
      } else {
        // L'utilisateur n'est pas banni, poursuivre normalement
        // ...
      }
    } catch (error) {
      console.error(error);
    }
  };
  function sendSms(data) {
    axios
      .post(`${baseURL}/users/sms/`, data)
      .then((res) => {
        toast.error("sms sent to ur number as a warning!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function loginOrRegister(formData, userObject) {
    axios
      .post(`${baseURL}/users/registerr`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status === "ok") {
          toast.success("Account created successfully!");
          navigate("/login");
        }
        if (res.data.status === "email already used") {
          console.log("email alreadyyyyy");
          const data = {
            email: formData.get("email"),
            password: formData.get("password"),
          };
          console.log(data);
          axios.post(`${baseURL}/users/login`, data).then((res) => {
            //console.log(res);
            localStorage.setItem("token", res.data.token);

            console.log(res.data.user);
            console.log(res.data.token);
            const user = { picture: userObject.picture, ...res.data.user };
            console.log(user);
            setAuth(user);
            setLogged(true);
            toast.success("Login successful!");
            if (res.data.user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/home");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="bg flex-center">
      <Container>
        <Row className="py-5">
          <Card className="login-card">
            <Card.Body className="d-flex flex-wrap justify-content-center">
              <Row>
                <Col md={6}>
                  <img src={welcome} alt="" className="img-fluid" />
                </Col>
                <Col md={6}>
                  <img
                    src={logo}
                    alt="logo"
                    className="mx-auto d-block mb-5 logo"
                  />
                  <Form
                    className="login-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa-solid fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                          isInvalid={!!errors.email}
                        />
                      </InputGroup>
                      {errors.email && (
                        <small className="text-danger">
                          Please enter a valid email address.
                        </small>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon2">
                          <i className="fa-solid fa-lock"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                          isInvalid={!!errors.password}
                        />
                      </InputGroup>
                      {errors.password && (
                        <small className="text-danger">
                          Please enter a password with at least 6 characters.
                        </small>
                      )}
                    </Form.Group>

                    {/* <span>{initializing ? "initializing" : "ready"}</span> */}

                    {humanVerif && (
                      <div className="display-flex justify-content-center">
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          height={videoHeight}
                          width={videoWidth}
                          onPlay={handlevideoOnPlay}
                        ></video>
                        <canvas ref={canvasRef} className="position-absolute">
                          {" "}
                        </canvas>
                      </div>
                    )}

                    <div
                      id="signInDiv"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="mb-3 "
                    ></div>
                    <div>
                      <LoginSocialFacebook
                        appId="142342848471431"
                        onResolve={(response) => {
                          console.log(response.data);
                          setProfile(response.data);
                          handleFacebookResponse(response.data);
                        }}
                        onReject={(error) => {
                          console.log(error);
                        }}
                      >
                        <FacebookLoginButton></FacebookLoginButton>
                      </LoginSocialFacebook>
                      {profile && profile.name}
                    </div>
                    <Button
                      className="w-100 mb-4 my-btn"
                      onClick={() => loadModels()}
                      style={{
                        backgroundColor: human ? "darkslategray" : "#3aaf9f",
                      }}
                    >
                      {human ? "You may Proceed ♥" : "Robot Check Point !"}
                    </Button>
                    {human && (
                      <Button type="submit" className="w-100 mb-4 my-btn">
                        Login
                      </Button>
                    )}
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register">Register here</Link>
                    </p>
                    <p>
                      Forget password? <Link to="/ForgetP">Try this !</Link>
                    </p>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
