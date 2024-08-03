import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
    name: "Movies",
    initialState: {
        nowPlayingMovies : null,
        trendingMovies: null,
        upComingMovies : null,
        topRatedMovies : null,
        trailer: null,
        newTrailer: null,
    },
    reducers: {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrendingMovies:(state , action) => {
            state.trendingMovies = action.payload;
        },
        addUpComingMovies:(state , action) => {
            state.upComingMovies = action.payload;
        },
        addTopRatedMovies:(state , action) => {
            state.topRatedMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
        updateTrailer: (state, action) => {
            state.newTrailer = action.payload;
        } 

    }
})

export default MoviesSlice.reducer;

export const { addNowPlayingMovies,updateTrailer, emptyTrailer,  addTrailer , addTrendingMovies, addUpComingMovies , addTopRatedMovies } = MoviesSlice.actions