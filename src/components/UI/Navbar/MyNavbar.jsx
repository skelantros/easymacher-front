import { useAuth0 } from "@auth0/auth0-react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({links}) => {
    const { logout } = useAuth0()
    return(
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#">Easymacher</Navbar.Brand>
            <Nav className="me-auto">
                { links.map(l => <Nav.Link as={Link} key = {l.id} to={l.link}>{l.name}</Nav.Link>)}
            </Nav>
            <Nav className="justify-content-end">
                <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Выйти</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default MyNavbar;