import axios from 'axios';
import React, { useContext } from 'react';
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

const RequestP = () => {


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    axios
      .put(`${baseURL}/users/ResetPassword`, data)
      .then((res) => {
        console.log(res);
        console.log(data);
        
        toast.success('password  changed successfully!');
        
          navigate('/login');
       
        
      })
      .catch((error) => {
        console.log(error);
        toast.error('Invalid code or password!');
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
                    <Form.Group className="mb-4" controlId="formBasicCode">
                      <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa-solid fa-key"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Enter code"
                          {...register('code', {
                            required: true,
                            
                          })}
                          isInvalid={!!errors.code}
                        />
                      </InputGroup>
                      {errors.email && (
                        <small className="text-danger">
                          Please enter a valid code.
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
                          {...register('password', {
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

                    <Button type="submit" className="w-100 mb-4 my-btn">
                      Change password now !
                    </Button>
                    <p>
                      Don't have an account?{' '}
                      <Link to="/register">Register here</Link>
                    </p>
                    <p>
                      Forget password?{' '}
                      <Link to="/login">Remembered your password ?</Link>
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

export default RequestP;































// import axios from 'axios';
// import React, {  useState } from 'react';
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   InputGroup,
//   Row,
// } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

// import { toast } from 'react-toastify';
// import { baseURL } from '../../api/api';
// import logo from '../../assets/imgs/logo.png';
// import welcome from '../../assets/imgs/Reforestation-amico.png';

// import './ForgetP.scss';

// const ResetP = () => {
  
//   const [hidden, setHidden] = useState(false);
//   const [code, setCode] = useState("");
//   const[password,setPassword]= useState("");
//   const  onSubmit = (e) => {
    
//     console.log({code});
//     axios
//       .post(`${baseURL}/users/ResetPassword`, {code,password})
//       .then((res) => {
//         //console.log(res);
//        if(res.data.error){
//         toast.error('user not found!');
//        }else{
//         toast.success('Code send to your  Email successful!');
//         setHidden(true);
//        }
        
      
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error('Invalid email ');
//       });
//   };
  

 

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submitCode = (data) => {
//     //console.log(data);
//     axios
//       .post(`${baseURL}/users/ForgetPassword`, data)
//       .then((res) => {
//         //console.log(res);
//        if(res.data.error){
//         toast.error('user not found!');
//        }else{
//         toast.success('Code send to your  Email successful!');
//         setHidden(true);
        
//        }
        
      
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error('Invalid email ');
//       });
//   };
//   return (
//     <div className="bg flex-center">
//       <Container>
//         <Row className="py-5">
//           <Card className="login-card">
//             <Card.Body className="d-flex flex-wrap justify-content-center">
//               <Row>
//                 <Col md={6}>
//                   <img src={welcome} alt="" className="img-fluid" />
//                 </Col>
//                 <Col md={6}>
//                   <img
//                     src={logo}
//                     alt="logo"
//                     className="mx-auto d-block mb-5 logo"
//                   />
//                   <Form
//                     className="login-form"
//                     onSubmit={handleSubmit(onSubmit)}>
//                     <Form.Group className="mb-4" controlId="formBasicEmail">
//                       <InputGroup>
//                         <InputGroup.Text id="basic-addon1">
//                           <i className="fa-solid fa-key"></i>
//                         </InputGroup.Text>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter the code"
//                           name="code"
//                           onChange={(e)=>{setCode(e.target.value)}}
//                         />
//                       </InputGroup>
                    
                     
                      
//                     </Form.Group>
//                     <Form.Group className="mb-4" controlId="formBasicPassword">
//                       <InputGroup>
//                         <InputGroup.Text id="basic-addon2">
//                           <i className="fa-solid fa-lock"></i>
//                         </InputGroup.Text>
//                         <Form.Control
//                           type="password"
//                           placeholder="Password"
//                           name="password"
//                           onChange={(e)=>{setPassword(e.target.value)}}
//                           {...register('password', {
//                             required: true,
//                             minLength: 6,
//                           })}
//                           isInvalid={!!errors.password}
//                         />
//                       </InputGroup>
//                       {errors.password && (
//                         <small className="text-danger">
//                           Please enter a password with at least 6 characters.
//                         </small>
//                       )}
//                     </Form.Group>
                        
//                             <Button type="submit" className="w-100 mb-4 my-btn">
//                       Change your Password now !
//                     </Button>
                        
                        
                    
                    
//                   </Form>
                  
                  
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Row>
//       </Container>
//     </div>
//   );
//                   };      

// export default ResetP;