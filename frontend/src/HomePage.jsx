import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
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
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink to={"/home"} className="nav-link">
              <img width="300px" height="auto" src="/logo_text.png" alt="logo" />
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
  } else if (currentUser.role === "Financial Manager") { //Financial Manager homepage
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
    </Navbar>;

    <Container className="mt-3">
      <h1 className="display-4">Hello {currentUser.ename}!</h1>
      <NavLink to={"/addTransaction"} className="d-flex mb-3">
        <button className="btn btn-primary"> View Claims</button>
      </NavLink>
    </Container>;
  } else if (currentUser.role === "Employee") { //Employee Homepage
    return (
      <>
        <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
          <Container fluid className="m-0">
            <Navbar.Brand className="theBrand">
              <NavLink to={"/home"} className="nav-link">
                <Image src="/logo_text.png" className="nav-image" alt="logo"></Image>
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
        
          <div className="container">
                <div className="row bg-light mb-2 w-100 ">
                    <nav aria-label="breadcrumb" className="p-3 rounded">
                        <div className="breadcrumb mb-0 ">

                            <header className="breadcrumb-item text-muted fs-5">{currentUser.ename}'s Dashboard</header>
                        </div>
                    </nav>
                </div>
                </div>
          
            <button className="btn btn-primary" onClick={()=>handleClick()}>Submit Transaction</button>
         
       
            <button className="btn btn-primary" onClick={()=>handleClick2()}>View Transactions</button>
       
        </Container>
      </>
    );
  }
};
