
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Loggin from './components/loggin/Loggin'
import Home from './components/pokedex/Home'
import Error404 from './components/Error404'
import PokemonInfo from './components/poke-info/PokemonInfo'
import ProtectedRoutes from './components/ProtectedRoutes'
import Play from './components/play/Play'
import { useSelector } from 'react-redux'


function App() {


  const darkMode = useSelector(state => state.darkMode)

  return (
    <div className={darkMode}>
      <Routes>
        <Route path='/' element={<Loggin />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/pokedex'>
            <Route path=':name' element={<PokemonInfo />} /> 
            <Route index element={<Home />}/>
            <Route path='*' element={<Error404 />}/>
          </Route>
          <Route path='play' element={<Play />}/>
          <Route path='*' element={<Error404 />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
