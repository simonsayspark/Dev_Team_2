import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import AnchorLink from "react-anchor-link-smooth-scroll"; // npm install react-anchor-link-smooth-scroll
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

export const LandingPage = () => {
  const homeRef = useRef(0);
  const aboutUsRef = useRef(0);
  const howItWorksRef1 = useRef(0);
  const howItWorksRef2 = useRef(0);
  const howItWorksRef3 = useRef(0);
  const howItWorksRef4 = useRef(0);
  const contactUsRef = useRef(0);

  const [homeLoaded, setHomeLoaded] = useState(false);
  const [aboutLoaded, setAboutLoaded] = useState(false);
  const [worksLoaded1, setWorksLoaded1] = useState(false);
  const [worksLoaded2, setWorksLoaded2] = useState(false);
  const [worksLoaded3, setWorksLoaded3] = useState(false);
  const [worksLoaded4, setWorksLoaded4] = useState(false);
  const [contactLoaded, setContactLoaded] = useState(false);

  //inspired by code found at: https://stackoverflow.com/questions/53158796/get-scroll-position-with-reactjs
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset + 0.75 * window.innerHeight;
    setScrollPosition(position);

    if (position >= homeRef.current.offsetTop) {
      setHomeLoaded(true);
    }
    if (position >= aboutUsRef.current.offsetTop) {
      setAboutLoaded(true);
    }
    if (position >= howItWorksRef1.current.offsetTop) {
      setWorksLoaded1(true);
    }
    if (position >= howItWorksRef2.current.offsetTop) {
      setWorksLoaded2(true);
    }
    if (position >= howItWorksRef3.current.offsetTop) {
      setWorksLoaded3(true);
    }
    if (position >= howItWorksRef4.current.offsetTop) {
      setWorksLoaded4(true);
    }
    if (position >= contactUsRef.current.offsetTop) {
      setContactLoaded(true);
    }

  };

  const scrollTo = (location) => {
    if (location == 1) {
      window.scrollTo({top: 0, behavior: "smooth"});
    } else if (location == 2) {
      window.scrollTo({top: (aboutUsRef.current.offsetTop  - homeRef.current.offsetTop), behavior: "smooth"});
    } else if (location == 3) {
      window.scrollTo({top: (howItWorksRef1.current.offsetTop - homeRef.current.offsetTop), behavior: "smooth"});
    } else if (location == 4) {
      window.scrollTo({top: (contactUsRef.current.offsetTop  - homeRef.current.offsetTop), behavior: "smooth"});
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setHomeLoaded(true); //automatically loads the home section when the page loads

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar sticky="top" className="color-nav" expand="xxl" collapseOnSelect>
        <Container fluid className="m-0">
            <Navbar.Brand className="theBrand">
              <a href="/">
                <Image src="/logo_text.png" className="nav-image" alt="logo"></Image>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <NavbarCollapse className="fs-4">
              <hr/>
              <Nav className="me-auto nav-font">
                <Nav.Link eventKey="1" onClick={() => {scrollTo(1)}} className="text-light mx-5 text-nowrap">
                    Home
                </Nav.Link>
                <Nav.Link eventKey="2" onClick={() => {scrollTo(2)}} className="text-light mx-5 text-nowrap">
                  About Us
                </Nav.Link>

                <Nav.Link eventKey="3" onClick={() => {scrollTo(3)}} className="text-light mx-5  text-nowrap">
                  How it Works
                </Nav.Link>
                <Nav.Link eventKey="4" onClick={() => {scrollTo(4)}} className="text-light mx-5  text-nowrap">
                  Contact
                </Nav.Link>
              </Nav>
                <div className="nav-font">
                  <Link to={"/login"} className="nav-link text-light mx-5">
                    Log in
                  </Link>
                </div>
            </NavbarCollapse>
        </Container>
      </Navbar>

      <Container
        fluid
        ref={homeRef}
        className={`${homeLoaded ? "unhideIt" : "hideIt"} main-bg`}
      >
        <Row className="text-left addPadding px-5">
          <Row className="display-1 text-white" id="header">
            Expense reimbursements<br></br>made simple
          </Row>
          <Row className="display-4 text-white px-3" id="small-header">
            for every business lunch and beyond
          </Row>
        </Row>
      </Container>

      <br />

      <Container
        ref={aboutUsRef}
        className={`${aboutLoaded ? "unhideIt" : "hideIt"}`}
      >
        <Row className="text-center mt-5 mb-2">
          <Col className="display-4"> About Us</Col>
        </Row>
        <Row className="text-center mb-5">
          <Col className="fs-4">
            Welcome to our platform, where employees can easily request
            reimbursement for any legitimate business expenses, ranging from
            lunches to other expenses. Our user-friendly platform empowers
            employees to focus on their work instead of complicated
            reimbursement procedures, while providing the financial team with a
            streamlined process to approve or deny requests. With the CEO having
            the final say, our platform ensures top-level oversight to keep the
            company's finances in order.
          </Col>
        </Row>
      </Container>

      {/* 
        Add more content down here, such as an about section, a mission
        statement, etc.
        Examples of what I think would look good: 
        https://www.etecc.com/
        https://evrone.com/
        https://nomadictribe.com/
      */}
      <Container fluid>
        <Row
          ref={howItWorksRef1}
          className={`text-center mt-5 mb-4 ${worksLoaded1 ? "unhideIt" : "hideIt"
            }`}
        >
          <Col className="display-4 "> How it Works</Col>
        </Row>

        <br />

        <Row
          ref={howItWorksRef2}
          className={`${worksLoaded2 ? "unhideIt" : "hideIt"}`}
        >
          <Col className="p-0" xs={12} sm={12} md={12} lg xl xxl>
            <Image
              src="/tyler-franta-iusJ25iYu1c-unsplash.jpg"
              className="img-fluid mx-auto"
            ></Image>
          </Col>
          <Col className="p-0 my-auto text-center">
            <div className="display-6">Employee</div>
            <p className="fs-4 p-3">
              {" "}
              As an employee, you can submit claims for reimbursement, 
              which will then be reviewed by a financial manager or the CEO.
            </p>
          </Col>
        </Row>
        <Row
          ref={howItWorksRef3}
          className={`${worksLoaded3 ? "unhideIt" : "hideIt"}`}
        >
          <Col
            className="p-0 my-auto text-center"
            xs={{ order: "last" }}
            sm
            md
            lg={{ order: "first" }}
            xl
            xxl
          >
            <div className="display-6">Financial Manager</div>
            <p className="fs-4 p-3">
              {" "}
              As a financial manager, you can approve or deny 
              reimbursement requests made by employees.
            </p>
          </Col>
          <Col className="p-0" xs={12} sm={12} md={12} lg xl xxl>
            <Image src="/employee.png" className="img-fluid mx-auto"></Image>
          </Col>
        </Row>
        <Row
          ref={howItWorksRef4}
          className={`${worksLoaded4 ? "unhideIt" : "hideIt"}`}
        >
          <Col className="p-0" xs={12} sm={12} md={12} lg xl xxl>
            <Image src="/boss.jpg" className="img-fluid mx-auto"></Image>
          </Col>
          <Col className="p-0 my-auto text-center ">
            <div className="display-6">CEO</div>
            <p className="fs-4 p-3">
              As a CEO, you can add your company and approve or deny
              reimbursement requests. You can also add or remove
              employees from the company.
            </p>
          </Col>
        </Row>
      </Container>

      {/* <Container> Commenting out for now
        <Row>
          <Col>
            <p className="display-4 text-center mt-4">Our Partners</p>
            <Carousel className="mt-4">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/google.png"
                  alt="Shrek slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/walmort.png"
                  alt="Second slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 mb-5 pb-   3 pt-0 "
                  src="/target.png"
                  alt="Third slide"
                />

                <Carousel.Caption>

                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container> */}

      <Container
        fluid
        ref={contactUsRef}
        className={`m-0 p-0 ${aboutLoaded ? "unhideIt" : "hideIt"}`}
      >
        <Row className="bg-light m-0">
          <Col className="display-5 text-center mb-3">Contact Us</Col>
            <p>
              <strong>Name:</strong> DoughBack
            </p>
            <p>
              <strong>Number:</strong> 123-456-789
            </p>
            <p>
              <strong>Email:</strong> DoughBack@gmail.com
            </p>
            <p>
              <strong>Address:</strong> 6425 Boaz Lane Dallas TX 75205
            </p>
        </Row>
      </Container>
    </>
  );
};
