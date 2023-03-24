import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addEmployee } from "./api/employeeApi";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
//CEO, Finacial Manager, Employee
const employeeValues = {
  name: "",
  password: "",
  role: "Employee", //FIXME temporary placeholder
  company_id: 1, //FIXME temporary placeholder
};



export const SignupPage = () => {
  const [values, setValues] = useState(employeeValues);
  const [roleValue, setRoleValue] = useState("Select-Role")
  const navigate = useNavigate();

  const handleSelect = (e) => {
    console.log(e);
    setRoleValue(e)
  }

  return (
    <>
      <div className="wrapper d-flex justify-content-center align-items-center">
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={values.name}
              onChange={(delta) => {
                setValues({ ...values, name: delta.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={(delta) =>
                setValues({ ...values, password: delta.target.value })
              }
            />
          </Form.Group>

          <Dropdown
            onSelect={handleSelect}>

            <Dropdown.Toggle variant="success" id="dropdown-menu">
              {roleValue}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='CEO'>CEO</Dropdown.Item>
              <Dropdown.Item eventKey='Financial Manager'>Financial Manager</Dropdown.Item>
              <Dropdown.Item eventKey='Employee'>Employee</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>


          <Button
            type="submit"
            onClick={() => {
              addEmployee(values).then(navigate("/"));
            }}
          >
            Sign up
          </Button>

          <Container fluid>
            <Row className="text-center mt-5">
              <Col>
                Already have an account?{" "}
                <NavLink to={"/login"} className="nav-link">
                  Sign in
                </NavLink>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </>
  );
};
