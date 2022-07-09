import { createSlice } from "@reduxjs/toolkit";

export const preventPlaySlice = createSlice({
    name: 'preventPlay',
    initialState: false,
    reducers:{
        setPreventPlay: (state, actionn) => actionn.payload
    }
})

export const { setPreventPlay } = preventPlaySlice.actions

export default preventPlaySlice.reducer