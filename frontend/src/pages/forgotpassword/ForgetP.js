import axios from 'axios';
import React, {  useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../api/api';
import logo from '../../assets/imgs/logo.png';
import welcome from '../../assets/imgs/Reforestation-amico.png';

import './ForgetP.scss';

const ForgetP = () => {
  
    const navigate = useNavigate();

  const [hidden, setHidden] = useState(false);
  const [code, setCode] = useState("");

  
  

 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    axios
      .post(`${baseURL}/users/ForgetPassword`, data)
      .then((res) => {
        //console.log(res);
       if(res.data.error){
        toast.error('user not found!');
       }else{
        toast.success('Code send to your  Email successful!');
        setHidden(true);
        navigate('/ResetP');
       }
        
      
      })
      .catch((error) => {
        console.log(error);
        toast.error('Invalid email ');
      });
  };
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
                    onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa-solid fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          {...register('email', {
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

                        {/* {!hidden && ( */}
                            <Button type="submit" className="w-100 mb-4 my-btn">
                      Send a code to my Email
                    </Button>
                        {/* )} */}
                        
                    
                    
                  </Form>
                  
                  {/* {hidden && (
                    <Form onSubmit={submitCode}>
                        <Form.Group>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                        <i className="fa-solid fa-key"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Enter code"
                          name="code"
                          onChange={(e)=>{setCode(e.target.value)}}
                          
                          
                        />
                      </InputGroup>
                        </Form.Group>
                        <Button type="submit" className="w-100 mb-4 my-btn">
                      Submit code
                    </Button>
                    </Form>
                  )} */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
                  };      

export default ForgetP;