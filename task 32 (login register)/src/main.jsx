import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './layout/layout.jsx'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'

createRoot(document.getElementById('root')).render(


  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} >
        <Route element={<Home />} index />
        <Route element={<Login />} path='login' />
        <Route element={<Register />} path='register' />
      </Route>
    </Routes>
  </BrowserRouter >

)
