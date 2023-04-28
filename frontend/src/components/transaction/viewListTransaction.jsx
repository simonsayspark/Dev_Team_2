import { TransactionList } from "./transactionList";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from "react-router-dom";

export const ViewListTransaction = ({ setCurrentUser }) => {
  return (
    <>
      <Navbar sticky="top" className="color-nav overflowTab" expand="md" collapseOnSelect>
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
      <TransactionList />
    </>
  );
};
