import '../styles/catalog.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainLayout from "../layout/MainLayout"
import { Pagination } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { IBook } from '../interfaces/IBook';
import { useLocation } from "react-router-dom";

const SearchPage = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    /* ESTADO PAGINACIÓN */
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(1);

    const url = `http://localhost:3000/libros?q=${query}&_page=${currentPage}&_limit=${itemsPerPage}`
    /* LLAMADA PARA OBTENER LIBROS */
    const { data: books, loading: loadingBooks, error: errorBook, totalCount } = useFetch<IBook[]>(url);

    /* LLAMADA PARA EXTRAER PÁGINAS TOTALES */
    useEffect(() => {
        if (totalCount !== undefined) {
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
        }
    }, [totalCount, itemsPerPage]);

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

    if (loadingBooks) return <p>Cargando...</p>
    if (errorBook) return <p>Error en la consulta de datos {errorBook}</p>

    return (
        <MainLayout>
            <Container className='catalog-page-container'>
                <Row>
                    <Col lg={12}>
                        <h2 className='catalog-page-title'>Resultados</h2>
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

            </Container >
        </MainLayout >
    )
}

export default SearchPage;