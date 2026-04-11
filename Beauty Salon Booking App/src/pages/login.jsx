import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import black from '../assets/black.jpg'

function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const logUser = (e) => {
    e.preventDefault()

    const newErrors = {}

    if (!email.trim()) newErrors.email = "Email boş ola bilməz"
    if (!pass.trim()) newErrors.pass = "Password boş ola bilməz"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => {
        const found = data.find(u => u.email === email && u.pass === pass)

        if (found) {

          // 🔥 ƏN VACİB HİSSƏ
          localStorage.setItem("user", JSON.stringify({
            name: found.name
          }))

          toast.success("Xoş gəldiniz!", {
            position: "top-center",
            autoClose: 2000,
            theme: "colored",
            transition: Bounce
          })

          setTimeout(() => navigate("/"), 2000)

        } else {
          setErrors({ login: "Email və ya şifrə səhvdir" })
        }
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <i className="fa-solid fa-arrow-left text-3xl cursor-pointer" onClick={() => navigate("/")}></i>
      <ToastContainer />

      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">

        <div className="hidden md:flex w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${black})` }}>
          <div className="absolute bottom-10 left-8 text-white">
            <h2 className="text-2xl font-semibold">Timeless beauty starts here</h2>
            <h2 className="text-2xl font-semibold">Because you deserve to shine</h2>
          </div>
        </div>

        <form onSubmit={logUser} className="w-full md:w-1/2 p-10 flex flex-col gap-4">

          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>

          <p className="text-gray-500 text-sm">
            Hesabınız yoxdur?
            <span onClick={() => navigate("/register")} className="text-pink-500 cursor-pointer ml-2">
              Register
            </span>
          </p>

          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md"
          />

          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="password" placeholder="Password" value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border p-3 rounded-md"
          />

          {errors.pass && <p className="text-red-500 text-sm">{errors.pass}</p>}
          {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}

          <button type="submit" className="bg-pink-500 text-white p-3 rounded-md cursor-pointer">
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login