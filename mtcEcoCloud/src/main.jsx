import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import Authorization from './Authorization.jsx'
import './css/index.css'
import './css/null.css'


createRoot(document.getElementById('root')).render(
  <App />
)
