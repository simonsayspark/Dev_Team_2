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
    // console.log('Window:')
    // console.log(window)
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

    console.log(position);
    console.log(homeRef.current.offsetTop);
    console.log(aboutUsRef.current.offsetTop);
    console.log(howItWorksRef1.current.offsetTop);
    console.log(contactUsRef.current.offsetTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div id="home"></div>
      <Navbar sticky="top" className="color-nav" expand="lg" collapseOnSelect>
        <Container fluid className="m-0">
          <Navbar.Brand className="d-flex mr-auto">
            <img width="300px" height="auto" src="/logo_text.png" alt="logo" />
          </Navbar.Brand>

          <NavbarToggle />
          <NavbarCollapse>
            <Nav className="me-auto">
              <Nav.Link href="#home" className="text-light fs-4 mx-5 text-nowrap">
                Home
              </Nav.Link>
              <Nav.Link href="#aboutUs" className="text-light fs-4 mx-5  text-nowrap">
                About us
              </Nav.Link>

              <Nav.Link href="#service" className="text-light fs-4 mx-5  text-nowrap">
                How it Works
              </Nav.Link>
              <Nav.Link href="#contact" className="text-light fs-4 mx-5  text-nowrap">
                Contact
              </Nav.Link>
            </Nav>
              <div className="">
                <Link to={"/login"} className="nav-link text-light fs-4 mx-5">
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
        <Row className="text-center addPadding px-2">
          <Col className="display-2 text-white">
            Expense reimbursements made simple - for every business lunch and
            beyond.
          </Col>
        </Row>
      </Container>

      <div id="aboutUs"></div>
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
      <div id="service"></div>
      <Container fluid>
        <Row
          ref={howItWorksRef1}
          className={`text-center mt-5 mb-4 ${
            worksLoaded1 ? "unhideIt" : "hideIt"
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
            <br />
            <p className="fs-4 p-3">
              {" "}
              The employee is any member of a company who has gone on a business
              lunch and wishes to request reimbursement for their expenses. They
              can submit claims through the website, which will then be reviewed
              by the financial manager.
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
            <br />
            <p className="fs-4 p-3">
              {" "}
              The financial manager is responsible for overseeing the financial
              team, which includes treasurers and other financial professionals.
              They are in charge of approving or denying reimbursement requests
              for business lunches made by employees on the website.
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
            <Image src="/boss.png" className="img-fluid mx-auto"></Image>
          </Col>
          <Col className="p-0 my-auto text-center ">
            <div className="display-6">CEO</div>
            <br />
            <p className="fs-4 p-3">
              The CEO is the highest-ranking executive in a company and has
              ultimate authority over all business decisions, including the
              reimbursement process for business lunches. They have the final
              say in any disputes or issues that arise from the reimbursement
              process.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>


<p className="display-4 text-center mt-4">Our Partners</p>
<Carousel className = "mt-4">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/Ceo-img.png"
      alt="Shrek slide"
    />
    <Carousel.Caption>
      <h3>CEO</h3>
      <p>Create and manage your company with ease.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/walmort.png"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Financial Manager</h3>
      <p>Approve and deny transactions.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/expense-reimbursements.png"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Employee</h3>
      <p>
        Submit transaction forms.
      </p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

</Container>

      <div id="contact"></div>
      <Container
        ref={contactUsRef}
        className={`mt-5 p-5 ${aboutLoaded ? "unhideIt" : "hideIt"}`}
      >
        <Row className="bg-light">
          <Col className="display-5 text-center mb-3">Contact Us</Col>

          <div className="ms-3">
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
          </div>
        </Row>
      </Container>
    </>
  );
};
