import { useDispatch } from 'react-redux';
import '../styles/book-card.css'
import { addToCart } from '../states/cartSlice';
import { ICart } from '../interfaces/ICart';
import { Link } from 'react-router-dom';
import React from 'react';

interface BookCardProps {
    book: ICart;
    noStock: boolean;
}

const BookCard = (props: BookCardProps) => {

    const dispatch = useDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart({ ...props.book, cantidad: 1 }));
    };

    console.log(`la ruta de la imagen es: ${props.book.portada}`)

    return (
        <div className={`card-container ${props.noStock ? 'no-stock' : ''}`}>
            <Link to={`/libro/${props.book.isbn}`}>
                <div className='card-img-container'>
                    <img className='card-img' src={props.book.portada} alt={props.book.titulo} />
                    <button
                        className={`add-cart-button ${props.noStock ? 'hidden' : ''}`}
                        disabled={props.noStock}
                        onClick={handleAddToCart}>
                        Añadir al carro</button>
                </div>

                <div className='card-info-container'>
                    <p className='titulo'>{props.book.titulo}</p>
                    <p className='autor'>{props.book.autor}</p>
                    <p className='precio'>{`$${props.book.precio.toLocaleString()}`}</p>
                </div>
            </Link>
        </div>
    )
}

export default BookCard;