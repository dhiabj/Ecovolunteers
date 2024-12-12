import React from "react";
import Timer from "./Timer";
import './quiz.css';
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
const NavbarQuiz = () => {
  const { auth } = useContext(AuthContext);
  // if (JSON.parse(localStorage.getItem("user")) !== null) {


  return (
    <div className="navbarquiz">
      <h3>Quiz Test</h3>
      <div className="timer_nav">
        <Timer />
      </div>
      <div className="student">
        <img src={`http://localhost:5000/uploads/${auth.img}`} alt="anis" id="img_style" />
        <p>{auth.firstname} {auth.lastname}</p>
      </div>
    </div>
  );
};

export default NavbarQuiz;
