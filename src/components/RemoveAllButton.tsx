import { useDispatch, useSelector } from 'react-redux';
import { removeAllFromCart } from '../states/cartSlice';
import { RootType } from '../states/store';

interface RemoveAllButtonProps {
    isbn: string;
}

const RemoveAllButton = (props: RemoveAllButtonProps) => {
    const dispatch = useDispatch();
    const item = useSelector((state: RootType) =>
        state.cart.items.find((item) => item.isbn === props.isbn));

    const handleRemoveAll = () => {
        if (item) {
            dispatch(removeAllFromCart(item.isbn));
        }
    };

    return (
        <div>
            <button onClick={handleRemoveAll} className='delete-button'>
                Eliminar
            </button>
        </div>
    )
}

export default RemoveAllButton;