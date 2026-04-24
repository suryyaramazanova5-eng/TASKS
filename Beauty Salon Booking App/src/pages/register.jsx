import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import re from "../assets/re.jpg"
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [strength, setStrength] = useState("")
  const [strengthScore, setStrengthScore] = useState(0)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { t } = useTranslation();

  const checkStrength = (value) => {
    let score = 0
    if (value.length >= 6) score++
    if (/[A-Z]/.test(value)) score++
    if (/[0-9]/.test(value)) score++
    if (/[^A-Za-z0-9]/.test(value)) score++

    setStrengthScore(score)
    if (score <= 1) setStrength("Zəif")
    else if (score === 2 || score === 3) setStrength("Orta")
    else setStrength("Güclü")
  }

  const addUser = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) newErrors.name = "Ad və Soyad boş ola bilməz"
    if (!email.trim()) newErrors.email = "Email boş ola bilməz"
    if (!pass.trim()) newErrors.pass = "Şifrə boş ola bilməz"
    else if (pass.length < 6) newErrors.pass = "Şifrə ən az 6 simvol olmalıdır"

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
        if (!res.ok) throw new Error("Server xətası")
        return res.json()
      })
      .then(() => {
        toast.success("Qeydiyyat uğurla tamamlandı!", {
          position: "top-center",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        })
        setTimeout(() => navigate("/login"), 1500)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-100 rounded-full blur-[120px] opacity-60"></div>
      
      <ToastContainer />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-w-5xl w-full border border-white relative z-10"
      >
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{t("22")}</h2>
            <p className="text-gray-500 font-medium">
              Already have an account?
              <span onClick={() => navigate("/login")} className="text-pink-500 cursor-pointer ml-2 hover:underline underline-offset-4 decoration-2">
                Log in
              </span>
            </p>
          </div>

          <form onSubmit={addUser} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">Ad Soyad</label>
              <input 
                type="text" 
                placeholder="Məs: Ad Soyad" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                }}
                className={`w-full p-4 rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-400' : 'border-gray-100'} focus:bg-white focus:border-pink-400 outline-none transition-all`}
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">E-poçt</label>
              <input 
                type="email" 
                placeholder="example@gmail.com" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                }}
                className={`w-full p-4 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-100'} focus:bg-white focus:border-pink-400 outline-none transition-all`}
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 font-bold ml-1">Şifrə</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value)
                  checkStrength(e.target.value)
                  if (errors.pass) setErrors(prev => ({ ...prev, pass: "" }))
                }}
                className={`w-full p-4 rounded-2xl bg-gray-50 border ${errors.pass ? 'border-red-400' : 'border-gray-100'} focus:bg-white focus:border-pink-400 outline-none transition-all`}
              />
              
              {pass && (
                <div className="mt-2 px-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className={`flex-1 rounded-full transition-all duration-500 ${
                        strengthScore >= step 
                          ? (strengthScore <= 1 ? "bg-red-400" : strengthScore <= 3 ? "bg-yellow-400" : "bg-emerald-400")
                          : "bg-gray-100"
                      }`}></div>
                    ))}
                  </div>
                  <p className={`text-[10px] mt-1 font-bold uppercase tracking-tighter ${
                    strengthScore <= 1 ? "text-red-400" : strengthScore <= 3 ? "text-yellow-500" : "text-emerald-500"
                  }`}>
                     {strength}
                  </p>
                </div>
              )}
              {errors.pass && <p className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{errors.pass}</p>}
            </div>

            <div className="pt-4 space-y-3">
              <button type="submit" className="w-full bg-gray-900 text-white p-4 rounded-2xl font-bold hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-pink-200 active:scale-95">
                Create account
              </button>
              <button 
                type="button" 
                onClick={() => navigate("/")} 
                className="w-full text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block w-1/2 relative">
          <img src={re} alt="register" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
          <div className="absolute bottom-12 left-10 right-10 text-white">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-light italic leading-tight"
            >
              "Discover your beauty, let it shine!"
            </motion.h2>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register