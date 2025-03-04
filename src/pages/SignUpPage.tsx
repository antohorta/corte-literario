import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

                            <Form.Group className="mb-5 mt-5" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Nombre" />
                            </Form.Group>

                            <Form.Group className="mb-5 mt-5" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Apellido" />
                            </Form.Group>

                            <Form.Group className="mb-5 mt-5" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Correo electrónico" />
                            </Form.Group>

                            <Form.Group className="mb-5 mt-5" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Contraseña" />
                            </Form.Group>

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