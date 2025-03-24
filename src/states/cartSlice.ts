import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../interfaces/ICart";
import { RootState } from "../states/store";

interface CartState {
    items: ICart[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<ICart>) => {
            const existingItem = state.items.find(item => item.isbn === action.payload.isbn);
            if (existingItem) {
                existingItem.cantidad += 1;
            } else {
                state.items.push({ ...action.payload, cantidad: 1 });
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

// Selector para obtener la cantidad total de productos en el carrito
export const selectTotalItems = (state: RootState) =>
    state.cart.items.reduce((total: number, item: ICart) => total + (item.cantidad ?? 0), 0);

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;