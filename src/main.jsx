import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// CSS
import '../src/styles/colorsType.css'
import '../src/styles/darkMode.css'
import '../src/styles/mediaQuery.css'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// HASH ROUTER
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
)
