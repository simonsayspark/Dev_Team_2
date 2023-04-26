import { useContext, useEffect, useState } from "react"
import { getEmployeeByCompId, removeEmployee } from "../api/employeeApi";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from 'react-bootstrap/Card';
import { UserContext } from "../App";
import { getCompanies } from "../api/companiesApi";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";



export const EmployeeList = ({ setCurrentUser }) => {
    const [employees, setEmployees] = useState();
    const currentUser = useContext(UserContext);
    const [ceoCompany, setCeoCompany] = useState(0);


    useEffect(() => {
        getCompanies().then((allCompanies) => {
            allCompanies.forEach((aCompany, index) => {
                if (aCompany.ceo_id === currentUser.ceo_id) {
                    setCeoCompany(aCompany.company_id);
                    getEmployeeByCompId(aCompany.company_id).then((x) => setEmployees(x));
                }

            })
        })
    }, [])

    const remove = (employee_id) => {
        removeEmployee(employee_id).then((x) => {
            console.log(x);
        })
    }

    if (!employees) {
        return (
            <>
                <p>Loading...</p>
            </>
        )
    }
    

    console.log(employees);
    return (
        <>
            <Navbar sticky="top" className="color-nav" expand="md" collapseOnSelect>
                <Container fluid className="m-0">
                    <Navbar.Brand className="theBrand">
                        <NavLink to={"/home"} className="nav-link">
                            <img
                                width="300px"
                                height="auto"
                                src="/logo_text.png"
                                alt="logo"
                            />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <NavbarCollapse>
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <NavLink
                                to={"/"}
                                className="fs-4 nav-link text-light mx-5"
                                onClick={() => {
                                    setCurrentUser(undefined);
                                }}
                            >
                                Log out
                            </NavLink>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <Container className="mt-3">
                {employees.length === 0 && (
                    "No Employees"
                )}
                {employees.length !== 0 && (
                    <Row>
                        {employees.map((employee, index) => {
                            return (
                                <Col className="col-4 d-inline-block">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Title>{employee.ename}</Card.Title>
                                            <Card.Text>Role: {employee.role}</Card.Text>
                                            <Card.Text>ID: {employee.employee_id}</Card.Text>
                                            <Button className="btn btn-warning" onClick={() => remove(employee.employee_id)}>Remove Employee from Company</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                )}
            </Container>
        </>
    )
}