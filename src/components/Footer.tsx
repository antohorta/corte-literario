import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/footer.css'

const Footer = () => {
    return (
        <>
            <Container className='footer-container'style={{borderTop: '2px solid #D9D9D9', paddingTop:'5.19rem'}}>
                <Row>
                    <Col lg={3}>
                        <a href="" className='footer-link-title'>Preguntas frecuentes</a>
                        <a href="" className='footer-link'>Contacto</a>
                        <a href="" className='footer-link'>Cambios y devoluciones</a>
                        <a href="" className='footer-link'>Políticas de despacho</a>
                    </Col>

                    <Col lg={3}>
                        <a href="" className='footer-link-title'>Preguntas frecuentes</a>
                        <a href="" className='footer-link'>Contacto</a>
                        <a href="" className='footer-link'>Cambios y devoluciones</a>
                        <a href="" className='footer-link'>Políticas de despacho</a>
                    </Col>

                    <Col lg={5}>
                        <p className='footer-link-title'>Únete a nuestra comunidad</p>
                        <Form className='footer-input-container'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu mail" />
                            </Form.Group>
                        </Form>

                    </Col>
                    <Col lg={1}>
                        <Button variant="primary" type="submit">
                            SUSCRÍBETE
                        </Button>
                    </Col>
                </Row>
            </Container >
            <p className='footer-title'>CORTE LITERARIO</p>
        </>
    )
}

export default Footer;