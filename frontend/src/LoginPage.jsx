import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import { getEmployeeByEmail } from "./api/employeeApi";

import bcrypt from 'bcryptjs'

const formValues = {
  email: "",
  password: "",
};
export const LoginPage = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState(formValues);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const login = () => {
    if (values.email && values.password) { //makes sure email and password have values
      getEmployeeByEmail(values.email).then(x => {
        console.log('GOT EMPLOYEE:');
        console.log(x);

        if (bcrypt.compareSync(values.password, x[0].epassword)) {
          console.log('CORRECT');
          setCurrentUser(x[0]);
          navigate('/home');
          console.log('done')
        } else {
          console.log('INCORRECT')
        }
      })
    }
  }

  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container fluid className="m-0">
          <Navbar.Brand><NavLink to={"/"} className="nav-link">DoughBack</NavLink></Navbar.Brand>
        </Container>
      </Navbar>

      <div className="wrapper d-flex justify-content-center align-items-center">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email"
                          placeholder="Enter email"
                          value={values.email}
                          onChange={(delta) => {
                            setValues({ ...values, email: delta.target.value });
                          }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" 
                          placeholder="Enter password"
                          value={values.password}
                          onChange={(delta) => {
                            setValues({ ...values, password: delta.target.value });
                          }} 
            />
          </Form.Group>

          <Button variant="primary" 
                  onClick={() => {
                    login();
                  }}>
            Submit
          </Button>

          <NavLink to={"/"} className="nav-link">
            Back to Home
          </NavLink>

          <Container fluid>
            <Row className="text-center mt-5">
              <Col>
                Don't have an account?{" "}
                <NavLink to={"/signup"} className="nav-link">
                  Sign up
                </NavLink>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  );
};
