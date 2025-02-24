import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import MainLayout from "../layout/MainLayout"
import chair from '../assets/images/chair-with-empty-wall.jpg'
import '../styles/about.css'
interface AboutPageProps {
    title: string
}

const AboutPage = (props: AboutPageProps) => {
    document.title = props.title

    return (
        <MainLayout>
            <Container fluid className='mt-5 mb-5 mx-0'>
                <Row style={{margin: '0px', padding: '0px'}}>
                    <Col lg={12} style={{margin: '0px', padding: '0px'}}>
                        <h2 className='about-page-title'>NOSOTROS</h2>
                    </Col>
                </Row>
                <Row style={{margin: '0px', padding: '0px'}}>
                    <Col lg={7} style={{margin: '0px', padding: '0px'}}>
                        <img src={chair} alt="" className='about-page-img'/>
                    </Col>
                    <Col lg={5} style={{margin: '0px', padding: '0px'}}>
                        <p className='about-page-text'>En corte literario no solo vendemos libros, te damos acceso a mundos nuevos. Somos la plataforma para los lectores que buscan más que solo un título: buscan una experiencia. Aquí, cada libro está seleccionado para desafiarte, para llevarte más allá de lo conocido.</p>
                        <p className='about-page-text'>Nuestra misión es simple: ayudarte a descubrir lecturas que te hablen, adaptadas a tus gustos, tu estado de ánimo, tu momento. Con nuestra curaduría personalizada y recomendaciones basadas en tus intereses, encontrar lo que buscas nunca fue tan fácil. Además, nuestras Mystery Boxes te ofrecen una experiencia de descubrimiento: libros sorpresas, artículos exclusivos, todo pensado para los que no temen a lo inesperado.</p>
                        <p className='about-page-text'>Nos dirigimos a los lectores auténticos, los que están hartos del mainstream y buscan algo más. Desde suscripciones mensuales hasta clubes de lectura virtuales, lo tuyo está aquí. Ven a explorar.</p>
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default AboutPage;