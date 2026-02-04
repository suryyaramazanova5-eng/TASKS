import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <div className='flex gap-[40px] text-[violet] text-[25px] m-[15px] '>
      <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  )
}

export default Navbar
