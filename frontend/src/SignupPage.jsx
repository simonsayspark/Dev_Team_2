import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { addEmployee, getEmployeeByEmail } from "./api/employeeApi";
import { addCeo, deleteCeoById, getCeoByEmail } from "./api/ceoApi";
import { addCompany } from "./api/companiesApi";
import { getCompanies } from "./api/companiesApi";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import DropdownButton from "react-bootstrap/DropdownButton";
//CEO, Finacial Manager, Employee
const employeeValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  company_id: 0,
};
export const SignupPage = ({ setCurrentUser }) => {
  const [values, setValues] = useState(employeeValues);
  const [roleValue, setRoleValue] = useState("Select-Role");
  const [companyValue, setCompanyValue] = useState("Select-Company");
  const [disableButton, setDisableButton] = useState(true);
  const [companies, setCompanies] = useState(undefined);
  const [error, setError] = useState("");
  const [ceoCompany, setCeoCompany] = useState("");

  const [passwordValid, setpasswordValid] = useState(false);
  const [checkLength, setcheckLength] = useState(false);
  const [checkCapital, setcheckCaptial] = useState(false);
  const [checkSymbol, setcheckSymbol] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkDigit, setcheckDigit] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    getCompanies().then((x) => setCompanies(x));
  }, []);

  useEffect(() => {
    let valid = true;

    if (values.password.length >= 8) {
      setcheckLength(true);
    } else {
      setcheckLength(false);
      valid = false;
    }

    if (/[A-Z]/.test(values.password)) {
      setcheckCaptial(true);
    } else {
      setcheckCaptial(false);
      valid = false;
    }

    if (/[a-z]/.test(values.password)) {
      setCheckLowerCase(true);
    } else {
      setCheckLowerCase(false);
      valid = false;
    }

    if (/[0-9]/.test(values.password)) {
      setcheckDigit(true);
    } else {
      setcheckDigit(false);
      valid = false;
    }

    if (/[!@#$%^&]/.test(values.password)) {
      setcheckSymbol(true);
    } else {
      setcheckSymbol(false);
      valid = false;
    }

    if (values.password == values.confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
      valid = false;
    }

    if (valid) {
      setpasswordValid(true);
    } else {
      setpasswordValid(false);
    }

    if (
      values.name &&
      values.email &&
      values.password &&
      values.role &&
      values.company_id &&
      values.password == values.confirmPassword &&
      valid
    ) {
      setDisableButton(false);
    } else if (
      values.role == "CEO" &&
      values.name &&
      values.email &&
      values.password &&
      ceoCompany &&
      values.confirmPassword &&
      values.password == values.confirmPassword &&
      valid
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [values, ceoCompany]);

  const navigate = useNavigate();

  const handleRoleSelect = (e) => {
    setRoleValue(e);
    setValues({ ...values, role: e });
  };

  const handleCompanySelect = (e) => {
    setCompanyValue(e);

    let id = "";
    companies.forEach((company) => {
      if (company.company_name == e) {
        id = company.company_id;
      }
    });
    setValues({ ...values, company_id: id });
  };

  const createAccount = () => {
    let shouldContinue = true;

    if (!validEmail(values.email)) {
      setError('Invalid email address. Please enter a valid email address.');
      return;
    }

    getEmployeeByEmail(values.email).then((x) => {
      getCeoByEmail(values.email).then((y) => {
        if (x.length !== 0 || y.length !== 0) {
          setError('Email already in use. Please use another email or log in to your existing account.');
          shouldContinue = false;
        }

        if (roleValue === "CEO" && shouldContinue) {
          const ceoValues = {
            name: values.name,
            email: values.email,
            password: values.password,
          };

          addCeo(ceoValues).then((e) => {
            if (!e["message"]) {
              getCeoByEmail(values.email).then((ceo) => {
                const companyValues = {
                  company_name: ceoCompany,
                  ceo_id: ceo[0].ceo_id,
                };
                addCompany(companyValues).then((creationError) => {
                  if (!creationError["message"]) {
                    setCurrentUser(ceo[0]);
                    navigate("/home");
                  } else {
                    deleteCeoById(ceo[0].ceo_id).then(setError(creationError["message"]));
                  }
                });
              });
            } else {
              setError(e["message"]);
            }
          });
        } else if (shouldContinue) {
          //Employee or Financial Manager
          const databaseValues = {
            name: values.name,
            email: values.email,
            password: values.password,
            role: values.role,
            company_id: values.company_id,
          };
          addEmployee(databaseValues).then((e) => {
            if (!e["message"]) {
              getEmployeeByEmail(values.email).then((x) => {
                setCurrentUser(x[0]); //logs user into newly created account
                navigate("/home"); //navigates to home page
              })
            } else {
              setError(e["message"]);
            }
          });
        }
      })
    })
  };

  //the following function was inspired by code found at https://mailtrap.io/blog/validate-emails-in-react/
  const validEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  return (
    <>
      <Navbar sticky="top" className="color-nav" expand="lg">
        <Container fluid className="m-0">
          <Navbar.Brand>
            <NavLink to={"/"} className="nav-link">
              <img
                width="300px"
                height="auto"
                src="/logo_text.png"
                alt="logo"
              />
            </NavLink>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="pt-4 mx-0 px-0">
        <div className="bg-light rounded p-3 mx-auto p-md-5 pb-md-3 col-lg-6 col-sm-8">
          {error !== "" && (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          )}

          <Form>
            <Form.Group className="" controlId="name">
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

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                value={values.confirmPassword}
                onChange={(delta) =>
                  setValues({ ...values, confirmPassword: delta.target.value })
                }
              />

              {values.password && !passwordValid && (
                <Container className=" text-muted">
                  <Row className="text-center">
                    <span className="text-center">
                      Password Requirements:
                    </span>
                    {checkLength === true ? (
                      <span className="text-center text-success">
                        &#x2713; At least 8 characters
                      </span>
                    ) : (
                      <span className="text-center text-danger">
                        &#x2715; At least 8 characters
                      </span>
                    )}
                  </Row>
                  <Row>
                    {checkCapital === true ? (
                      <span className="text-center text-success">
                        &#x2713; Have a uppercase letter
                      </span>
                    ) : (
                      <span className="text-center text-danger">
                        &#x2715; Have a uppercase letter
                      </span>
                    )}
                  </Row>
                  <Row>
                    {checkLowerCase === true ? (
                      <span className="text-center text-success">
                        &#x2713; Have a lower letter
                      </span>
                    ) : (
                      <span className="text-center text-danger">
                        &#x2715; Have a lower letter
                      </span>
                    )}
                  </Row>
                  <Row>
                    {checkSymbol === true ? (
                      <span className="text-center text-success">
                        &#x2713; Have a symbol
                      </span>
                    ) : (
                      <span className="text-center text-danger">
                        &#x2715; Have a symbol
                      </span>
                    )}
                  </Row>
                  <Row>
                    {checkDigit === true ? (
                      <span className="text-center text-success">
                        &#x2713; Have a digit
                      </span>
                    ) : (
                      <span className="text-center text-danger">
                        &#x2715; Have a digit
                      </span>
                    )}
                  </Row>
                  <Row>
                    <Row>
                      {passwordsMatch ? (
                        <span className="text-center text-success">
                          &#x2713; Passwords must match
                        </span>
                      ) : (
                        <span className="text-center text-danger">
                          &#x2715; Passwords must match
                        </span>
                      )}
                    </Row>
                  </Row>
                </Container>
              )}
            </Form.Group>

            <Dropdown className="mt-4 dropdown1" onSelect={handleRoleSelect}>
              <Dropdown.Toggle
                className="col-12 dropdown-bg text-white"
                variant="info"
                id="dropdown-menu"
              >
                {roleValue}
              </Dropdown.Toggle>
              <Dropdown.Menu className="col-12 ">
                <Dropdown.Item className="dropBg" eventKey="CEO">CEO</Dropdown.Item>
                <Dropdown.Item eventKey="Financial Manager">
                  Financial Manager
                </Dropdown.Item>
                <Dropdown.Item eventKey="Employee">Employee</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {values.role && values.role !== "CEO" && (
              <Dropdown className="mt-3 dropdown2" onSelect={handleCompanySelect}>
                <Dropdown.Toggle
                  className="col-12 dropdown-bg-1 text-white"
                  variant="info"
                  id="dropdown-menu"
                >
                  {companyValue}
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-12">
                  {companies !== undefined &&
                    companies.map((company) => {
                      return (
                        <Dropdown.Item eventKey={company.company_name}>
                          {company.company_name}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            )}

            {values.role == "CEO" && (
              <Form.Group>
                <Form.Label className="pt-2">Company Name</Form.Label>
                <Form.Control
                  placeholder="Enter company name"
                  value={ceoCompany}
                  onChange={(delta) => {
                    setCeoCompany(delta.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            )}
            <Button
              className="col-12 mt-3 submitButton"
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
                  <p className="text-muted mb-0">Already have an account?</p>
                  <NavLink to={"/login"} className="sign-up text-decoration-none">
                    Sign in
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
    </>
  );
};
