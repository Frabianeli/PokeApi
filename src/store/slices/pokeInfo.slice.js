import { createSlice } from "@reduxjs/toolkit";

export const pokeInfoSlice = createSlice({
    name: 'pokeInfo',
    initialState: '',
    reducers:{
        setPokeInfo: (state, actionn) => actionn.payload
    }
})

export const { setPokeInfo } = pokeInfoSlice.actions

export default pokeInfoSlice.reducer