import { useContext, useEffect, useState } from "react"
import { getEmployeeByCompId } from "../api/employeeApi";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from 'react-bootstrap/Card';
import { UserContext } from "../App";



export const EmployeeList = () => {
    const [employees, setEmployees] = useState(undefined);
    const currentUser = useContext(UserContext);

    useEffect(() => {
        getEmployeeByCompId(currentUser.company_id).then((x) => setEmployees(x));
        console.log(currentUser.company_id);
    }, [])

    return (
        <>
            <Container>
                {employees.length === 0 && (
                    "No Employees"
                )}
                {employees.length !== 0 && (
                    <ListGroup>
                        {employees.map((employee, index) => {
                            return (
                                <ListGroupItem>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{employee.ename}</Card.Title>
                                            <Card.Text>Role: {employee.role}</Card.Text>
                                            <Card.Text>ID: {employee.employee_id}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>

                )}
            </Container>
        </>
    )
}