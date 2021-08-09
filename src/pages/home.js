import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deconnexion} from "../actions";
import {Container, Nav, Navbar} from 'react-bootstrap';
import React from "react";

const Home = () => {
    const dispatch = useDispatch();
    const logout = () => {
        sessionStorage.clear();
        dispatch(deconnexion());
    };

    return <div>
        <div>
            <div className="App">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Aircolis</Navbar.Brand>
                    </Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/about">About</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/users">Users</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <button onClick={() => logout()}>Déconnexion</button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    </div>
};

export default Home;