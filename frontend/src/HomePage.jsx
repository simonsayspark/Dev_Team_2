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
  function handleClick(){
    navigate("/addTransaction")

  }

  function handleClick2(){
    navigate("/viewTransactions")

  }

  if (currentUser.ceo_id) {
    //CEO homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="lg">
          <Container fluid className="m-0">
            <Navbar.Brand>
              <NavLink to={"/home"} className="nav-link">
                <img
                  width="300px"
                  height="auto"
                  src="/logo_text.png"
                  alt="logo"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Text>
              <Link
                to={"/"}
                className="nav-link text-light fs-4 mx-5 text-nowrap"
                onClick={() => {
                  setCurrentUser(undefined);
                }}
              >
                Log out
              </Link>
            </Navbar.Text>
          </Container>
        </Navbar>
        <Container className="mt-3">
          <h1 className="display-4">Hello {currentUser.cname}!</h1>
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
            <button className="btn btn-primary">
              {" "}
              View Company Transactions
            </button>
          </NavLink>
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
            <button className="btn btn-primary">
              {" "}
              Add and remove employees
            </button>
          </NavLink>
        </Container>
      <Container className="mt-3">
        <h1 className="display-4">Hello {currentUser.cname}!</h1>
        <NavLink to={"/viewTransactions"} className="d-flex mb-3">
          <button className="btn btn-primary btn-lg">
            View Company Transactions
          </button>
        </NavLink>
        <NavLink to={"/viewTransactions"} className="d-flex mb-3">
          <button className="btn btn-primary btn-lg">
            Add and remove employees
          </button>
        </NavLink>
      </Container>
    </>
    );
  } else if (currentUser.role === "Financial Manager") {
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="lg">
          <Container fluid className="m-0">
            <img className="logo" src="/logo_text.png" alt="logo" />
            <Navbar.Brand>
              <NavLink to={"/home"} className="nav-link"></NavLink>
            </Navbar.Brand>
            <Navbar.Text>
              <Link
                to={"/"}
                className="nav-link text-light fs-4 mx-5 text-nowrap"
                onClick={() => {
                  setCurrentUser(undefined);
                }}
              >
                Log out
              </Link>
            </Navbar.Text>
          </Container>
        </Navbar>
        <Container className="mt-3">
          <h1 className="display-4">Hello {currentUser.ename}!</h1>
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
            <button className="btn btn-primary"> View Transactions</button>
          </NavLink>
        </Container>
        ;
      </>
    );
  } else if (currentUser.role === "Employee") {
    //Employee or Financial Manager homepage
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
            <Navbar.Toggle/>
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
              <p>{currentUser.ename}'s Dashboard</p>
            </Row>
            
            <Row className="w-100 homePagePadding">
              <Col className="bg-light text-center me-1 homePageCards">
                <Card>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      Submit Transactions
                    </Card.Title>
                    <Card.Text>
                      Here, you can submit a reimbursement request for a business
                      expense that you made on behalf of your company.
                    </Card.Text>
                    <Button className="mt-auto" onClick={()=>handleClick()}>Submit a transaction</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="bg-light text-center ms-1 homePageCards">
                <Card>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      View Transactions
                    </Card.Title>
                    <Card.Text>
                      Here, you can view all of your previous reimbursement requests,
                      as well as edit, delete, or appeal your submitted transactions.
                    </Card.Text>
                    <Button className="mt-auto" onClick={()=>handleClick2()}>View your transactions</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        </Container>
      </>
    );
  }
};
