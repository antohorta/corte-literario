import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GenreState {
    selectedGenre: string | null;
}

const initialState: GenreState = {
    selectedGenre: null,
};

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setGenre: (state, action: PayloadAction<string | null>) => {
            state.selectedGenre = action.payload;
        },
    },
});

export const { setGenre } = genreSlice.actions;
export const genreReducer = genreSlice.reducer;