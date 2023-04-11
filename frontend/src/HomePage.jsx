import { useContext } from "react";
import { UserContext } from "./App";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export const HomePage = ({ setCurrentUser }) => {
    const currentUser = useContext(UserContext);

    function logout() {
        setCurrentUser(undefined);
    }

    if (currentUser.ceo_id) { //CEO homepage
        return <>
            <Navbar sticky="top" bg="light" expand="lg">
                <Container fluid className="m-0">
                    <Navbar.Brand><NavLink to={"/home"} className="nav-link">DoughBack</NavLink></Navbar.Brand>
                    <Navbar.Text>
                    <NavLink to={"/"} 
                                 className="nav-link"
                                 onClick={() => {
                                    setCurrentUser(undefined);
                                 }}>
                        Log out
                        </NavLink>
                    </Navbar.Text>
                </Container>
            </Navbar>

            Hello {currentUser.cname}!
        </>
    } 
    
    else if (currentUser.employee_id) { //Employee or Financial Manager homepage
        return <>
            <Navbar sticky="top" bg="light" expand="lg">
                <Container fluid className="m-0">
                    <Navbar.Brand><NavLink to={"/home"} className="nav-link">DoughBack</NavLink></Navbar.Brand>
                    <Navbar.Text>
                        <NavLink to={"/"} 
                                 className="nav-link"
                                 onClick={() => {
                                    setCurrentUser(undefined);
                                 }}>

                        Log out
                        </NavLink>
                    </Navbar.Text>
                </Container>
            </Navbar>

            Hello {currentUser.ename}!
            <NavLink to={"/addTransaction"}><button> Submit Transaction</button></NavLink>
        </>
    }
}