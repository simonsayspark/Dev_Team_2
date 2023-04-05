import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { getEmployeeByEmail } from "./api/employeeApi";

import bcrypt from 'bcryptjs'

const formValues = {
  email: "",
  password: "",
};
export const LoginPage = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState(formValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (values.email && values.password) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [values])  

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
        if (x.length === 0) { //if no account exists with given email
          setError("Incorrect email or password. Please enter a valid email and password and try again.");
        }
        else if (bcrypt.compareSync(values.password, x[0].epassword)) {
          setCurrentUser(x[0]);
          navigate('/home');
        } else { //if account with given email exists, but password is incorrect
          setError("Incorrect email or password. Please enter a valid email and password and try again.");
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

      <Container className="pt-5">
        <div className="bg-light p-3 mx-auto p-md-5 pb-md-3 col-xl-6 mb-4">
          {error !== "" && 
            <Alert key={'danger'} variant={'danger'}>
              {error}
            </Alert>
          }

          <Form noValidate validated={validated} onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={(delta) => {
                              setValues({ ...values, email: delta.target.value });
                              // if (values.email && values.password) {
                              //   setDisableButton(false);
                              // } else {
                              //   setDisableButton(true);
                              // }
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

            <Button className="col-12 mt-2"
                    variant="primary"
                    disabled={disableButton} 
                    onClick={() => {
                      login();
                    }}>
              Submit
            </Button>

            <Container fluid>
              <Row className="text-center mt-4">
                <Col>
                  Don't have an account?
                  <NavLink to={"/signup"} className="nav-link">
                    Sign up
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </Container>
    </>
  );
};
