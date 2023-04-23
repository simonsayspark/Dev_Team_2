import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

export const HomePage = ({ setCurrentUser }) => {
  const currentUser = useContext(UserContext);

  function logout() {
    setCurrentUser(undefined);
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
              <div className="nav-font">
                <NavLink
                  to={"/"}
                  className="nav-link text-white mx-5"
                  onClick={() => {
                    setCurrentUser(undefined);
                  }}
                >
                  Log out
                </NavLink>
              </div>
            </Navbar.Text>
          </Container>
        </Navbar>
        
        <Container className="mt-3 mx-5">
          <div className="mb-4">
            <h1 className="display-4">Hello {currentUser.ename}!</h1>
          </div>
          <NavLink to={"/addTransaction"} className="d-flex mb-3">
            <button className="btn btn-primary">Submit Transaction</button>
          </NavLink>
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
            <button className="btn btn-primary">View Transactions</button>
          </NavLink>
        </Container>
      </>
    );
  }
};
