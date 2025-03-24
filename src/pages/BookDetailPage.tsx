import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainLayout from "../layout/MainLayout"
import { useFetch } from '../hooks/useFetch';
import { IBook } from '../interfaces/IBook';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import '../styles/detail.css'

interface BookDetailPageProps {
    title: string;
}

const BookDetailPage = (props: BookDetailPageProps) => {

    document.title = props.title;

    const { isbn } = useParams<{ isbn: string }>();

    const { data: books, loading, error } = useFetch<IBook[]>(`http://localhost:3000/libros?isbn=${isbn}`)

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error en la consulta de datos {error}</p>

    return (
        <MainLayout>
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className=''>
                            <img src="" alt="" />
                        </div>
                    </Col>

                    <Col lg={5} >
                        {books && books.map((book) => (
                            <div>
                                <p className='detail-text'>{book.autor}</p>
                                <p className='detail-title'>{book.titulo}</p>
                                <p className='detail-text'>{`$${book.precio.toLocaleString()}`}</p>
                                <button className='detail-button'>Añadir al carro</button>

                                <Accordion defaultActiveKey="0" flush alwaysOpen className='detail-accordion'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Resumen</Accordion.Header>
                                        <Accordion.Body className='detail-text'>{book.resumen}</Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Características</Accordion.Header>
                                        <Accordion.Body>
                                            <p className='detail-text'>Isbn: {book.isbn}</p>
                                            <p className='detail-text'>Editorial: {book.editorial}</p>
                                            <p className='detail-text'>Encuadernación: {book.encuadernacion}</p>
                                            <p className='detail-text'>Idioma: {book.idioma}</p>
                                            <p className='detail-text'>Género: {book.genero}</p>
                                            <p className='detail-text'>Publicación: {book.publicacion}</p>
                                            <p className='detail-text'>Páginas: {book.paginas}</p>
                                            <p className='detail-text'>Dimensiones: {book.dimensiones}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        ))
                        }
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    )
}

export default BookDetailPage;