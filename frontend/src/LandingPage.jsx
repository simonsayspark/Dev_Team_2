import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


export const LandingPage = () => {
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container fluid className="m-0">
          <Navbar.Brand><NavLink to={"/"} className="nav-link">DoughBack</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto ">
              <NavLink href="#home" className="nav-link">
                Home
              </NavLink>
              <NavLink href="#aboutus" className="nav-link">
                About us

              </NavLink>
              <NavLink href="#service" className="nav-link">
                Our Service
              </NavLink>
              <NavLink href="#contact" className="nav-link">Contact</NavLink>
            </Nav>
            <Nav>
              <Navbar.Text>
                <NavLink to={"/login"} className="nav-link">
                  Log in
                </NavLink>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row className="text-center mt-5 ">
          <Col className="display-2">
            Expense reimbursements made simple - for every business lunch and
            beyond.
          </Col>
        </Row>

      </Container>

      <br/>

      <Container>
        <Row className="text-center mt-5 mb-2">
          <Col className ="display-6"> About Us</Col>
        </Row>
        <Row className="text-center mb-5">
          <Col className = "fs-5">
            Welcome to our platform, where employees can easily request reimbursement for any legitimate business expenses, ranging from lunches to other expenses. Our user-friendly platform empowers employees to focus on their work instead of complicated reimbursement procedures, while providing the financial team with a streamlined process to approve or deny requests. With the CEO having the final say, our platform ensures top-level oversight to keep the company's finances in order.
          </Col>
        </Row>
      </Container>

      <Container>



        <Carousel>
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
              src="/tyler-franta-iusJ25iYu1c-unsplash.jpg"
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
      {/* 
        Add more content down here, such as an about section, a mission
        statement, etc.
        Examples of what I think would look good: 
        https://www.etecc.com/
        https://evrone.com/
        https://nomadictribe.com/
        */}

      <Container>
        <Row>

          <Col>


          </Col>
        </Row>


      </Container>



      <Container>
        <Row>
          <Col>
            <p> Contact info</p>
            <p><strong>Name:</strong>DoughBack</p>
            <p><strong>Email:</strong>DoughBack@gmail.com</p>
            <p><strong>Phone:</strong> 123.456.789</p>
            <p><strong>Address:</strong>6425 Boaz Lane Dallas TX 75205</p>

          </Col>
        </Row>
      </Container>

    </>
  );
};
