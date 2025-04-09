import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import MainLayout from "../layout/MainLayout"
import '../styles/login.css'

interface SignUpPageProps {
    title: string;
}

const SignUpPage = (props: SignUpPageProps) => {

    document.title = props.title;
    return (
        <MainLayout>
            <Container fluid className='login-container'>
                <Row className='d-flex justify-content-center'>
                    <Col lg={6} className='login-form-container'>
                        <h2 className='login-title'>Crear cuenta</h2>
                        <Form className='login-form'>

                            <FloatingLabel className="mb-4 mt-4" controlId="nombre" label="Nombre">
                                <Form.Control type="text" placeholder="Nombre" />
                            </FloatingLabel>

                            <FloatingLabel className="mb-4 mt-4" controlId="apellido" label="Apellido">
                                <Form.Control type="text" placeholder="Apellido" />
                            </FloatingLabel>

                            <FloatingLabel className="mb-4 mt-4" controlId="correo" label="Correo electrónico">
                                <Form.Control type="email" placeholder="Correo electrónico" />
                            </FloatingLabel>

                            <FloatingLabel className="mb-4 mt-4" controlId="contrasena" label="Contraseña">
                                <Form.Control type="password" placeholder="Contraseña" />
                            </FloatingLabel>

                            <Button variant="primary" type="submit">
                                Crear cuenta
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default SignUpPage