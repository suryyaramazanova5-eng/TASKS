import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import black from '../assets/black.jpg'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion' // Animasiyalar üçün

function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { t } = useTranslation();

  const logUser = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email.trim()) newErrors.email = "Email boş ola bilməz"
    if (!pass.trim()) newErrors.pass = "Şifrə boş ola bilməz"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => {
        // Email-i kiçik hərflərlə yoxlayırıq ki, daxiletmə həssaslığı azalsın
        const found = data.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass)

        if (found) {
          // KRİTİK DÜZƏLİŞ: Email-i də localStorage-a yazırıq ki, digər səhifələrdə xəta verməsin
          localStorage.setItem("user", JSON.stringify({
            name: found.name,
            email: found.email,
            phone: found.phone || ""
          }))

          // Navbar və digər komponentləri xəbərdar etmək üçün event tetikləyirik
          window.dispatchEvent(new Event("storage"));

          toast.success("Xoş gəldiniz!", {
            position: "top-center",
            autoClose: 1500,
            theme: "dark",
            transition: Bounce
          })

          setTimeout(() => navigate("/"), 1500)
        } else {
          setErrors({ login: "Email və ya şifrə səhvdir" })
        }
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 font-sans relative overflow-hidden">
      {/* Arxa fon bəzəyi */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-200 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>

      <ToastContainer />
      
      {/* Geri qayıt düyməsi */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-all group z-10"
      >
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        <span className="text-sm font-medium">Geri qayıt</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-w-4xl w-full border border-white"
      >
        {/* Sol tərəf - Şəkil */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url(${black})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-12 left-10 text-white space-y-2">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-light tracking-wide italic"
            >
              Timeless beauty <br/> starts here
            </motion.h2>
            <div className="w-12 h-[2px] bg-pink-500"></div>
          </div>
        </div>

        {/* Sağ tərəf - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{t("19")}</h2>
            <p className="text-gray-500 font-medium">
              {t("20")} 
              <span onClick={() => navigate("/register")} className="text-pink-500 cursor-pointer ml-1 hover:underline decoration-2 underline-offset-4">
                Register              </span>
            </p>
          </div>

          <form onSubmit={logUser} className="flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 ml-1 font-bold">Email</label>
              <input 
                type="email" 
                placeholder="nümunə@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-100'} focus:bg-white focus:border-pink-400 outline-none transition-all shadow-sm`}
              />
              {errors.email && <p className="text-red-500 text-[11px] mt-1 ml-2">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 ml-1 font-bold">Şifrə</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={`w-full p-4 rounded-2xl bg-gray-50 border ${errors.pass || errors.login ? 'border-red-400' : 'border-gray-100'} focus:bg-white focus:border-pink-400 outline-none transition-all shadow-sm`}
              />
              {errors.pass && <p className="text-red-500 text-[11px] mt-1 ml-2">{errors.pass}</p>}
              {errors.login && <p className="text-red-500 text-[11px] mt-1 ml-2 font-bold">{errors.login}</p>}
            </div>

            <button 
              type="submit" 
              className="mt-4 w-full bg-gray-900 text-white p-4 rounded-2xl font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-pink-200 active:scale-95"
            >
              Log in
            </button>
            
           
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login