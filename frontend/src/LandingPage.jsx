import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import React, { useState, useEffect, useRef } from "react";
import "./index.css";
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

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
    if ((position + (window.innerHeight * 0.1)) >= contactUsRef.current.offsetTop) {
      setContactLoaded(true);
    }

  };

  const scrollTo = (location) => {
    if (location == 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (location == 2) {
      window.scrollTo({ top: (aboutUsRef.current.offsetTop - homeRef.current.offsetTop), behavior: "smooth" });
    } else if (location == 3) {
      window.scrollTo({ top: (howItWorksRef2.current.offsetTop - homeRef.current.offsetTop), behavior: "smooth" });
    } else if (location == 4) {
      window.scrollTo({ top: (contactUsRef.current.offsetTop - homeRef.current.offsetTop), behavior: "smooth" });
    }
  }

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setHomeLoaded(true); //automatically loads the home section when the page loads

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleResize);
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
          <Navbar.Toggle />
          <NavbarCollapse className="fs-4">
            <hr />
            <Nav className="me-auto nav-font">
              <Nav.Link eventKey="1" onClick={() => { scrollTo(1) }} className="text-light mx-5 text-nowrap">
                Home
              </Nav.Link>
              <Nav.Link eventKey="2" onClick={() => { scrollTo(2) }} className="text-light mx-5 text-nowrap">
                About Us
              </Nav.Link>

              <Nav.Link eventKey="3" onClick={() => { scrollTo(3) }} className="text-light mx-5  text-nowrap">
                How it Works
              </Nav.Link>
              <Nav.Link eventKey="4" onClick={() => { scrollTo(4) }} className="text-light mx-5  text-nowrap">
                Contact
              </Nav.Link>
            </Nav>
            <Link to={"/login"} className={`${viewportWidth >= 1400 ? 'me-4' : 'mx-5'} nav-font nav-link text-light`}>
              Log in
            </Link>
          </NavbarCollapse>
        </Container>
      </Navbar>

      <Container
        fluid
        ref={homeRef}
        className={`${homeLoaded ? "unhideIt" : "hideIt"} main-bg`}
      >
        <Row className="text-left addPadding px-auto mx-auto">
          <Row className="display-1 text-white ms-1" id="header">
            Expense reimbursements<br/>made simple
          </Row>
          <Row className="display-6 text-white px-3 ms-1" id="small-header">
            for every business lunch and beyond
          </Row>
        </Row>
      </Container>

      <br />

      <Container
        ref={aboutUsRef}
        className={`${aboutLoaded ? "unhideIt" : "hideIt"} addPadding1 px-3`}
      >
        <Row className="text-left mt-5 mb-3 ">
          <Col className="display-4" id="header"> About Us</Col>
        </Row>
        <Row className="text-left pt-3 mb-5">
          <Col className="fs-2" id="small-header">
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

      <Container fluid className="main-bg">
        <Row
          ref={howItWorksRef2}
          className={` main-bg ${worksLoaded2 ? "unhideIt" : "hideIt"}`}
        >
          <Col className="p-0" xs={12} sm={12} md={12} lg xl xxl>
            <Image
              src="/tyler-franta-iusJ25iYu1c-unsplash.jpg"
              className="img-fluid mx-auto"
            ></Image>
          </Col>
          <Col className="p-0 my-auto text-center">
            <div className="mt-4 display-6 text-white" id="header">Employee</div>
            <p className="fs-3 p-3 text-white" id="small-header">
              {" "}
              As an employee, you can submit requests for reimbursement,
              which will then be reviewed by a financial manager or the CEO.
            </p>
          </Col>
        </Row>
        <Row
          ref={howItWorksRef3}
          className={`main-bg ${worksLoaded3 ? "unhideIt" : "hideIt"}`}
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
            <div className="mt-4 display-6 text-white" id="header" >Financial Manager</div>
            <p className="fs-3 p-3 text-white" id="small-header">
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
          className={`main-bg ${worksLoaded4 ? "unhideIt" : "hideIt"}`}
        >
          <Col className="p-0 " xs={12} sm={12} md={12} lg xl xxl>
            <Image src="/boss.jpg" className="img-fluid mx-auto"></Image>
          </Col>

          <Col className="p-0 my-auto text-center">
            <div className="">
              <div className="mt-4 display-6 text-white" id="header">CEO</div>
              <p className="fs-3 p-3 text-white" id="small-header">
                As a CEO, you can add your company and approve or deny
                reimbursement requests. You can also remove
                employees from the company.
              </p>
            </div>
          </Col>

        </Row>
      </Container>

      <Container
        fluid
        ref={contactUsRef}
        className={`${contactLoaded ? "unhideIt" : "hideIt"} m-0 p-0`}
      >
        <Row className="contact_us m-0">
          <div className="display-6 text-center mt-3 mb-3 pt-3 text-light" id="header">Contact Us</div>

          <Col xs={12} sm={12} md={12} lg={12} xl xxl id="small-header" className="fs-4 text-light">
              <p className="text-center">
                <strong id="header">Email:</strong> DoughBack@gmail.com
              </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl xxl id="small-header" className="fs-4 text-light">
              <p className="text-center">
                <strong id="header">Address:</strong>  6425 Boaz Lane Dallas TX 75205
              </p>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl xxl id="small-header">
              <p className="text-center">
                <strong className="fs-4 text-light" id="header">Number:</strong>
                <span className="fs-4 text-light"> 123-456-7890</span>
              </p>
          </Col>        
        </Row>
      </Container >
    </>
  );
};
