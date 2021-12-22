import { Container } from "react-bootstrap";
import LoginButton from "../components/auth0/LoginButton";
import LogoutButton from "../components/auth0/LogoutButton";

const Auth0LoginPage = () => {
    return(
        <Container className="p-3 mb-2 bg-light text-dark">
            <LoginButton/>
        </Container>
    )
}

export default Auth0LoginPage;