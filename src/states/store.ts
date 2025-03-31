import { configureStore, Middleware } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { genreReducer } from "./genreSlice"

const persistedCartState: Middleware = store => next => action => {

    next(action);
    const state = store.getState();

    const stateAsJson = JSON.stringify(state.cart);
    localStorage.setItem('redux_cart', stateAsJson);
}
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        genre: genreReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistedCartState),
})

export type RootType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;