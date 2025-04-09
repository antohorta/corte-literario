import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import boyAndGirlLibrary from '../assets/images/boy-and-girl-in-library.webp'
import '../styles/header.css'

const Header = () => {
    return (
        <Container fluid className='header-container'>
            <Row style={{ margin: '0px', padding: '0px' }}>
                <Col lg={12} sm={12} style={{ padding: '0px' }}>
                    <h1 className='home-title'>CORTE LITERARIO</h1>
                    <img src={boyAndGirlLibrary} alt="" />
                </Col>
            </Row>
        </Container>
    )

}

export default Header;