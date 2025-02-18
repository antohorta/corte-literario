import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../styles/nav.css'
import { useEffect, useState } from 'react';

interface IGeneros {
    id: number,
    nombre: string
}

const NavBar = () => {

    // ESTADO PARA LOS GÉNEROS
    const [generos, setGeneros] = useState<IGeneros[]>([]);

    // OBTENER GÉNEROS AL CARGAR COMPONENTE
    useEffect(() => {
        fetch('http://localhost:3000/generos')
            .then((response) => response.json())
            .then((data) => setGeneros(data))
            .catch((error) => console.error('Error al cargar géneros:', error));
    }, []);

    return (
        <div className='my-nav-container'>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary">
                    <Container className="d-flex justify-content-end my-nav">
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
                                    <Nav.Link href="#action1">CATÁLOGO</Nav.Link>
                                    <NavDropdown
                                        title="GÉNEROS"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}>

                                        {/* PINTAR GÉNEROS */}
                                        {generos && generos.map((genero) => (
                                            <NavDropdown.Item
                                                key={genero.id}
                                                href={`#${genero.id}`}>
                                                {genero.nombre}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                    <Nav.Link href="#action2">MYSTERY BOXES</Nav.Link>
                                    <Nav.Link href="#action2">SUSCRIPCIONES</Nav.Link>
                                    <Nav.Link href="#action2">NOSOTROS</Nav.Link>
                                    <Nav.Link href="#action2">CONTACTO</Nav.Link>
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