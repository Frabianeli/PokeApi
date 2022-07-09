import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameGlobal } from '../../store/slices/nameUser.slice'
import title from '../assets/loggin-img/text.pokemon.png'
import ashPokemones from '../assets/loggin-img/ash-pokemones.png'


const Loggin = () => {

  const [logginFalse, setLogginFalse] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
   
  const submit = e => {
    e.preventDefault()
    const name = e.target.name.value
    if(name.length > 3){
      localStorage.setItem('name', name)
      dispatch(setNameGlobal(localStorage.getItem('name')))
      navigate('/pokedex')
    } else {
      setLogginFalse(true)
    }
    user.reset()
  }
  return (
    <div className='loggin'>
      <div className='container-loggin'>
        <div className='loggin-title'>
          <img className='pokemon' src={title} alt="pokemon" />
        </div>
        <div className='poke-logo'>
          <img  src={ashPokemones} alt="pokemon" />
        </div>
        <h2>Hello coach, please to begin put your name</h2>
        <form onSubmit={submit} id='user'>
          <input type="text" name='name' placeholder='name'/>
          <button>Submit</button>
        </form>
        {
          logginFalse && <p>Please, minimum 3 characters</p>
        }
      </div>
    </div>
  )
}

export default Loggin