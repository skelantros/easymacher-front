import { Container } from 'react-bootstrap';
import './Layout.module.css'

const Layout = ({header, body}) => {
    return(
        <Container>
            {header}
            {body}
        </Container>
    )
}

export default Layout;

