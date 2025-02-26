import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../styles/nav.css'
import '../styles/offcanvas.css'
import { Link } from 'react-router-dom';
import { IGenre } from '../interfaces/IGenre';
import { useFetch } from '../hooks/useFetch';

const NavBar = () => {

    // OBTENER GÉNEROS AL CARGAR COMPONENTE
    const { data: genres, loading: loadingGenres, error: errorGenres } = useFetch<IGenre[]>('http://localhost:3000/generos');

    /* HANDLE PARA EVITAR QUE DROPDOWN SE CIERRE */
    const handleNoPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (loadingGenres) return <p>Cargando...</p>
    if (errorGenres) return <p>Error en la consulta de datos {errorGenres}</p>

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
                                    <Nav.Link as={Link} to={'/nosotros'}>MYSTERY BOXES</Nav.Link>
                                    <Nav.Link as={Link} to={'/nosotros'}>SUSCRIPCIONES</Nav.Link>
                                    <Nav.Link as={Link} to={'/nosotros'}>NOSOTROS</Nav.Link>
                                    <Nav.Link as={Link} to={'/contacto'}>CONTACTO</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Nav.Link href="#link">BUSCAR</Nav.Link>
                        <Nav.Link href="#link">CUENTA</Nav.Link>
                        <Nav.Link href="#link">CARRO(0)</Nav.Link>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default NavBar;