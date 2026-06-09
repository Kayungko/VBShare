import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/App'
import { ensureFreshAppVersion } from './lib/appVersion'
import './styles/theme.css'
import './styles/deck.css'
import './styles/animations.css'

if (ensureFreshAppVersion()) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
