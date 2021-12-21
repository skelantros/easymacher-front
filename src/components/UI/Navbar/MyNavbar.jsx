import { useAuth0 } from "@auth0/auth0-react";
import { Col, Container, Row, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "../../auth0/LogoutButton";

const MyNavbar = ({links}) => {
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#">Easymacher</Navbar.Brand>
            <Nav className="me-auto">
                { links.map(l => <Nav.Link as={Link} key = {l.id} to={l.link}>{l.name}</Nav.Link>)}
            </Nav>
        </Container>
        </Navbar>
    )
}

export default MyNavbar;