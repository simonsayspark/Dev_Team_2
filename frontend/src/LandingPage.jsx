import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

export const LandingPage = () => {
    return <>
        <Navbar fixed='top' bg='light'>
            <Container fluid className='m-0'>
                <Navbar.Brand >Website Name</Navbar.Brand>
                <Navbar.Text>
                    <NavLink to={'/login'} className='nav-link'>
                        Log in
                    </NavLink>
                </Navbar.Text>
            </Container>
        </Navbar>
        
        <Button className='mt-5'>I am a button</Button>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
        <p>Landing Page</p>
    </>
}