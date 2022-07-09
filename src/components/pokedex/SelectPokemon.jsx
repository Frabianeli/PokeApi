import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../store/slices/search.slice'

const SelectPokemon = ({ setPokemonType, setPokemons }) => {
  const types = ["normal", "fighting", "flying", "poison", "ground",
    "rock", "bug", "ghost", "steel", "fire", "water", "grass",
    "electric", "psychic", "ice", "dragon", "dark", "fairy",
    "unknown", "shadow"]

  const dispatch = useDispatch()


  const select = () => {
    const value = selectTypes.options[selectTypes.selectedIndex].value
    setPokemons(null)
    setPokemonType(value)
    dispatch(setSearch(null))
    reset()
  }


  return (
    <div className='container-select'>
      <select onChange={select} id='selectTypes' >
        <option value=''>All pokemon</option>
        {types.map(type => (<option key={type} value={type}>{type}</option>))}
      </select>
    </div>
  )
}

export default SelectPokemon
