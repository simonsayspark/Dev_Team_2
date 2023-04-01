import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addEmployee } from "./api/employeeApi";
import { addCeo } from "./api/ceoApi";
import { getCompanies } from "./api/companiesApi";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
//CEO, Finacial Manager, Employee
const employeeValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  company_id: -1
};
export const SignupPage = () => {
  const [values, setValues] = useState(employeeValues);
  const [roleValue, setRoleValue] = useState("Select-Role");
  const [companyValue, setCompanyValue] = useState("Select-Company");
  const [disableButton, setDisableButton] = useState(true);
  const [companies, setCompanies] = useState(undefined);

  useEffect(() => {
    getCompanies().then(x => setCompanies(x));
  }, []);

  const navigate = useNavigate();

  const handleRoleSelect = (e) => {
    if (disableButton) {
      setDisableButton(false) //FIXME maybe disable button until all fields are filled??
    }
    setRoleValue(e)
    setValues({ ...values, role: e })
  }

  const handleCompanySelect = (e) => {
    setCompanyValue(e)

    let id = ""
    companies.forEach((company) => {
      if (company.company_name == e) {
        id = company.company_id;
      }
    });
    console.log('ID:')
    console.log(id)
    setValues({ ...values, company_id: id })
    console.log(values)
  }

  const createAccount = () => {
    if (roleValue === 'CEO') {
      console.log('Adding CEO');
      const ceoValues = {
        name: values.name,
        email: values.email,
        password: values.password
      }

      addCeo(ceoValues).then(navigate("/"));
    } else { //Employee or Financial Manager
      console.log('Adding Employee/Financial Manager');
      addEmployee(values).then(navigate("/"));
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

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={values.email}
              onChange={(delta) => {
                setValues({ ...values, email: delta.target.value });
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
            onSelect={handleRoleSelect}>

            <Dropdown.Toggle variant="success" id="dropdown-menu">
              {roleValue}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='CEO'>CEO</Dropdown.Item>
              <Dropdown.Item eventKey='Financial Manager'>Financial Manager</Dropdown.Item>
              <Dropdown.Item eventKey='Employee'>Employee</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>

          <Dropdown
            onSelect={handleCompanySelect}>

            <Dropdown.Toggle variant="success" id="dropdown-menu">
              {companyValue}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              { companies !== undefined &&
                companies.map((company) => {
                  return (
                    <Dropdown.Item eventKey={company.company_name}>
                      {company.company_name}
                    </Dropdown.Item>
                  )}
                )
              }
            </Dropdown.Menu>

          </Dropdown>


          <Button
            type="submit"
            disabled={disableButton}
            onClick={() => {
              createAccount();
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
