import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import MainLayout from "../layout/MainLayout"
import { Link } from 'react-router-dom';
import '../styles/login.css'

interface LoginPageProps {
    title: string;
}

const LogInPage = (props: LoginPageProps) => {

    document.title = props.title;
    return (
        <MainLayout>
            <Container fluid className='login-container'>
                <Row className='d-flex justify-content-center'>
                    <Col lg={6} className='login-form-container'>
                        <h2 className='login-title'>Iniciar sesión</h2>
                        <Form className='login-form'>
                            <FloatingLabel className="mb-5 mt-5" controlId="correo" label="Correo electrónico">
                                <Form.Control type="email" placeholder="Correo electrónico" />
                            </FloatingLabel>

                            <FloatingLabel className="mb-5 mt-5" controlId="contrasena" label="Contraseña">
                                <Form.Control type="password" placeholder="Contraseña" />
                            </FloatingLabel>

                            <a href="#" className='login-link'>¿Olvidaste tu contraseña?</a>

                            <Button variant="primary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Form>
                        <Link to={'/signup'} className='login-link-create-account'>Crear cuenta</Link>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default LogInPage