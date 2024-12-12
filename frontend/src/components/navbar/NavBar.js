import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/imgs/logo.png";
import "./navbar.scss";
import ToggleContext from "../../context/ToggleContext";
import Comment from "../../img/comment.png";
const NavBar = () => {
  const { logged, setLogged, auth } = useContext(AuthContext);
  const { isOpen, setIsOpen } = useContext(ToggleContext);

  const signOut = () => {
    localStorage.removeItem("token");
    setLogged(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar className="nav-bg" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <NavLink
            to={auth.role === "admin" ? "/admin" : "/home"}
            className="brand-link"
          >
            <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              style={{ borderRadius: "50%" }}
            />
            <span className="brand-title">EcoVolunteers</span>
          </NavLink>
        </Navbar.Brand>
        {logged && auth.role === "admin" && (
          <div className="bars" onClick={toggle}>
            <i className="fa-solid fa-bars"></i>
          </div>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {logged && auth.role !== "admin" && (
            <Nav className="mx-auto">
              <NavLink to="/home" className="custom-link">
                <i className="fa-solid fa-house me-2"></i>
                Home
              </NavLink>
              <NavLink to="/calendar" className="custom-link">
                <i className="fa-regular fa-calendar-days me-2"></i>
                Calendar
              </NavLink>
              <NavLink to="/clubs" className="custom-link">
                <i className="fa-solid fa-user-group me-2"></i>
                Clubs
              </NavLink>
              <NavLink to="/forum" className="custom-link">
                <i class="fa-solid fa-book me-2"></i>
                Forum
              </NavLink>
            </Nav>
          )}
          <div className="ms-auto">
            {logged ? (
              <div className="d-flex align-items-center">
                <NavLink to="../chat">
                  <i
                    className="fa-regular  fa-message nav-icon"
                    style={{ fontSize: 22, paddingTop: 4 }}
                  ></i>
                </NavLink>

                {/* <i className="fa-regular fa-envelope nav-icon"></i> */}
                <i className="fa-regular fa-bell nav-icon"></i>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="custom-toggle"
                  >
                    <img
                      src={
                        auth.picture
                          ? auth.picture
                          : `http://localhost:5000/uploads/${auth.img}`
                      }
                      className="pfp me-3"
                      alt="pfp"
                    />
                    <span style={{ fontWeight: "bold" }}>
                      {auth.firstname} {auth.lastname}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/profile/${auth._id}`}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/login" onClick={signOut}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <Button className="my-btn" as={Link} to="/login">
                Sign in
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
