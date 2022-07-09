import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setPreventPlay } from '../../store/slices/preventPlay.slice'

const PokemonInfo = () => {
    const [pokemon, setPokemon] = useState()
    const { name } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const poke = useSelector(state => state.pokeInfo)
    const prevent = useSelector(state => state.preventPlay)



    useEffect(() => {
        if (!name) {
            setPokemon(poke)
        } else {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(res => setPokemon(res.data))
                .catch(err => console.log(err))
        }
    }, [name])

    const preventPokedex = () => {
        navigate('/pokedex')
    }
    const preventPlay = () => {
        navigate('/play'),
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
        <div>
            <div className={`poke-info type-${type1}`}>
                <div className='info-small'>
                    <div className='header-info'>
                        <div className='background-info'>
                            <div>
                                <button className={`bg-color-${type1}`} onClick={prevent ? preventPlay : preventPokedex}>
                                    <i className="fa-solid fa-arrow-left-long"></i>
                                    {prevent ? 'Play' : 'Pokedex'}
                                </button>
                            </div>
                            <div className='background-animation'>
                                <img className={`bg-img-${type1}`} src={image} alt={`image ${pokemon?.name}`} />
                            </div>
                            <h2 className={`text-info-${type1}`}>{pokemonName}</h2>
                            <div className='container-type-info'>
                                {
                                    pokemon?.types.map(type => (
                                        <div className={`bg-color-${type.type.name}`} key={type.type.name}>
                                            <h5>{type.type.name}</h5>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='container-body'>
                            <div className='container-h-k'>
                                <div className='container-h'>
                                    <h3>Height</h3>
                                    <p className={`text-info-${type1}`}>{pokemon?.height / 10} M</p>
                                </div>
                                <div className='container-w'>
                                    <h3>Weight</h3>
                                    <p className={`text-info-${type1}`}>{pokemon?.weight / 10} KG</p>
                                </div>
                            </div>
                            <div className='container-abilities'>
                                <h3>Abilities</h3>
                                <div className='abilities'>
                                    {pokemon?.abilities.map(poke =>
                                        <p key={poke.ability.name} className={`text-info-${type1}`}>
                                            {poke.ability.name.toUpperCase()}
                                        </p>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container-info-stat'>
                        <h3 className={`text-info-${type1}`}>Base Stats</h3>
                        <div className='container-progress'>
                            <div className="progress">
                                <h5>HP:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[0].base_stat / 3}%` }}>
                                        {pokemon?.stats[0].base_stat}
                                    </span>
                                </div>
                            </div>
                            <div className="progress">
                                <h5>ATACCK:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[1].base_stat / 3}%` }}>
                                        {pokemon?.stats[1].base_stat}
                                    </span>
                                </div>
                            </div>
                            <div className="progress">
                                <h5>DEFENSE:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[2].base_stat / 3}%` }}>
                                        {pokemon?.stats[2].base_stat}
                                    </span>
                                </div>
                            </div>
                            <div className="progress">
                                <h5>SPEED:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[5].base_stat / 3}%` }}>
                                        {pokemon?.stats[5].base_stat}
                                    </span>
                                </div>
                            </div>
                            <div className="progress">
                                <h5>SPECIL  ATACCK:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[3].base_stat / 3}%` }}>
                                        {pokemon?.stats[3].base_stat}
                                    </span>
                                </div>
                            </div>
                            <div className="progress">
                                <h5>SPECIAL DEFENSE:</h5>
                                <div className="progress-bar color stripes shine">
                                    <span style={{ width: `${pokemon?.stats[4].base_stat / 3}%` }}>
                                        {pokemon?.stats[4].base_stat}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo