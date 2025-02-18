import '../styles/book-card.css'

const BookCard = () => {
    return (
        <div className='card-container'>
            <div className='card-img-container'>
                <button className='add-cart-button'>AÑADIR AL CARRO</button>
            </div>

            <div className='card-info-container'>
                <p className='titulo'>Crear fotografías</p>
                <p className='autor'>Albert Watson</p>
                <p className='precio'>$23.990</p>
            </div>
        </div>
    )
}

export default BookCard;