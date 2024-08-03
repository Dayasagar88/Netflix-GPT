import { createSlice } from "@reduxjs/toolkit";

const GptSearchSlice = createSlice({
    name: "GPT Search",
    initialState : {
        gptSearch : false,
    },
    reducers:{
        toggleGptSearch: (state) => {
            state.gptSearch = !state.gptSearch
        }
    }
})

export default GptSearchSlice.reducer;

export const {toggleGptSearch}  = GptSearchSlice.actions