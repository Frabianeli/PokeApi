import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPokeInfo } from '../../store/slices/pokeInfo.slice'
import Loading from '../Loading'
import { setPreventPlay } from '../../store/slices/preventPlay.slice'



const PokemonCard = ({ url }) => {

  const [pokemon, setPokemon] = useState()

  const search = useSelector(state => state.search)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))

  }, [search])

  const pokemonInfo = () => {
    dispatch(setPokeInfo(url))
    navigate(`/pokedex/${pokemon.name}`)
    dispatch(setPreventPlay(false))
  }

  let pokemonName;
  let type1;
  let image;

  if (pokemon) {
    pokemonName = pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)
    type1 = pokemon?.types[0].type.name
    image = pokemon?.sprites.other['official-artwork'].front_default
  }

  return (

    <>
      <div className={`card ${type1}`} onClick={pokemonInfo}>
        <div className='container-img'>
          {
            pokemon ?
              <img src={image} alt={`image ${pokemonName}`} />
              :
              <Loading />
          }
          <h2 className={`text-${type1}`}>{pokemonName}</h2>
        </div>
        <div className='container-content'>
          <p className='p-lead'>type</p>
          <h3 className={`text-${type1}`}>
            {type1}{pokemon?.types[1] && ` / ${pokemon.types[1].type.name}`}
          </h3>
          <div className='container-stats'>
            <div className='stat'>
              <h4>HP:</h4>
              <p className={`text-${type1}`}>{pokemon?.stats[0].base_stat}</p>
            </div>
            <div className='stat'>
              <h4>ATACCK:</h4>
              <p className={`text-${type1}`}>{pokemon?.stats[1].base_stat}</p>
            </div>
            <div className='stat'>
              <h4>DEFENSE:</h4>
              <p className={`text-${type1}`}>{pokemon?.stats[2].base_stat}</p>
            </div>
            <div className='stat'>
              <h4>SPEED:</h4>
              <p className={`text-${type1}`}>{pokemon?.stats[5].base_stat}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonCard