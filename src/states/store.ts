import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { genreReducer } from "./genreSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        genre: genreReducer,
    }
})

export type RootType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;