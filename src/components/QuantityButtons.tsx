import { useDispatch, useSelector } from 'react-redux';
import '../styles/quantity-buttons.css'
import { RootType } from '../states/store';
import { addToCart, removeFromCart } from '../states/cartSlice';


interface QuantityButtonsProps {
    isbn: string;
}

const QuantityButtons = (props: QuantityButtonsProps) => {

    const handleIncrement = () => {
        if (item) {
            dispatch(addToCart({ ...item, cantidad: item.cantidad + 1 }));
        }
    }

    const handleDecrement = () => {
        if (item && item.cantidad > 1) {
            dispatch(addToCart({ ...item, cantidad: item.cantidad - 1 }));
        } else {
            dispatch(removeFromCart(item.isbn));
        }
    }
    const dispatch = useDispatch();
    const item = useSelector((state: RootType) =>
        state.cart.items.find((item) => item.isbn === props.isbn));

    return (
        <div className="quantity-buttons-container">
            <button onClick={handleIncrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.25 12.75V21.75H12.75V12.75H21.75V11.25H12.75V2.25L11.25 2.25V11.25H2.25V12.75H11.25Z" fill="#A2A2A4" />
                </svg>
            </button>
            <span>{item ? item.cantidad : 0}</span>
            <button onClick={handleDecrement}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 11.25H21.75V12.75H2.25V11.25Z" fill="#A2A2A4" />
                </svg>
            </button>
        </div>
    )
}

export default QuantityButtons;