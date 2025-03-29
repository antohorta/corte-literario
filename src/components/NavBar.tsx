import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../styles/nav.css'
import '../styles/offcanvas.css'
import '../styles/cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { IGenre } from '../interfaces/IGenre';
import { useFetch } from '../hooks/useFetch';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { IBook } from '../interfaces/IBook';
import QuantityButtons from './QuantityButtons';
import { useSelector } from 'react-redux';
import { RootType } from '../states/store';
import { Button } from 'react-bootstrap';
import { selectTotalItems } from "../states/cartSlice";
import RemoveAllButton from './RemoveAllButton';

const NavBar = () => {

    const navigate = useNavigate();
    const cartItems = useSelector((state: RootType) => state.cart.items);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalItems = useSelector(selectTotalItems);


    /* ESTADOS DE OFFCANVAS BARRA BÚSQUEDA */
    const [showSearch, setShowSearch] = useState(false);

    /* ESTADOS DE OFFCANVAS CARRO */
    const [showCart, setShowCart] = useState(false);

    /* ESTADOS PARA BÚSQUEDA */
    const [query, setQuery] = useState('');

    /* OBTENER GÉNEROS AL CARGAR COMPONENTE */
    const { data: genres, loading: loadingGenres, error: errorGenres } = useFetch<IGenre[]>('http://localhost:3000/generos');

    /* OBTENER RESULTADOS BÚSQUEDA */
    const { data: results, loading: loadingResults, error: errorResults } = useFetch<IBook[]>(`http://localhost:3000/libros?q=${query}`)

    /* HANDLE PARA EVITAR QUE DROPDOWN SE CIERRE */
    const handleNoPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    /* HANDLES DE OFFCANVAS BARRA BÚSQUEDA */
    const handleCloseSearch = () => setShowSearch(false);
    const handleShowSearch = () => setShowSearch(true);

    /* HANDLES DE OFFCANVAS CARRO */
    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    /* HANDLES DE OFFCANVAS BARRA BÚSQUEDA */
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        if (!query) {
            return;
        }
    }, [query]);

    if (loadingGenres) return <p>Cargando...</p>;
    if (errorGenres) return <p>Error en la consulta de datos {errorGenres}</p>;

    if (loadingResults) return <p>Cargando resultados...</p>;
    if (errorResults) return <p>Error en la consulta de resultados {errorResults}</p>;

    return (
        <div className='my-nav-container'>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                    <Container className="my-nav">
                        <Navbar.Brand as={Link} to={'/'} id='nav-tilte'>CORTE LITERARIO</Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            className="navbar-toggler collapsed"
                        >
                            MENÚ
                        </Navbar.Toggle>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 my-nav-dropdown">
                                    <Nav.Link as={Link} to={'/catalogo'}>CATÁLOGO</Nav.Link>
                                    <NavDropdown
                                        title="GÉNEROS"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}>

                                        {/* PINTAR GÉNEROS */}
                                        {genres && genres.map((genero) => (
                                            <NavDropdown.Item
                                                key={genero.id}
                                                href={`#${genero.id}`}
                                                onClick={handleNoPropagation}>
                                                {genero.genero}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                    <Nav.Link as={Link} to={'/mystery-boxes'}>MYSTERY BOXES</Nav.Link>
                                    <Nav.Link as={Link} to={'/suscripciones'}>SUSCRIPCIONES</Nav.Link>
                                    <Nav.Link as={Link} to={'/nosotros'}>NOSOTROS</Nav.Link>
                                    <Nav.Link as={Link} to={'/contacto'}>CONTACTO</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>

                        {/* BARRA DE BÚSQUEDA */}
                        <Nav.Link as={Link} to={'#'} onClick={handleShowSearch}>BUSCAR</Nav.Link>
                        <Offcanvas show={showSearch} onHide={handleCloseSearch} placement="top" className="search-nav">
                            <Offcanvas.Body>
                                <Offcanvas.Header closeButton></Offcanvas.Header>
                                <Form className='search-input-container'>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="Busca tu próxima historia..."
                                            onChange={handleSearchChange}
                                            value={query} />
                                    </Form.Group>
                                </Form>

                                {/* RESULTADOS BÚSQUEDA */}
                                <div className='results-container'>
                                    {results && results.length > 0 && (
                                        <div className='card-results-container'>
                                            {results.map((book) => (
                                                <div key={book.isbn} className='card-result-container'>
                                                    <Link to={`/libro/${book.isbn}`} id='card-result-link'>
                                                        <div className='card-result-img-container'>
                                                            <img src={book.portada} alt={book.titulo} />
                                                        </div>
                                                        <div className='card-result-info-container'>
                                                            <p className='titulo'>{book.titulo}</p>
                                                            <p className='autor'>{book.autor}</p>
                                                            <p className='titulo'>{`$${book.precio.toLocaleString()}`}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {results && results.length === 0 && (
                                        <p style={{ color: 'white' }}>No se encontraron resultados para "{query}.</p>
                                    )}
                                    <div className='all-results-container'>
                                        <a href='#' id='all-results-link'>
                                            Ver todos los resultados
                                        </a>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <Nav.Link as={Link} to={'/login'}>CUENTA</Nav.Link>

                        {/* CARRITO DE COMPRAS */}
                        <Nav.Link href='#' onClick={handleShowCart}>CARRO({totalItems})</Nav.Link>

                        <Offcanvas show={showCart} onHide={handleCloseCart} placement='end' className='cart-list'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='cart-list-title'>CARRO ({totalItems})</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='cart-list-container'>
                                {cartItems.length === 0 ? (
                                    <div className='empty-cart-container'>
                                        <p className='empty-cart-text'>Tu carrito está vacío</p>
                                        <Button onClick={() => navigate('/catalogo')}>Seguir comprando</Button>
                                    </div>
                                ) : (
                                    <div className='full-cart-container'>
                                        {cartItems.map((book) => (
                                            <div key={book.isbn} className='cart-list-card-container'>
                                                <div className='cart-list-img-container'>
                                                    <img src={book.portada} alt={book.titulo} />
                                                </div>

                                                <div className='cart-list-info-container'>
                                                    <p className='titulo'>{book.titulo}</p>
                                                    <p className='autor'>{book.autor}</p>
                                                    <p className='precio'>${book.precio.toLocaleString()}</p>
                                                </div>

                                                <div className='cart-list-buttons-container'>
                                                    <RemoveAllButton isbn={book.isbn} />
                                                    <QuantityButtons isbn={book.isbn} />
                                                </div>
                                            </div>
                                        ))}
                                        <div className='total-container'>
                                            <div>
                                                <p className='total-price'>Total: ${totalPrice.toLocaleString()}</p>
                                            </div>

                                            <div className='cart-list-redirect-container'>
                                                <button id='secondary-button'>Ver carro</button>
                                                <button id='primary-button'>Ir a pagar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Offcanvas.Body>

                        </Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default NavBar;