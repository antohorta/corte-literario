import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <Container className='footer-container' style={{ paddingTop: '5.19rem' }}>
                <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col lg={4}>
                        <p className='footer-link-title'>Preguntas frecuentes</p>
                        <Link to={'/contacto'} className='footer-link'>Contacto</Link>
                        <Link to={'/cambios'} className='footer-link'>Cambios y devoluciones</Link>
                        <Link to={'/politicas'} className='footer-link'>Políticas de despacho</Link>
                        <Link to={'/nosotros'} className='footer-link'>Sobre nosotros</Link>
                    </Col>

                    <Col lg={4}>
                        <p className='footer-link-title'>Redes sociales</p>
                        <a href="https://www.facebook.com/" className='footer-link'>Facebook</a>
                        <a href="https://www.instagram.com/" className='footer-link'>Instagram</a>
                        <a href="https://x.com/" className='footer-link'>Twitter</a>
                    </Col>

                    <Col lg={4}>
                        <p className='footer-link-title'>Únete a nuestra comunidad</p>
                        <Form className='footer-input-container'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu mail" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Suscríbete
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container >
            <p className='footer-title'>CORTE LITERARIO</p>
        </>
    )
}

export default Footer;