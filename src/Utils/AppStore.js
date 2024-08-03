import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import moviesReducer from "./MoviesSlice"
import GptSearchReducer from "./GptSearchSlice";
import ConfigSliceReducer from "./ConfigSlice";
import suggestMoviesSliceReducer from "./suggestMoviesSlice"

const AppStore = configureStore({
    reducer:{
        user: userReducer,
        movies : moviesReducer,
        gptSearch : GptSearchReducer,
        config : ConfigSliceReducer,
        suggestMovie: suggestMoviesSliceReducer
    }
});

export default AppStore;