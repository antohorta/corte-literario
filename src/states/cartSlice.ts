import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../interfaces/ICart";
import { RootState } from "../states/store";

interface CartState {
    items: ICart[];
}

const getInitialState = (): CartState => {
    const savedCart = localStorage.getItem('redux_cart');
    if (savedCart) {
        try {
            return JSON.parse(savedCart);
        } catch (error) {
            console.error("Error parsing cart data from localStorage", error);
            localStorage.removeItem('redux_cart'); // Limpia datos corruptos
        }
    }
    return { items: [] };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<ICart>) => {
            const existingItem = state.items.find(item => item.isbn === action.payload.isbn);
            if (existingItem) {
                existingItem.cantidad += action.payload.cantidad;
            } else {
                state.items.push({ ...action.payload, cantidad: action.payload.cantidad });
            }

        },
        removeFromCart: (state: CartState, action: PayloadAction<string>) => {
            const index = state.items.findIndex(item => item.isbn === action.payload);
            if (index !== -1) {
                if (state.items[index].cantidad > 1) {
                    state.items[index].cantidad -= 1;
                } else {
                    state.items.splice(index, 1);
                }
            }

        },
        removeAllFromCart: (state: CartState, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.isbn !== action.payload);

        },
        clearCart: (state: CartState) => {
            state.items = [];
        }
    },
})

// PARA OBTENER CANTIDAD TOTAL DE PRODUCTOS DEL CARRO
export const selectTotalItems = (state: RootState) =>
    state.cart.items.reduce((total: number, item: ICart) => total + (item.cantidad ?? 0), 0);

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;