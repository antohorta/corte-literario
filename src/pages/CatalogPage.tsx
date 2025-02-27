import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainLayout from "../layout/MainLayout"
import '../styles/catalog.css'
import '../styles/offcanvas.css'
import { useFetch } from '../hooks/useFetch';
import { IBook } from '../interfaces/IBook';
import BookCard from '../components/BookCard';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IGenre } from '../interfaces/IGenre';
import { NavDropdown } from 'react-bootstrap';
import { IEditorial } from '../interfaces/IEditorial';

interface CatalogPageProps {
    title: string;
}

const CatalogPage = (props: CatalogPageProps) => {

    document.title = props.title;

    /* ESTADOS Y HANDLES PARA OFFCANVAS DE FILTROS */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* LLAMADA PARA OBTENER LIBROS */
    const { data: books, loading: loadingBooks, error: errorBook } = useFetch<IBook[]>('http://localhost:3000/libros');

    /* LLAMADA PARA OBTENER GÉNEROS */
    const { data: genres, loading: loadingGenres, error: errorGenres } = useFetch<IGenre[]>('http://localhost:3000/generos');

    /* LLAMADA PARA OBTENER EDITORIALES */
    const { data: editorials, loading: loadingEditorials, error: errorEditorials } = useFetch<IEditorial[]>('http://localhost:3000/editoriales');

    /* HANDLE PARA EVITAR QUE DROPDOWN SE CIERRE */
    const handleNoPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (loadingBooks || loadingGenres || loadingEditorials) return <p>Cargando...</p>
    if (errorBook) return <p>Error en la consulta de datos {errorBook}</p>
    if (errorGenres) return <p>Error en la consulta de datos {errorGenres}</p>
    if (errorEditorials) return <p>Error en la consulta de datos {errorGenres}</p>

    return (
        <MainLayout>
            <Container className='catalog-page-container'>
                <Row>
                    <Col lg={12}>
                        <h2 className='catalog-page-title'>Catálogo</h2>
                    </Col>
                </Row>

                <Row>
                    <Col className='filter-container'>
                        <Button className='filter-button' onClick={handleShow}>FILTRAR
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 6.35352V3H4.25V6.35352C3.09575 6.67998 2.25 7.74122 2.25 9C2.25 10.2588 3.09575 11.32 4.25 11.6465V21H5.75V11.6465C6.90425 11.32 7.75 10.2588 7.75 9C7.75 7.74122 6.90425 6.67998 5.75 6.35352ZM3.75 9C3.75 8.30964 4.30964 7.75 5 7.75C5.69036 7.75 6.25 8.30964 6.25 9C6.25 9.69036 5.69036 10.25 5 10.25C4.30964 10.25 3.75 9.69036 3.75 9Z" fill="#D9D9D9" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 13.3535C10.0957 13.68 9.25 14.7412 9.25 16C9.25 17.2588 10.0957 18.32 11.25 18.6465V21H12.75V18.6465C13.9043 18.32 14.75 17.2588 14.75 16C14.75 14.7412 13.9043 13.68 12.75 13.3535V3H11.25V13.3535ZM10.75 16C10.75 15.3096 11.3096 14.75 12 14.75C12.6904 14.75 13.25 15.3096 13.25 16C13.25 16.6904 12.6904 17.25 12 17.25C11.3096 17.25 10.75 16.6904 10.75 16Z" fill="#D9D9D9" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 8.35352V3H18.25V8.35352C17.0957 8.67998 16.25 9.74122 16.25 11C16.25 12.2588 17.0957 13.32 18.25 13.6465V21H19.75V13.6465C20.9043 13.32 21.75 12.2588 21.75 11C21.75 9.74122 20.9043 8.67998 19.75 8.35352ZM17.75 11C17.75 10.3096 18.3096 9.75 19 9.75C19.6904 9.75 20.25 10.3096 20.25 11C20.25 11.6904 19.6904 12.25 19 12.25C18.3096 12.25 17.75 11.6904 17.75 11Z" fill="#D9D9D9" />
                            </svg>
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} className='catalog-cards-container'>
                        {books && books.map((book) => (
                            <BookCard
                                key={book.isbn}
                                book={book}
                                noStock={book.stock === 0} />
                        ))}
                    </Col>
                </Row>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='offcanvas-filter'>

                        <NavDropdown title="ORDENAR POR">
                            <NavDropdown.Item onClick={handleNoPropagation} >
                                <input type="checkbox" id='precio-mayor' onClick={handleNoPropagation} />
                                <label htmlFor="precio-mayor" onClick={handleNoPropagation} >PRECIO (MAYOR A MENOR)</label>
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={handleNoPropagation} >
                                <input type="checkbox" id='precio-menor' onClick={handleNoPropagation} />
                                <label htmlFor="precio-menor" onClick={handleNoPropagation} >PRECIO (MENOR A MAYOR)</label>
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={handleNoPropagation} >
                                <input type="checkbox" id='nombre-a' onClick={handleNoPropagation} />
                                <label htmlFor="nombre-a" onClick={handleNoPropagation} >NOMBRE (A a Z)</label>
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={handleNoPropagation} >
                                <input type="checkbox" id='nombre-z' onClick={handleNoPropagation} />
                                <label htmlFor="nombre-z" onClick={handleNoPropagation}>NOMBRE (Z a A)</label>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="GÉNERO">
                            {/* PINTAR GÉNEROS */}
                            {genres && genres.map((genero) => (
                                <NavDropdown.Item key={genero.id} onClick={handleNoPropagation}>
                                    <input
                                        type="checkbox"
                                        name={`genre-${genero.id}`}
                                        id={`genre-${genero.id}`}
                                        value={`genre-${genero.id}`}
                                        onClick={handleNoPropagation} />
                                    <label
                                        htmlFor={`genre-${genero.id}`}
                                        onClick={handleNoPropagation}>
                                        {genero.genero}
                                    </label>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <NavDropdown title="EDITORIAL">
                            {/* PINTAR EDITORIALES */}
                            {editorials && editorials.map((editorial) => (
                                <NavDropdown.Item key={editorial.id} onClick={handleNoPropagation}>
                                    <input
                                        type="checkbox"
                                        name={`editorial-${editorial.id}`}
                                        id={`editorial-${editorial.id}`}
                                        value={`editorial-${editorial.id}`}
                                        onClick={handleNoPropagation} />
                                    <label
                                        htmlFor={`editorial-${editorial.id}`}
                                        onClick={handleNoPropagation}>
                                        {editorial.editorial}
                                    </label>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <NavDropdown
                            title="PRECIO">
                            <NavDropdown.Item onClick={handleNoPropagation}>

                            </NavDropdown.Item>
                        </NavDropdown>

                        <Button id='primary-button'>Filtrar</Button>
                        <Button id='secondary-button'>Borrar</Button>

                    </Offcanvas.Body >
                </Offcanvas >
            </Container >
        </MainLayout >
    )
}

export default CatalogPage;