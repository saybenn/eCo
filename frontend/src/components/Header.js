import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <header>
      {" "}
      <Navbar className="py-3 bg-primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>eCo</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {" "}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-links">
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}{" "}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="admin panel" id="admin-panel">
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && (
                <LinkContainer to="/cart">
                  <Nav.Link className="nav-links">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
              )}
              <Nav.Link
                title="navigation"
                id="navigation"
                className="nav-links"
                onClick={handleShow}
              >
                Navigation
              </Nav.Link>
              <Navbar.Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
              >
                <Offcanvas.Header>
                  <h4>NAVIGATION</h4>

                  <Offcanvas.Title>
                    <i
                      onClick={handleClose}
                      style={{ color: "black" }}
                      className="text-right fas fa-times"
                    ></i>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-start flex-grow-1 pe-3">
                    <LinkContainer to="/shop">
                      <Nav.Item>SHOP</Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/blog">
                      <Nav.Item>BLOG</Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/about">
                      <Nav.Item>ABOUT</Nav.Item>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                      <Nav.Item>CONTACT</Nav.Item>
                    </LinkContainer>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
