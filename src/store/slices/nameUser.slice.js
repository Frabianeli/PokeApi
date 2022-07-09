import { createSlice } from "@reduxjs/toolkit";

export const nameUserSlice = createSlice({
    name: 'nameUser',
    initialState: localStorage.getItem('name'),
    reducers:{
        setNameGlobal: (state, actionn) => actionn.payload
    }
})

export const { setNameGlobal } = nameUserSlice.actions

export default nameUserSlice.reducer