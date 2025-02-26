import { IBook } from '../interfaces/IBook';
import '../styles/book-card.css'

interface BookCardProps {
    book: IBook;
}

const BookCard = (props: BookCardProps) => {
    return (
        <div className='card-container'>
            <div className='card-img-container'>
                <button className='add-cart-button'>Añadir al carro</button>
            </div>

            <div className='card-info-container'>
                <p className='titulo'>{props.book.titulo}</p>
                <p className='autor'>{props.book.autor}</p>
                <p className='precio'>{`$${props.book.precio.toLocaleString()}`}</p>
            </div>
        </div>
    )
}

export default BookCard;