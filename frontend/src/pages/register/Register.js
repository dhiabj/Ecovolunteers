import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import "./register.scss";
import logo from "../../assets/imgs/logo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../api/api";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

const SITE_KEY = "6Ldk-vUkAAAAAHTaq39zqKBw7AQVfbA9Mvq3B-g-";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const captchaRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const onChange = (value) => {
    setRecaptchaValue(value);
    console.log(value);
  };

  const onSubmit = (data) => {
    //console.log(data.pfp[0]);
    captchaRef.current.reset();
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("birthday", data.birthday);
    formData.append("address", data.address);
    formData.append("number", data.number);
    formData.append("recaptchaValue", recaptchaValue);
    formData.append("pfp", data.pfp[0]);

    axios
      .post(`${baseURL}/users/register`, formData, {
        recaptchaValue,
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        //console.log(res.data.status);
        if (res.data.status === "ok") {
          toast.success("Mail sent successfully!");
          // navigate('/login');
          setMsg(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg">
      <Container>
        <Row className="justify-content-center py-5">
          <Col md={8}>
            <Card className="register-card">
              <Card.Body>
                <img
                  src={logo}
                  alt="logo"
                  className="mx-auto d-block mb-3 logo"
                />
                <div className="title mb-4">Register Here</div>
                <Form
                  className="register-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Row className="mb-3">
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
                      />
                    </InputGroup>
                    {errors.email && (
                      <small className="text-danger">
                        Please enter a valid email address.
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridPassword">
                    <InputGroup>
                      <InputGroup.Text id="basic-addon5">
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
                          required: true,
                          pattern: /^[0-9]+$/i,
                        })}
                        isInvalid={!!errors.number}
                      />
                    </InputGroup>
                    {errors.number && (
                      <small className="text-danger">
                        Please enter a valid number.
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
                      />
                    </InputGroup>
                    {errors.birthday && (
                      <small className="text-danger">
                        Please enter your birthday.
                      </small>
                    )}
                  </Form.Group>

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
                  <div className="form-group mt-2">
                    <ReCAPTCHA
                      sitekey={SITE_KEY}
                      onChange={onChange}
                      ref={captchaRef}
                    />
                  </div>
                  {recaptchaValue && (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 my-btn"
                    >
                      Register
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
