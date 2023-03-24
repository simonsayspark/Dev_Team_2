import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container fluid className="m-0">
          <Navbar.Brand>Website Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto ">
              <NavLink href="#home" className="nav-link">
                Home
              </NavLink>
              <NavLink href="#aboutus" className="nav-link">
                About us
              </NavLink>
              <NavLink href="#service" className="nav-link">
                Our Service
              </NavLink>
              <NavLink href="#contact" className="nav-link">Contact</NavLink>
            </Nav>
            <Nav>
              <Navbar.Text>
                <NavLink to={"/login"} className="nav-link">
                  Log in
                </NavLink>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="text-center mt-5 ">
          <Col className="display-2">
            Expense reimbursements made simple - for every business lunch and
            beyond.
          </Col>
        </Row>
        <Row className="">About us</Row>
      </Container>
      {/* 
        Add more content down here, such as an about section, a mission
        statement, etc.
        Examples of what I think would look good: 
        https://www.etecc.com/
        https://evrone.com/
        https://nomadictribe.com/
        */}
    </>
  );
};
