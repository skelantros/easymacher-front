import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Auth0LoginPage from "../../pages/Auth0LoginPage";
import LoginButton from "../auth0/LoginButton";


const UnauthLayout = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        // <Container fluid style={{height: "100vh"}} className="p-3 mb-2 bg-dark text-dark">
        //     <Row style={{height: "33.3%"}}/>
        //     <Row style={{height: "33.4%"}}>
        //         <Col style={{width: "33.3%"}}/>
        //         <Col style={{width: "33.4%"}}>
        //             <Button style={{width: "100%"}} onClick={() => loginWithRedirect()}>Login to Auth0</Button>
        //         </Col>
        //         <Col style={{width: "33.3%"}} />
        //     </Row>
        //     <Row style={{height: "33.3%"}} />
        // </Container>
        <Container fluid style={{height: "100vh"}} className="bg-dark d-flex align-items-center justify-content-center">
            <Button  size="lg" onClick={() => loginWithRedirect()}>Login to Auth0</Button>
        </Container>
    )
}

export default UnauthLayout;