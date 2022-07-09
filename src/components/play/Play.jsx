import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loading from '../Loading'
import { setPreventPlay } from '../../store/slices/preventPlay.slice'

const Play = () => {

    const [pokemon, setPokemon] = useState()
    const [changePokemon, setChangePokemon] = useState(false)
    const [show, setShow] = useState(false)
    const [res, setRes] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const random = Math.ceil(Math.random() * 300)

    useEffect(() => {

        axios.get(`https://pokeapi.co/api/v2/pokemon/${random}`)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))

    }, [changePokemon])



    const send = (e) => {
        setRes(false)
        e.preventDefault()
        const value = e.target.name.value
        if (value === pokemon.name) {
            setShow(true)

        } else {
            setRes(true)
        }
        clear.reset()
    }


    const change = () => changePokemon ? setChangePokemon(false) : setChangePokemon(true)

    const buttonChange = () => {
        change()
        setShow(false)
        setRes(false)
    }

    const prevent = () => navigate('/pokedex')

    const info = () => {
        if (show) {
            dispatch(setPreventPlay(true))
            navigate(`/pokedex/${pokemon.name}`)
        }
    }

    const clue = () => {
        setRes(false)
        setShow(true)
        clear.reset()
    }


    return (

        <div className='guess'>
            <div className='header-play'>
                <h2>Guess the pokemon</h2>
                <p>-If your answer is correct you can, you can get more information by clicking on the pokemon.</p>
                <p>-You can get the result by clicking on the eye.</p>
                <p>-If you don't know the pokemon, you can go to the next one by pressing the upper right button.</p>
            </div>
            <div className='container-play'>
                <div className='play'>
                    <div className='container-screen'>
                        <div className='screen' onClick={info}>
                            <div className='img-guess'>
                                {pokemon ?
                                    <img className={show ? 'pokemon-play show' : 'pokemon-play'}
                                        src={pokemon?.sprites.other['official-artwork'].front_default}
                                         alt={pokemon?.name} 
                                    />
                                    : <Loading />
                                }
                            </div>
                        </div>
                        <div className='response'>
                            <h3>
                                {show && "it's " + pokemon.name + ', click on the pokemon for more info'} 
                                {res && 'wrong, keep trying'}
                            </h3>
                            {
                                show ?
                                    <button onClick={buttonChange} className='next'>
                                        <i className="fa-solid fa-forward-step"></i>
                                    </button>
                                    :
                                    <form onSubmit={send} id='clear'>
                                        <input type="text" name='name' />
                                        <button>Submit</button>
                                    </form>
                            }
                        </div>
                    </div>
                    <button className='change' onClick={buttonChange}>
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button className='prevent' onClick={prevent}>
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </button>
                    <button className='clue' onClick={clue}>
                        <i className="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Play