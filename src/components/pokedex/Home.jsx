import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'
import Search from './Search'
import SelectPokemon from '../pokedex/SelectPokemon'
import DarkMode from '../DarkMode'
import ash from '../assets/pokedex-img/ash.png'
import pokedex from '../assets/pokedex-img/pokedex.webp'
import pokedexDark from '../assets/pokedex-img/pokedex-dark.png'
import Pagination from './Pagination'
import { setNameGlobal } from '../../store/slices/nameUser.slice'


const urlTypes = `https://pokeapi.co/api/v2/type`

const Home = () => {
  const navigate = useNavigate()
  const [pokemons, setPokemons] = useState()
  const [pokemonType, setPokemonType] = useState()


  const nameUser = useSelector(state => state.nameUser)
  const dispatch = useDispatch()

  const goToLoggin = () => {
    navigate('/')
    localStorage.clear()
    dispatch(setNameGlobal(null))
  }

  const search = useSelector(state => state.search)


  let urlSearch = `https://pokeapi.co/api/v2/pokemon/${search}`

  const [currentPage, setCurrentPage] = useState(1)

  const darkMode = useSelector(state => state.darkMode)

  useEffect(() => {
    if (!pokemonType) {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    } else {
      axios.get(`${urlTypes}/${pokemonType}/`)
        .then(res => {
          setPokemons(res.data.pokemon)
          setCurrentPage(1)
        })
        .catch(err => console.log(err))
    }
  }, [pokemonType])

  const toPlay = () => navigate('/play')
  console.log(currentPage)


  const getPoke = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
      .then(res => setPokemons(res.data.results))
      .catch(err => console.log(err))
  }



  let arrayPokemon = []
  const pokemonPerPage = 24

  if (pokemons?.length < pokemonPerPage && pokemons) {
    arrayPokemon = [...pokemons]
  } else {
    const lastPokemon = currentPage * pokemonPerPage
    arrayPokemon = pokemons?.slice(lastPokemon - pokemonPerPage, lastPokemon)
  }

  let arrayPages = []
  let quantityPages = Math.ceil(pokemons?.length / pokemonPerPage)
  const pagesPerBlock = 5
  let currentBlock = Math.ceil(currentPage / pagesPerBlock)
  if (currentBlock * pagesPerBlock >= quantityPages) {
    for (let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= quantityPages; i++) {
      arrayPages.push(i)
    }
  } else {
    for (let i = currentBlock * pagesPerBlock - pagesPerBlock + 1; i <= currentBlock * pagesPerBlock; i++) {
      arrayPages.push(i)
    }
  }

  console.log(arrayPokemon)
  return (
    <div className='home'>
      <div className='header'>
        <div className='title'>
          <img src={darkMode ? pokedexDark : pokedex} alt="pokemon" />
        </div>
        <div className='welcome'>
          <img src={ash} alt="" />
          <h2>
            Welcome trainer <span> {nameUser}</span> please choose your pokemons,
            you can click to see more information
          </h2>
        </div>
        <Search setPokemonType={setPokemonType} />
        <SelectPokemon 
          setPokemonType={setPokemonType}
           setPokemons={setPokemons}
        />
        <div className='container-button'>
          <button onClick={goToLoggin} className='singOff'>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <button className='to-play' onClick={toPlay}>PLay</button>
          <DarkMode />
        </div>
      </div>
      {
        !search &&
        <Pagination
          arrayPages={arrayPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityPages={quantityPages}
          currentBlock={currentBlock}
        />
      }
      <article className='container-card'>
        {!pokemonType && !search ?
          arrayPokemon?.map(pokemon => <PokemonCard key={pokemon.name} url={pokemon.url} />)
          : search ?
            <PokemonCard url={urlSearch} />
            : arrayPokemon?.map(poke => <PokemonCard key={poke.pokemon.name} url={poke.pokemon.url} />)}
      </article>
      {
        !search &&
        <Pagination
          arrayPages={arrayPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityPages={quantityPages}
          currentBlock={currentBlock}
        />
      }
    </div>
  )
}

export default Home