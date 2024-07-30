import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
    name: "Movies",
    initialState: {
        nowPlayingMovies : null,
        trailer: null
    },
    reducers: {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        }
    }
})

export default MoviesSlice.reducer;

export const { addNowPlayingMovies, addTrailer } = MoviesSlice.actions