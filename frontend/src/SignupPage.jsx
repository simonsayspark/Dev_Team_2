import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addEmployee } from "./api/employeeApi";
import { addCeo, getCeoByEmail } from "./api/ceoApi";
import { addCompany } from "./api/companiesApi";
import { getCompanies } from "./api/companiesApi";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from 'react-bootstrap/Navbar';
import Alert from "react-bootstrap/Alert";
import DropdownButton from 'react-bootstrap/DropdownButton';
//CEO, Finacial Manager, Employee
const employeeValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  company_id: 0

};
export const SignupPage = () => {
  const [values, setValues] = useState(employeeValues);
  const [roleValue, setRoleValue] = useState("Select-Role");
  const [companyValue, setCompanyValue] = useState("Select-Company");
  const [disableButton, setDisableButton] = useState(true);
  const [companies, setCompanies] = useState(undefined);
  const [error, setError] = useState("");
  const [ceoCompany, setCeoCompany] = useState("");

  useEffect(() => {
    getCompanies().then((x) => setCompanies(x));
  }, []);

  useEffect(() => {
    if (values.name && values.email
      && values.password && values.role && values.company_id) {
      setDisableButton(false);
    } 
    else if(values.role == "CEO" && values.name && values.email && values.password && ceoCompany){

      setDisableButton(false);

    }

    else {
      setDisableButton(true);
    }
  }, [values, ceoCompany ])


  const navigate = useNavigate();

  const handleRoleSelect = (e) => {
    setRoleValue(e)
    setValues({ ...values, role: e })
  }

  const handleCompanySelect = (e) => {
    setCompanyValue(e);

    let id = "";
    companies.forEach((company) => {
      if (company.company_name == e) {
        id = company.company_id;
      }
    });
    setValues({ ...values, company_id: id })
  }

  const createAccount = () => {
    if (roleValue === "CEO") {
      console.log("Adding CEO");
      const ceoValues = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      console.log('Adding CEO');
      addCeo(ceoValues).then(() => {
        console.log('Getting new CEO');
        getCeoByEmail(values.email).then((ceo) => {
          console.log('The new CEO:');
          console.log(ceo);
          const companyValues = {
            company_name: ceoCompany,
            ceo_id: ceo[0].ceo_id
          }
          console.log('Adding Company');
          addCompany(companyValues).then(navigate('/'));
        })
      }
      );
    } else { //Employee or Financial Manager
      console.log('Adding Employee/Financial Manager');
      addEmployee(values).then((e) => {
        if (!e['message']) {
          navigate("/");
        } else {
          setError(e['message']);
        }
      });
    }
  };

  return (
    <>
      <Navbar sticky="top" className="color-nav" expand="lg">
        <Container fluid className="m-0">
          <Navbar.Brand><NavLink to={"/"} className="nav-link">
            <img width="300px" height="auto" src="/logo_text.png" alt="logo" />  
          </NavLink></Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="pt-5">
        <div className="bg-light p-3 mx-auto p-md-5 pb-md-3 col-xl-6 mb-4">
          {error !== "" &&
            <Alert key={'danger'} variant={'danger'}>
              {error}
            </Alert>
          }

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
                pattern=".{8,}"
                title="Password must be at least 8 characters"
                regex="[]"
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 8 characters.
              </Form.Control.Feedback>

              <Form.Control.Feedback>
                Password must be at least 8 characters.
              </Form.Control.Feedback>

            </Form.Group>

            <Dropdown
              className="mt-2"
              onSelect={handleRoleSelect}>

              <Dropdown.Toggle className="col-12" variant="info" id="dropdown-menu">
                {roleValue}
              </Dropdown.Toggle>
              <Dropdown.Menu className="col-12">
                <Dropdown.Item eventKey='CEO'>CEO</Dropdown.Item>
                <Dropdown.Item eventKey='Financial Manager'>Financial Manager</Dropdown.Item>
                <Dropdown.Item eventKey='Employee'>Employee</Dropdown.Item>
              </Dropdown.Menu>


            </Dropdown>


            
            {values.role && values.role!=="CEO" && 
              <Dropdown
                className="mt-3"
                onSelect={handleCompanySelect}>

                <Dropdown.Toggle className="col-12" variant="info" id="dropdown-menu">
                  {companyValue}
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-12">
                  {companies !== undefined &&
                    companies.map((company) => {
                      return (
                        <Dropdown.Item eventKey={company.company_name}>
                          {company.company_name}
                        </Dropdown.Item>
                      )
                    }
                    )
                  }
                </Dropdown.Menu>

              </Dropdown>
            }


            {values.role =="CEO" && 
             <Form.Group>
              <Form.Label>

              Company Name

              </Form.Label>
              <Form.Control 
                          placeholder="Enter company name"
                          value={ceoCompany}
                          onChange={(delta) => {
                            setCeoCompany(delta.target.value );
                          }}> 
                          
              </Form.Control>
             </Form.Group>
            }
            <Button
              className="col-12 mt-3"
              disabled={disableButton}
              onClick={() => {
                createAccount();
              }}
            >
              Sign up
            </Button>

            <Container fluid>
              <Row className="text-center mt-4">
                <Col>
                  <span className="text-muted">
                    Already have an account?
                  </span>
                  <NavLink to={"/login"} className="nav-link">
                    Sign in
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
