import {useDispatch} from "react-redux";
import {deconnexion} from "../actions";
import {Container, Nav, Navbar} from 'react-bootstrap';
import React from "react";
import aircolis from "../images/aircolis.png";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const logout = () => {
        sessionStorage.clear();
        dispatch(deconnexion());
    };

    return  <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={aircolis}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /> Aircolis
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">
                        Accueil
                    </Nav.Link>
                    <Nav.Link href="/users">Utilisateurs</Nav.Link>
                    <Nav.Link href="/verification">Vérification</Nav.Link>
                    <Nav.Link onClick={() => logout()}>
                        <strong style={{color: "#f48d8d"}}>Déconnexion</strong>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavigationBar;