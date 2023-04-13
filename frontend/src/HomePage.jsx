import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
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
          <img className="logo" src="/logo_text.png" alt="logo" />
            <Navbar.Brand>
              <NavLink to={"/home"} className="nav-link">
              </NavLink>
            </Navbar.Brand>
            <Navbar.Text>
              <NavLink
                to={"/"}
                className="nav-link"
                onClick={() => {
                  setCurrentUser(undefined);
                }}
              >
                Log out
              </NavLink>
            </Navbar.Text>
          </Container>
        </Navbar>
        Hello {currentUser.cname}!
      </>
    );
  } else if (currentUser.employee_id) {
    //Employee or Financial Manager homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="lg">
        <img className="logo" src="/logo_text.png" alt="logo" />
          <Container fluid className="m-0">

            <Navbar.Brand>
              <NavLink to={"/home"} className="nav-link">
              </NavLink>
            </Navbar.Brand>
            <Navbar.Text>
              <NavLink
                to={"/"}
                className="nav-link"
                onClick={() => {
                  setCurrentUser(undefined);
                }}
              >
                Log out
              </NavLink>
            </Navbar.Text>
          </Container>
        </Navbar>

        <Container className="mt-3">
          <h1 className="display-4">Hello {currentUser.ename}!</h1>
          <NavLink to={"/addTransaction"} className="d-flex mb-3">
            <button className="btn btn-primary"> Submit Transaction</button>
          </NavLink>
          <NavLink to={"/viewTransactions"} className="d-flex mb-3">
            <button className="btn btn-primary"> View Transactions</button>
          </NavLink>
        </Container>
      </>
    );
  }
};
