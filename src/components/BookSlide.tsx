import '../styles/book-slide.css'
import Container from 'react-bootstrap/Container';
import BookCard from './BookCard';
import { IBook } from '../interfaces/IBook';
import { useFetch } from '../hooks/useFetch';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookSlide = () => {

    const { data: books, loading, error } = useFetch<IBook[]>('http://localhost:3000/libros');

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error en la consulta de datos {error}</p>

    /* CONFIG CARRUSEL */
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container fluid className='slide-container'>
            <h2>Novedades</h2>
            <div className='slide-cards-container'>
                <Slider {...settings}>
                    {books && books.map((book) => (
                        <BookCard key={book.isbn} book={book}></BookCard>
                    ))}
                </Slider>
            </div>

        </Container>
    )
}

export default BookSlide;