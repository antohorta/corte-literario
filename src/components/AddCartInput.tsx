import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../states/cartSlice';
import { ICart } from '../interfaces/ICart';
import { IBook } from '../interfaces/IBook';
import '../styles/detail.css'

interface AddToCartInputProps {
    item: IBook;
}

const AddToCartInput = ({ item }: AddToCartInputProps) => {
    const dispatch = useDispatch();

    // ESTADO CANTIDAD DEL INPUT
    const [quantity, setQuantity] = useState<number>(1);

    // HANDLE PARA CAMBIOS EN EL INPUT
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : 1;
        setQuantity(value > 0 ? value : 1);
    };

    // HANDLE PARA AGREGAR CANTIDAD DEL INPUT
    const handleAddToCart = () => {
        if (item) {
            // NUEVO OBJETO CON CANTIDAD
            const cartItem: ICart = {
                ...item,
                cantidad: quantity
            };
            dispatch(addToCart(cartItem));
        }
    };

    return (
        <div className="add-cart-input-container">
            <input
                type="number"
                value={quantity}
                onChange={handleChange}
                min="1"
                className='detail-input'
            />
            <button className='detail-button' onClick={handleAddToCart}>
                Añadir al carrito
            </button>
        </div>
    );
};

export default AddToCartInput;