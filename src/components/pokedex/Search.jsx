import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../store/slices/search.slice'

const Search = ({ setPokemonType }) => {

  const dispatch = useDispatch()

  const search = useSelector(state => state.search)

  const submit = (e) => {
    e.preventDefault()
    let value = e.target.name.value.toLowerCase()
    if (value) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then(res => dispatch(setSearch((res.data.name))))
        .catch(err => console.log(err))
    }
    setPokemonType(null)
    form.reset()
  }

  const prevent = () => dispatch(setSearch(null))

  return (
    <div className='search'>
      {
        search &&
        <button className='prevent-search' onClick={prevent}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
      }
      <form onSubmit={submit} id='form'>
        <input type="text" name='name' placeholder='name' />
        <button>Search</button>
      </form>
    </div>
  )
}

export default Search