import { IBook } from '../interfaces/IBook';
import '../styles/book-card.css'

interface BookCardProps {
    book: IBook;
    noStock: boolean;
}

const BookCard = (props: BookCardProps) => {
    return (
        <div className={`card-container ${props.noStock ? 'no-stock' : ''}`}>
            <div className='card-img-container'>
                <button
                    className={`add-cart-button ${props.noStock ? 'hidden' : ''}`}
                    disabled={props.noStock}>
                    Añadir al carro</button>
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