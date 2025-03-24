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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 10.9394L5.63604 4.57539L4.57538 5.63605L10.9393 12L4.57538 18.364L5.63604 19.4246L12 13.0607L18.364 19.4246L19.4246 18.364L13.0607 12L19.4246 5.63605L18.364 4.57539L12 10.9394Z" fill="#D9D9D9" />
                </svg>
            </button>
        </div>
    )
}

export default RemoveAllButton;