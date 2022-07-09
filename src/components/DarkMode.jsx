import React from 'react'
import { useDispatch } from 'react-redux'
import { setDarkMode } from '../store/slices/darkMode.slice'

const DarkMode = () => {
    
    const dispatch = useDispatch()

    const dark = () => {
        dispatch(setDarkMode('dark-mode'))
    }
    const sure = () => {
        dispatch(setDarkMode(''))
    }
  return (
        <div className='container-dark-mode'>
            <div>
                <button className='btn-sure' onClick={sure}><i className="fa-solid fa-sun"></i></button>
            </div>
            <div>
                <button className='btn-dark' onClick={dark}><i className="fa-solid fa-moon"></i></button>
            </div>
        </div>
  )
}

export default DarkMode