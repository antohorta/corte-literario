import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col'; import '../styles/contact.css'
import MainLayout from '../layout/MainLayout';

interface ContactPageProps {
    title: string;
}

const ContactPage = (props: ContactPageProps) => {

    document.title = props.title;

    return (
        <MainLayout>
            <Container className='contact-page-container'>
                <Row>
                    <Col lg={12}>
                        <h2 className='contact-page-title'>CONTACTO
                            <svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 114 114" fill="none">
                                <path d="M81.5465 81.1151L41.8815 81.1151V74.4484H70.1658L31.0727 35.3553L35.7867 30.6413L74.8798 69.7344V41.4501H81.5465V81.1151Z" fill="#D9D9D9" />
                            </svg>
                        </h2>
                    </Col>
                </Row>

                <Row>
                    <Col lg={5}>
                        <p className='contact-page-text'>¿Tienes dudas o necesitas algo más? Si estás buscando algo que no encuentras, o simplemente quieres saber más sobre un libro que te llama la atención, estamos aquí para ayudarte. Nada de respuestas automáticas ni historias aburridas, solo gente real lista para resolver lo que sea.</p>
                    </Col>
                    <Col lg={2}></Col>
                    <Col lg={5}>
                        <Form className='contact-input-container'>
                            <FloatingLabel className="mb-3" controlId="nombre" label='Nombre'>
                                <Form.Control type="email" placeholder="Nombre" required />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3" controlId="mail" label='Mail'>
                                <Form.Control type="email" placeholder="Mail" required />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3" controlId="asunto" label='Asunto'>
                                <Form.Control type="text" placeholder="Asunto" required />
                            </FloatingLabel>

                            <FloatingLabel className="mb-3" controlId="mensaje" label='Mensaje'>
                                <Form.Control type="text" placeholder="Mensaje" required />
                            </FloatingLabel>

                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default ContactPage