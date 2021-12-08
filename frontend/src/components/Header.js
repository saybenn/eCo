import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const userInfo = null;
  const logoutHandler = () => {
    //fill me
  };
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
                    <Nav.Link className="nav-links">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-links">
                    <i class="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}{" "}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-links">
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              <NavDropdown title="navigation" id="navigation">
                <LinkContainer to="/shop">
                  <Nav.Link>
                    <NavDropdown.Item>SHOP</NavDropdown.Item>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/blog">
                  <Nav.Link>
                    <NavDropdown.Item>BLOG</NavDropdown.Item>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link>
                    <NavDropdown.Item>ABOUT</NavDropdown.Item>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contact">
                  <Nav.Link>
                    <NavDropdown.Item>CONTACT</NavDropdown.Item>
                  </Nav.Link>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
