import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./index.css";

export const Batcave = ({ setCurrentUser }) => {
  const currentUser = useContext(UserContext);

  function logout() {
    setCurrentUser(undefined);
  }


  if (currentUser.ceo_id) {
    //CEO homepage
    return (
      <>
        <Navbar sticky="top" className="batman-nav" expand="lg">
          <Container fluid className="m-0">
            <Navbar.Brand>
              <NavLink to={"/home"} className="nav-link">
                <img width="200px" height="auto" src="/batman-5-logo-png-transparent.png" alt="logo" />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Text>
              Welcome back Batman
            </Navbar.Text>
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
          <h1 className="display-4">Welcome Batman</h1>
          <NavLink to={"/addCriminal"} className="d-flex mb-3">
            <button className="btn btn-primary"> Active Villians</button>
          </NavLink>
          <NavLink to={"/viewActiveCrimes"} className="d-flex mb-3">
            <button className="btn btn-primary"> Crimes in Progress</button>
          </NavLink>
          <NavLink to={"/viewMostWantedList"} className="d-flex mb-3">
            <button className="btn btn-primary"> Most Wanted List</button>
          </NavLink>
        </Container>
      </>
    );
  }
};
