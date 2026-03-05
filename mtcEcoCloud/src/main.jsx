import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,  Routes, Route  } from 'react-router-dom'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Authorization from './Authorization'
import Dashboard from './Dashboard'
import Tenants from './Dashboard'
import './css/index.css'
import './css/null.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route 
        path="/" 
        element={<App />}
        />
        <Route 
        path="/admin" 
        element={<Admin />}
        />
        <Route 
        path="/l" 
        element={<Authorization />}
        />
        <Route 
        path="/dashboard" 
        element={<Dashboard />}
        />
    </Routes>
  </BrowserRouter>
)