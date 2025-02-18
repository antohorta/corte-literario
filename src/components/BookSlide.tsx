import '../styles/book-slide.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookCard from './BookCard';

const BookSlide = () => {

    return (
        <Container fluid className='slide-container'>
            <h2>Novedades</h2>
            <div className='slide-cards-container'>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
            </div>

        </Container>
    )
}

export default BookSlide;