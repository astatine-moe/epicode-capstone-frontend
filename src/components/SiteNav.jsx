import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../sentinel.png";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import "../css/components/SiteNav.scss";

const SiteNav = (props) => {
    const activeUser = useSelector((state) => state.activeUser);

    return (
        <Navbar expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={logo}
                        height="30"
                        className="d-inline-block align-top"
                        alt="Sentinel Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Put nav items on the right side */}
                    <Nav className="me-auto"></Nav>
                    <Nav className="ml-auto">
                        <LinkContainer to="/">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">
                                    Home
                                </a>
                            </li>
                        </LinkContainer>
                        <LinkContainer to="/products">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">
                                    Products
                                </a>
                            </li>
                        </LinkContainer>

                        <LinkContainer to="/pricing">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">
                                    Pricing
                                </a>
                            </li>
                        </LinkContainer>

                        <LinkContainer to="/forum">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">
                                    Forum
                                </a>
                            </li>
                        </LinkContainer>

                        <LinkContainer to="/guides">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">
                                    Guides
                                </a>
                            </li>
                        </LinkContainer>
                        {!props.pseudoUser && (
                            <LinkContainer to="/login">
                                <li className="nav-item">
                                    <a className="nav-link" href="#home">
                                        Login
                                    </a>
                                </li>
                            </LinkContainer>
                        )}
                        {props.pseudoUser && !activeUser?._id && (
                            //fake dropdown menu
                            <NavDropdown
                                title="Account"
                                className="pseudoDropdown"
                                id="basic-nav-dropdown"
                            ></NavDropdown>
                        )}
                        {activeUser?._id && (
                            <NavDropdown
                                title="Account"
                                id="basic-nav-dropdown"
                            >
                                <LinkContainer to="/user/settings">
                                    <NavDropdown.Item href="#action/3.1">
                                        Settings
                                    </NavDropdown.Item>
                                </LinkContainer>
                                {/* divider */}
                                <NavDropdown.Divider />
                                {activeUser?.role === "admin" && (
                                    <>
                                        <LinkContainer to="/admin">
                                            <NavDropdown.Item href="#action/3.2">
                                                Admin
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Divider />
                                    </>
                                )}
                                <NavDropdown.Item onClick={props.logout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default SiteNav;
