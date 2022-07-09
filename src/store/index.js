import { configureStore } from "@reduxjs/toolkit";
import nameUser from './slices/nameUser.slice'
import pokeInfo from './slices/pokeInfo.slice'
import search from './slices/search.slice'
import darkMode from './slices/darkMode.slice'
import preventPlay from './slices/preventPlay.slice'

export default configureStore({
    reducer: {
        nameUser,
        pokeInfo,
        search,
        darkMode,
        preventPlay
    }
})