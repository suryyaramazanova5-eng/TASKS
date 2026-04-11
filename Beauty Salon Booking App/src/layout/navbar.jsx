import React, { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/logo.jpg"
import { useTranslation } from "react-i18next"

function Navbar() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  const [activeTab, setActiveTab] = useState("profile")
  const [bookings, setBookings] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })

  const navigate = useNavigate()
  const location = useLocation() // 🔥 əlavə olundu

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value)
  }

  const getNavbarBg = () => {
    if (location.pathname === "/") {
      return scrolled ? "bg-pink-600/90 shadow-lg" : "bg-transparent"
    }
    if (location.pathname === "/booking") {
      return scrolled ? "bg-purple-300 shadow-lg" : "bg-transparent"
    }
    if (location.pathname === "/contact") {
      return scrolled ? "bg-blue-400 shadow-lg" : "bg-transparent"
    }
    if (location.pathname === "/services") {
      return scrolled ? "bg-pink-400 shadow-lg" : "bg-transparent"
    }
    if (location.pathname === "/opp") {
      return scrolled ? "bg-black shadow-lg " : "bg-transparent"
    }
    
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)

    const getData = () => {
      const savedUser = localStorage.getItem("user")
      setUser(savedUser ? JSON.parse(savedUser) : null)

      const savedBookings = localStorage.getItem("bookings")
      setBookings(savedBookings ? JSON.parse(savedBookings) : [])
    }

    getData()
    window.addEventListener("storage", getData)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", getData)
    }
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || ""
      })
    }
  }, [user])

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData))
    setUser(formData)
    setShowProfile(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setShowProfile(false)
    navigate("/")
  }

  const userBookings = bookings.filter(
    (b) => String(b.userEmail) === String(user?.email)
  )

  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index)
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getNavbarBg()}`}>
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 py-3 md:py-4">

          <Link to="/">
            <img src={logo} className="w-[120px]" alt="logo" />
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
            <li><Link to="/">{t("home")}</Link></li>
            <li><Link to="/booking">{t("booking")}</Link></li>
            <li><Link to="/contact">{t("contact")}</Link></li>
            <li><Link to="/about ">About</Link></li>

            <li>
              <select onChange={changeLang} value={i18n.language} className="bg-transparent px-2 py-1 rounded border">
                <option value="az" className="text-pink-500">AZ</option>
                <option value="en" className="text-pink-500">EN</option>
              </select>
            </li>

            <li>
              {user ? (
                <div
                  onClick={() => {
                    setShowProfile(true)
                    setActiveTab("profile")
                  }}
                  className="w-10 h-10 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
              ) : (
                <Link to="/login">
                  <i className="fa-solid fa-user text-2xl hover:text-pink-500"></i>
                </Link>
              )}
            </li>
          </ul>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <i className="fa-solid fa-x text-white text-xl cursor-pointer"></i> : <i className="fa-solid fa-bars text-white text-2xl cursor-pointer"></i>}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-pink-500 text-white flex flex-col items-center gap-6 py-6">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/booking" onClick={() => setIsOpen(false)}>Booking</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>


          {user ? (
            <div
              onClick={() => {
                setShowProfile(true)
                setActiveTab("profile")
                setIsOpen(false)
              }}
              className="w-12 h-12 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user text-2xl"></i>
            </Link>
          )}
        </div>
      )}

      {showProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">

          <div className="w-[900px] h-[550px] bg-[#1e1e1e] rounded-xl flex overflow-hidden relative">

            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-4 text-white text-xl cursor-pointer"
            >
              <i className="fa-solid fa-x" />
            </button>

            <div className="w-[30%] bg-[#151515] p-6 flex flex-col items-center text-white">
              <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-2xl font-bold">
                {formData.name?.charAt(0)?.toUpperCase()}
              </div>

              <h2 className="mt-3 font-semibold">{formData.name}</h2>
              <p className="text-sm text-gray-400">{formData.email}</p>

              <button onClick={() => setActiveTab("profile")} className="mt-8 border-pink-500 hover:bg-pink-500 cursor-pointer border w-full py-2 rounded">
                Profil
              </button>

              <button onClick={() => setActiveTab("bookings")} className="mt-3 border border-pink-500  hover:bg-pink-500 cursor-pointer w-full py-2 rounded">
                Rezervlərim
              </button>

              <button className="mt-auto ">
                Çıxış
                
              </button>
              <i className="fa-solid fa-right-to-bracket cursor-pointer" onClick={handleLogout}></i>
            </div>

            <div className="w-[70%] p-8 text-white">

              {activeTab === "profile" && (
                <>
                  <h2 className="text-xl font-semibold mb-6">Profil</h2>

                  <div className="flex gap-2">
                    <input
                      className="bg-[#2a2a2a] p-2 rounded w-70 mb-3"
                      value={formData.name}
                      placeholder=""
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <input
                      className="bg-[#2a2a2a] p-2 rounded w-70 mb-3"
                      value={formData.phone}
                      placeholder="Phone"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <input
                    className="bg-[#2a2a2a] p-2 rounded w-full mb-3 opacity-70 cursor-not-allowed"
                    value={formData.email}
                    placeholder="email"
                    readOnly
                  />

                  <textarea
                    className="bg-[#2a2a2a] p-2 rounded w-full"
                    value={formData.address}
                    placeholder="Adress"
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />

                  <button onClick={handleSave} className="mt-4 text-red-500 px-4 py-2 rounded cursor-pointer">
                    Dəyişiklikləri yadda saxlayın
                  </button>
                </>
              )}

              {activeTab === "bookings" && (
                <>
                  <h2 className="text-xl font-semibold mb-6">Rezervlərim</h2>

                  {userBookings.length === 0 ? (
                    <p className="text-gray-400">Heç rezerv yoxdur</p>
                  ) : (
                    <div className="space-y-3">
                      {userBookings.map((b, i) => (
                        <div key={i} className="bg-[#2a2a2a] p-3 rounded">
                          <p><b>Xidmət:</b> {b.service}</p>
                          <p><b>Tarix:</b> {b.date}</p>
                          <p><b>Saat:</b> {b.time}</p>
                          <p
                            className="text-red-500 cursor-pointer"
                            onClick={() => deleteBooking(i)}
                          >
                            Ləğv et
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar