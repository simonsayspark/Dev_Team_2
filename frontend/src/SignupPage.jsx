import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';

export const SignupPage = () => {
    return <>
        <Form>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name'/>
            </Form.Group>
            
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password'/>
            </Form.Group>

            <Button>
                Sign up
            </Button>

            <Container fluid>
                <Row className='text-center mt-5'>
                    <Col>Already have an account? <NavLink to={'/login'} className='nav-link'>Sign in</NavLink></Col>
                </Row>
            </Container>
        </Form>
    </>
}