import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})

export type RootType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;