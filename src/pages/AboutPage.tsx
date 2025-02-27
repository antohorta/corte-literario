import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainLayout from "../layout/MainLayout"
import chair from '../assets/images/chair-with-empty-wall.jpg'
import stepBook from '../assets/images/stepping-on-books.jpg'
import twoBooks from '../assets/images/2-books.jpg'
import coupleLibrary from '../assets/images/man-woman-read.jpg'
import '../styles/about.css'

interface AboutPageProps {
    title: string
}

const AboutPage = (props: AboutPageProps) => {
    document.title = props.title

    return (
        <MainLayout>
            <Container className='about-page-container'>
                <Row>
                    <Col>
                        <h2 className='about-page-title'>Nosotros</h2>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <img src={chair} alt="" className='about-page-img' />
                    </Col>
                </Row>

                <Row>
                    <Col lg={{ span: 6, offset: 6 }}>
                        <p className='about-page-text'>En Corte Literario no solo vendemos libros, te invitamos a un viaje hacia mundos nuevos. Somos una plataforma pensada para los lectores que buscan algo más que solo un título: buscan una experiencia única. Cada uno de nuestros libros está cuidadosamente seleccionado para desafiarte y llevarte más allá de lo conocido.</p>
                    </Col>
                </Row>

                <Row style={{marginTop: '5rem', marginBottom: '5rem'}}>
                    <Col lg={5}>
                        <img src={stepBook} alt="" />
                    </Col>
                    <Col lg={{ span: 5, offset: 2 }}>
                        <p className='about-page-title'>01.</p>
                        <p className='about-page-text'>Nuestra misión en Corte Literario es conectar a los lectores con historias que resuenen con ellos. Ofrecemos recomendaciones personalizadas y una experiencia única de lectura. Además, nuestras Mystery Boxes traen libros sorpresa y artículos exclusivos para los amantes del misterio.</p>
                    </Col>
                </Row>

                <Row style={{marginTop: '5rem', marginBottom: '5rem'}}>
                    <Col lg={5}>
                        <p className='about-page-title'>02.</p>
                        <p className='about-page-text'>Nuestra visión es ser la plataforma líder para lectores auténticos que buscan nuevas perspectivas literarias. Queremos ser el espacio de referencia para quienes desean una lectura más rica y emocionante. Buscamos transformar cada momento de lectura en una experiencia inolvidable.</p>
                    </Col>
                    <Col lg={{ span: 5, offset: 2 }}>
                        <img src={twoBooks} alt="" />
                    </Col>
                </Row>

                <Row style={{marginTop: '5rem', marginBottom: '5rem'}}>
                    <Col lg={5}>
                        <img src={coupleLibrary} alt="" />
                    </Col>
                    <Col lg={{ span: 5, offset: 2 }}>
                        <p className='about-page-title'>03.</p>
                        <p className='about-page-text'>Nuestro equipo en Corte Literario está formado por apasionados lectores, curadores de libros y expertos en experiencias literarias. Nos une el amor por los libros y el deseo de ofrecerte recomendaciones únicas. Trabajamos para crear nuevas formas de disfrutar la lectura, como suscripciones personalizadas y clubes de lectura virtuales.</p>
                    </Col>
                </Row>
            </Container>
        </MainLayout >
    )
}

export default AboutPage;