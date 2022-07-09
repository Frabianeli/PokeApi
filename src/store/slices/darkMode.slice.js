import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: '',
    reducers:{
        setDarkMode: (state, actionn) => actionn.payload
    }
})

export const { setDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer