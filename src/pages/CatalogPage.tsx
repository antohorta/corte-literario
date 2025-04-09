import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainLayout from "../layout/MainLayout"
import '../styles/catalog.css'
import '../styles/offcanvas.css'
import '../styles/pagination.css'
import { useFetch } from '../hooks/useFetch';
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IGenre } from '../interfaces/IGenre';
import { NavDropdown } from 'react-bootstrap';
import { IEditorial } from '../interfaces/IEditorial';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from "react-redux";
import { RootType } from "../states/store";
import { IBook } from '../interfaces/IBook';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

interface CatalogPageProps {
    title: string;
}

const CatalogPage = (props: CatalogPageProps) => {

    document.title = props.title;

    /* ESTADOS Y HANDLES PARA OFFCANVAS DE FILTROS */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setTempMinPrice(0);
        setTempMaxPrice(300000);
        setShow(false);
    }

    const handleShow = () => setShow(true);

    /* GÉNERO SELECCIONADO EN NAVBAR */
    const selectedGenre = useSelector((state: RootType) => state.genre.selectedGenre);

    /* ESTADO PAGINACIÓN */
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(1);

    /* ESTADOS PARA FILTROS */
    const [selectedGenresTemp, setSelectedGenresTemp] = useState<string[]>([]);
    const [appliedGenres, setAppliedGenres] = useState<string[]>([]);
    const [selectedEditorialsTemp, setSelectedEditorialsTemp] = useState<string[]>([]);
    const [appliedEditorials, setAppliedEditorials] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<{ sort: string; order: "asc" | "desc" } | null>(null);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(300000);
    const [tempMinPrice, setTempMinPrice] = useState<number>(minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState<number>(maxPrice);

    // HANDLE FILTRO GÉNEROS
    const handleGenreChange = (genre: string) => {
        setSelectedGenresTemp((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };

    // HANDLE FILTRO EDITORIALES
    const handleEditorialChange = (editorial: string) => {
        setSelectedEditorialsTemp((prevEditorials) =>
            prevEditorials.includes(editorial)
                ? prevEditorials.filter((e) => e !== editorial)
                : [...prevEditorials, editorial]
        );
    };

    // HANDLE FILTROS ORDENAR POR PRECIO Y ALFABETICAMENTE
    const handleSortSelection = (sort: string, order: "asc" | "desc") => {
        setSortOption({ sort, order });
        setShow(false);
    };

    // HANDLES FILTRAR POR PRECIOS
    const handleTempMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempMinPrice(Number(e.target.value));
    };

    const handleTempMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempMaxPrice(Number(e.target.value));
    };

    // APLICAR FILTROS
    const handleApplyFilters = () => {
        setAppliedGenres(selectedGenresTemp);
        setAppliedEditorials(selectedEditorialsTemp)
        setMinPrice(tempMinPrice);
        setMaxPrice(tempMaxPrice);
        handleClose();
    };

    // BORRAR FILTROS
    const handleDeleteFilters = () => {
        setAppliedGenres([]);
        setAppliedEditorials([]);
        setMinPrice(0);
        setMaxPrice(300000);
        handleClose();
    };

    // URL
    const baseURL = "http://localhost:3000/libros?";
    const genreParam = selectedGenre ? `genero=${encodeURIComponent(selectedGenre)}` : "";
    const appliedGenresParam = appliedGenres.length ? `genero=${appliedGenres.map(encodeURIComponent).join("&genero=")}` : "";
    const appliedEditorialsParam = appliedEditorials.length ? `editorial=${appliedEditorials.map(encodeURIComponent).join("&editorial=")}` : "";
    const sortParam = sortOption ? `_sort=${sortOption.sort}&_order=${sortOption.order}` : "";
    const paginationParams = `_page=${currentPage}&_limit=${itemsPerPage}`;
    const priceParam = (minPrice > 0 || maxPrice > 0) ? `precio_gte=${minPrice}&precio_lte=${maxPrice}` : '';

    const url = [
        genreParam,
        appliedGenresParam,
        appliedEditorialsParam,
        paginationParams,
        sortParam,
        priceParam
    ].filter(param => param).join("&");

    const finalURL = `${baseURL}${url}`;

    /* LLAMADA PARA OBTENER LIBROS */
    const { data: books, loading: loadingBooks, error: errorBook, totalCount } = useFetch<IBook[]>(finalURL);

    /* LLAMADA PARA EXTRAER PÁGINAS TOTALES */
    useEffect(() => {
        if (totalCount !== undefined) {
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
        }
    }, [totalCount, itemsPerPage]);

    /* LLAMADA PARA OBTENER GÉNEROS */
    const { data: genres, loading: loadingGenres, error: errorGenres } = useFetch<IGenre[]>('http://localhost:3000/generos');

    /* LLAMADA PARA OBTENER EDITORIALES */
    const { data: editorials, loading: loadingEditorials, error: errorEditorials } = useFetch<IEditorial[]>('http://localhost:3000/editoriales');

    /* HANDLE PARA EVITAR QUE DROPDOWN SE CIERRE */
    const handleNoPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    /* HANDLES PAGINACIÓN */
    const paginationItems = [];

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    console.log(`La url del catalolo es: ${finalURL}`)

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

                {/* LIBROS */}

                <Row>
                    <Col lg={12} className='catalog-cards-container'>
                        {books?.map((book) => (
                            <BookCard
                                key={book.isbn}
                                book={book}
                                noStock={book.stock === 0}
                            />
                        ))}

                    </Col>
                </Row>

                {/* PAGINACIÓN */}

                {books && books.length > 0 ? (
                    <Pagination>
                        <Pagination.First
                            onClick={handleFirstPage}
                            disabled={currentPage === 1}
                            className={currentPage === 1 ? 'pagination-disabled' : ''}
                        />
                        <Pagination.Prev
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={currentPage === 1 ? 'pagination-disabled' : ''}
                        />
                        {paginationItems}
                        <Pagination.Next
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? 'pagination-disabled' : ''}
                        />
                        <Pagination.Last
                            onClick={handleLastPage}
                            disabled={currentPage === totalPages}
                            className={currentPage === totalPages ? 'pagination-disabled' : ''}
                        />
                    </Pagination>
                ) : null}

                {/* FILTROS */}

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='offcanvas-filter'>
                        <div className='filters-container'>
                            <NavDropdown title="ORDENAR POR">
                                <NavDropdown.Item onClick={(e) => { handleNoPropagation(e); handleSortSelection("precio", "desc"); }} >
                                    PRECIO (MAYOR A MENOR)
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={(e) => { handleNoPropagation(e); handleSortSelection("precio", "asc"); }} >
                                    PRECIO (MENOR A MAYOR)
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={(e) => { handleNoPropagation(e); handleSortSelection("titulo", "asc"); }} >
                                    NOMBRE (A a Z)
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={(e) => { handleNoPropagation(e); handleSortSelection("titulo", "desc"); }} >
                                    NOMBRE (Z a A)
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="GÉNERO">
                                {/* PINTAR GÉNEROS */}
                                {genres && genres.map((genero) => (
                                    <NavDropdown.Item key={genero.id} onClick={handleNoPropagation}>
                                        <input
                                            type="checkbox"
                                            id={`genre-${genero.id}`}
                                            checked={selectedGenresTemp.includes(genero.genero)}
                                            onChange={() => handleGenreChange(genero.genero)}
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
                                            id={`editorial-${editorial.id}`}
                                            checked={selectedEditorialsTemp.includes(editorial.editorial)}
                                            onChange={() => handleEditorialChange(editorial.editorial)}
                                            onClick={handleNoPropagation} />
                                        <label
                                            htmlFor={`editorial-${editorial.id}`}
                                            onClick={handleNoPropagation}>
                                            {editorial.editorial}
                                        </label>
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            {/* PRECIO MIN Y MAX */}
                            <NavDropdown
                                title="PRECIO">
                                <NavDropdown.Item onClick={handleNoPropagation} className='min-max-container'>
                                    <span>$</span>
                                    <FloatingLabel className="min-max-input-container" controlId="minimo" label='Mínimo'>
                                        <Form.Control
                                            type="number"
                                            placeholder="Mínimo"
                                            min="0"
                                            value={tempMinPrice}
                                            onChange={handleTempMinPrice} />
                                    </FloatingLabel>
                                    <span>$</span>
                                    <FloatingLabel className="min-max-input-container" controlId="maximo" label='Máximo'>
                                        <Form.Control
                                            type="number"
                                            placeholder="Máximo"
                                            min="0"
                                            value={tempMaxPrice}
                                            onChange={handleTempMaxPrice} />
                                    </FloatingLabel>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <div className='filter-buttons-container'>
                            <Button id='primary-button' onClick={handleApplyFilters}>Filtrar</Button>
                            <Button id='secondary-button' onClick={handleDeleteFilters}>Borrar</Button>
                        </div>
                    </Offcanvas.Body >
                </Offcanvas >
            </Container >
        </MainLayout >
    )
}

export default CatalogPage;