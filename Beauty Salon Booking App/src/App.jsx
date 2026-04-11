import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import Services from "./pages/services"
import Bookings from "./pages/booking"
import Contact from "./pages/contact"
import Register from "./pages/register"
import Login from "./pages/login"
import Layout from "./layout/layout"
import Admin from "./pages/admin"
import "./i18n"
import About from "./pages/about"
import Opp from "./pages/opp"
import Services1 from "./pages/services1"



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route  element={<Home />} path="/"  />
            <Route element={<Services />} path="/services" />
            <Route element={<Bookings />} path="/booking" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Admin />} path="/admin" />
            <Route element={<About />} path="/about"/>
            <Route element={<Opp/>} path="/opp"/>
            <Route element={<Services1/>} path="/services1"/>
          </Route>
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>



    </div>
  )
}

export default App
