import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/home.css'
import mysteryBox from '../assets/images/mystery-box-home.webp'
import mujerLeyendo from '../assets/images/mujer-leyendo-sofa.gif'
import amigosLibreria from '../assets/images/amigos-en-libreria.webp'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BookSlide from './BookSlide';
import Header from './Header';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <Container fluid className="home-container" style={{ margin: '0px', padding: '0px' }}>

            {/* COVER IMG */}
            <Header></Header>

            {/* ABOUT US */}
            <div className="about-container">
                <Row className="d-flex justfify-center" style={{ margin: '0px', padding: '0px' }}>
                    <Col md={{ span: 8, offset: 2 }} className="d-flex justfify-center">
                        <p className="about-text">Libros que se han mantenido lejos del radar principal: joyas ocultas, historias intrigantes y autores que desafían lo convencional.</p>
                    </Col>
                </Row>
                <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col className="about-link">
                        <Link to={'/nosotros'}>más sobre nosotros
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.499999 12C0.5 5.64873 5.64873 0.5 12 0.500001C18.3513 0.500001 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64872 23.5 0.499999 18.3513 0.499999 12Z" stroke="#222222" />
                                <path d="M18.7071 12L13.3333 17.3738L12.6262 16.6667L16.7929 12.5L5.5 12.5L5.5 11.5L16.7929 11.5L12.6262 7.33333L13.3333 6.62622L18.7071 12Z" fill="#222222" />
                            </svg>
                        </Link>
                    </Col>
                </Row>
            </div>

            {/* MYSTERY BOXES */}
            <div className="mystery-container">
                <Row>
                    <Col lg={6}>
                        <h2><a href="">Mystery Boxes</a></h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
                            <path d="M119.542 64L74.6667 108.876L67.1242 101.333L99.1242 69.3334H10.6667V58.6667H99.1242L67.1242 26.6667L74.6667 19.1243L119.542 64Z" fill="#D9D9D9" />
                        </svg>
                    </Col>
                    <Col lg={6}>
                        <img src={mysteryBox} alt="" />
                        <p>Accede a nuestra <a href="">curaduría personalizada.</a></p>
                    </Col>
                </Row>
            </div>

            {/* NOVEDADES */}
            <BookSlide />

            {/* ESTILO LITERARIO */}
            <div className="style-container">
                <div className="style-image-container">
                    <img src={mujerLeyendo} alt="Mujer leyendo" className="img-fluid" />
                    <Link to={'/mystery-boxes'}>Tu estilo literario</Link>
                </div>
            </div>

            {/* SUCRÍBETE */}
            <div className="suscribe-container">
                <Row style={{ margin: '0px', padding: '0px' }}>
                    <Col lg={6} className='suscribe-input-container' style={{ margin: '0rem !important', padding: '0rem' }}>
                        <h3>Únete a nuestra comunidad</h3>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label></Form.Label>
                                <Form.Control type="email" placeholder="Ingresa tu mail" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Suscríbete
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={6} style={{ margin: '0rem !important', padding: '0rem' }}>
                        <img src={amigosLibreria} alt="" className='suscribe-img' />
                    </Col>
                </Row>
            </div>
        </Container>

    )
}

export default Home;