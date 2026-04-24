import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import re from "../assets/re.jpg"
import { useTranslation } from 'react-i18next'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [strength, setStrength] = useState("")
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
     const { t } = useTranslation();
  

  const checkStrength = (value) => {
    let score = 0
    if (value.length >= 6) score++
    if (/[A-Z]/.test(value)) score++
    if (/[0-9]/.test(value)) score++
    if (/[^A-Za-z0-9]/.test(value)) score++

    if (score <= 1) setStrength("Weak")
    else if (score === 2 || score === 3) setStrength("Medium")
    else setStrength("Strong")
  }

  const addUser = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) newErrors.name = "Full name boş ola bilməz"
    if (!email.trim()) newErrors.email = "Email boş ola bilməz"
    if (!pass.trim()) newErrors.pass = "Password boş ola bilməz"
    else if (pass.length < 6) newErrors.pass = "Password ən az 6 simvol olmalıdır"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, pass })
    })
      .then(res => {
        if (!res.ok) throw new Error("Server error")
        return res.json()
      })
      .then(() => {
        toast.success("Qeydiyyat uğurla tamamlandı", {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        })
        setTimeout(() => navigate("/"), 2000)
      })
  }

  return (
    <div className="flex h-screen ">
      <div className="flex-1 flex items-center justify-center">
        <form 
          onSubmit={addUser} 
          className="w-full max-w-md p-6  flex flex-col gap-4 bg-white/90 shadow-lg relative"  >
          <h2 className="text-3xl font-bold text-center">{t("22")}</h2>

          <input  
            type="text"  
            placeholder="Full name"  
            value={name}  
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
            }} 
            className="rounded-lg border p-3 outline-none" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input  
            type="email"  
            placeholder="Email"  
            value={email}  
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
            }} 
            className="rounded-lg border p-3 outline-none"  />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input  
            type="password"  
            placeholder="Password"  
            value={pass}  
            onChange={(e) => {
              setPass(e.target.value)
              checkStrength(e.target.value)
              if (errors.pass) setErrors(prev => ({ ...prev, pass: "" }))
            }} 
            className="rounded-lg border p-3 outline-none"  />
          {errors.pass && <p className="text-red-500 text-sm">{errors.pass}</p>}

          {strength && <p className={strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : "text-green-500"}>{strength}</p>}

          <div className="flex justify-between text-sm">
            <span>{t("21")}</span>
            <span onClick={() => navigate("/login")} className="text-pink-600 cursor-pointer">Login</span>
          </div>

          <button type="submit" className="border border-pink-300 text-pink-600 py-2 rounded-full hover:bg-pink-400 hover:text-white duration-300 cursor-pointer">Create</button>

          <button type="button" onClick={() => navigate("/")} className="bg-pink-500 cursor-pointer text-white py-2 rounded-full">Cancel</button>
        </form>
      </div>

      <div className="flex hidden md:flex">
        <img src={re} alt="register" className="w-full h-full " />
         <div className="absolute bottom-10 left-8 text-gray-500">
            <h2 className="text-3xl font-semibold"> "Discover your beauty, let yourself shine!"  </h2>
          </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
        transition={Bounce} />
    </div>
  )
}

export default Register