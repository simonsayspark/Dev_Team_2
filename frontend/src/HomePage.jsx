import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.css";

export const HomePage = ({ setCurrentUser }) => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    setCurrentUser(undefined);
  }

  if (currentUser.ceo_id) { //CEO homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
          <Container fluid className="m-0">
            <Navbar.Brand className="theBrand">
              <NavLink to={"/home"} className="nav-link">
                <img
                  width="300px"
                  height="auto"
                  src="/logo_text.png"
                  alt="logo"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <NavbarCollapse>
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <NavLink
                  to={"/"}
                  className="fs-4 nav-link text-light mx-5"
                  onClick={() => {
                    setCurrentUser(undefined);
                  }}
                >
                  Log out
                </NavLink>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
          </NavLink>
        </Container>

        <Container className="mt-5">
          <Row className="display-1 text-center">
            <p>{currentUser.cname}'s Dashboard</p>
          </Row>

          <Row className="w-100">
            <Col className="bg-light text-center me-1 homePageCards">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    Approve and Deny Transactions
                  </Card.Title>
                  <Card.Text>
                    View all of the pending reimbursement requests
                    submitted by employees in your company.
                  </Card.Text>
                  <Button className="mt-auto submitButton" onClick={() => navigate("/viewTransactions")}>View Reimbursement Requests</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="bg-light text-center ms-1 homePageCards">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    Add/Remove Employees
                  </Card.Title>
                  <Card.Text>
                    View all of the employees in your company,
                    as well as add or remove any employees.
                  </Card.Text>
                  <Button className="mt-auto submitButton" onClick={() => navigate("/removeEmployees")}>Add or remove an employee</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (currentUser.role === "Financial Manager") { //Financial Manager homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
          <Container fluid className="m-0">
            <Navbar.Brand className="theBrand">
              <NavLink to={"/home"} className="nav-link">
                <img
                  width="300px"
                  height="auto"
                  src="/logo_text.png"
                  alt="logo"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <NavbarCollapse>
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <NavLink
                  to={"/"}
                  className="fs-4 nav-link text-light mx-5"
                  onClick={() => {
                    setCurrentUser(undefined);
                  }}
                >
                  Log out
                </NavLink>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        <Container className="mt-5">
          <Row className="display-1 text-center">
            <p>{currentUser.ename}'s Dashboard</p>
          </Row>

          <Row className="w-100">
            <Card className="bg-light text-center homePageCards">
              <Card.Body className="d-flex flex-column">
                <Card.Title>
                  Approve and Deny Transactions
                </Card.Title>
                <Card.Text>
                  View all of the pending reimbursement requests
                  submitted by employees in your company.
                </Card.Text>
                <Button className="mt-auto submitButton"
                  onClick={() => {
                    navigate("/viewTransactions")
                  }}>
                  View Reimbursement Requests
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
        ;
      </>
    );
  } else if (currentUser.role === "Employee") { //Employee homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
          <Container fluid className="m-0">
            <Navbar.Brand className="theBrand">
              <NavLink to={"/home"} className="nav-link">
                <img
                  width="300px"
                  height="auto"
                  src="/logo_text.png"
                  alt="logo"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
            <NavbarCollapse>
              <Nav className="justify-content-end" style={{ width: "100%" }}>
                <NavLink
                  to={"/"}
                  className="fs-4 nav-link text-light mx-5"
                  onClick={() => {
                    setCurrentUser(undefined);
                  }}
                >
                  Log out
                </NavLink>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <Row className="display-1 text-center">
            <p id="header" className="">{currentUser.ename}'s Dashboard</p>
          </Row>

          <Row className="w-100">
            <Col className="bg-light text-center me-1 homePageCards">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-3" id="header">
                    Submit Transactions
                  </Card.Title>
                  <Card.Text className="fs-4" id="small-header" >
                    Submit a reimbursement request for a business
                    expense that you made on behalf of your company.
                  </Card.Text>
                  <Button className=" fs-5 mt-auto submitButton" id="small-header" onClick={() => navigate("/addTransaction")}>Submit a transaction</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="bg-light text-center ms-1 homePageCards">
              <Card>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-3" id="header">
                    View Transactions
                  </Card.Title>
                  <Card.Text className="fs-4" id="small-header">
                    View all previous reimbursement requests,
                    as well as edit, delete, or appeal your submitted transactions.
                  </Card.Text>
                  <Button className="mt-auto submitButton fs-5" id="small-header" onClick={() => navigate("/viewTransactions")}>View your transactions</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};
