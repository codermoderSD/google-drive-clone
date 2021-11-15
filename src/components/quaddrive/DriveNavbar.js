import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const DriveNavbar = () => {
  return (
    <Navbar
      bg="light"
      expand="sm"
      className="d-flex justify-content-between px-3"
    >
      <Navbar.Brand as={Link} to="/">
        QuadDrive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default DriveNavbar;
