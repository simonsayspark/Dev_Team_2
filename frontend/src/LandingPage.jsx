import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';

export const LandingPage = () => {
    return <>
        <Navbar sticky='top' bg='light'>
            <Container fluid className='m-0'>
                <Navbar.Brand >Website Name</Navbar.Brand>
                <Navbar.Text>
                    <NavLink to={'/login'} className='nav-link'>
                        Log in
                    </NavLink>
                </Navbar.Text>
            </Container>
        </Navbar>
        <Container fluid>
            <Row className='text-center mt-5'>
                <Col className='display-2'>Expense reimbursements made simple - for every business lunch and beyond.</Col>
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
    </>
}