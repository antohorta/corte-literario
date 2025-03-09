import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart } from "../interfaces/ICart";

interface CartState {
    items: ICart[];
    totalItems: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICart>) => {
            state.items.push(action.payload);
            state.totalItems += action.payload.cantidad;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(item => item.isbn === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
                state.totalItems = state.items.reduce((total, item) => total + item.cantidad, 0);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
        }
    },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;