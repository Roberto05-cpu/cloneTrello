import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CardContextProvider from './Context/CardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CardContextProvider>
      <App />
    </CardContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
