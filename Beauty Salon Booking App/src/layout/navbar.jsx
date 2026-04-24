import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"; // Animasiyalar üçün

function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const getNavbarBg = () => {
    if (scrolled) return "bg-black/80 backdrop-blur-md shadow-lg py-2";
    return "bg-transparent py-4";
  };

  const getData = () => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    setUser(parsedUser);
    const savedBookings = localStorage.getItem("bookings");
    setBookings(savedBookings ? JSON.parse(savedBookings) : []);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    getData();
    window.addEventListener("storage", getData);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", getData);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user?.email) {
      setMessages([]);
      return;
    }
    fetch("http://localhost:3001/messages")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (m) => m.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
        );
        setMessages(filtered);
      })
      .catch((err) => console.log("Hata:", err));
  }, [user?.email, showProfile]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    navigate("/");
  };

  const userBookings = bookings.filter((b) => {
    const bEmail = (b.userEmail || b.email || "").toString().toLowerCase().trim();
    const uEmail = user?.email?.toString().toLowerCase().trim();
    return bEmail === uEmail;
  });

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${getNavbarBg()}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link to="/" className="relative z-[110]">
            <img src={logo} className="w-[100px] md:w-[130px] rounded-lg" alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-white text-sm tracking-widest uppercase font-light">
            {["home", "booking", "contact", "abt"].map((item) => {
              const paths = { home: "/", booking: "/booking", contact: "/contact", abt: "/about" };
              return (
                <li key={item}>
                  <Link
                    to={paths[item]}
                    className={`hover:text-pink-400 transition-colors relative group ${isActive(paths[item]) ? "text-pink-500" : ""}`}
                  >
                    {t(item)}
                    <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-pink-500 transition-all duration-300 group-hover:w-full ${isActive(paths[item]) ? "w-full" : ""}`}></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-5 relative z-[110]">
            <select onChange={changeLang} value={i18n.language} className="bg-white/10 text-white text-xs border-none rounded-full px-3 py-1 outline-none backdrop-blur-md cursor-pointer">
              <option value="az" className="text-black">AZ</option>
              <option value="en" className="text-black">EN</option>
            </select>

            <Link to="/fav" className="text-white hover:text-pink-500 transition-transform hover:scale-110">
              <i className="fa-solid fa-heart text-xl"></i>
            </Link>

            {user ? (
              <button
                onClick={() => { setShowProfile(true); setActiveTab("profile"); }}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center font-bold shadow-lg border-2 border-white/20 hover:scale-105 transition"
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </button>
            ) : (
              <Link to="/login" className="text-white hover:text-pink-500 transition">
                <i className="fa-solid fa-user text-xl"></i>
              </Link>
            )}

            {/* Hamburger Mobile */}
            <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
              <i className={`fa-solid ${isOpen ? "fa-times" : "fa-bars-staggered"} transition-all`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 text-2xl font-extralight tracking-widest text-white uppercase">
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-pink-500">{t("home")}</Link>
              <Link to="/booking" onClick={() => setIsOpen(false)} className="hover:text-pink-500">{t("booking")}</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-pink-500">{t("contact")}</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-pink-500">{t("abt")}</Link>
              <Link to="/fav" onClick={() => setIsOpen(false)} className="text-pink-500">Favorites</Link>
            </div>
            <div className="absolute bottom-10 flex gap-6 text-gray-400">
              <i className="fa-brands fa-instagram text-2xl"></i>
              <i className="fa-brands fa-facebook text-2xl"></i>
              <i className="fa-brands fa-whatsapp text-2xl"></i>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal - Daha Responsive */}
      <AnimatePresence>
        {showProfile && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[1000] p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-[#121212] rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 max-h-[90vh]"
            >
              <button onClick={() => setShowProfile(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white z-50">
                <i className="fa-solid fa-xmark text-2xl" />
              </button>

              {/* Sidebar Modal */}
              <div className="w-full md:w-1/3 bg-[#1a1a1a] p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 p-1 shadow-xl">
                    <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center text-3xl font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                </div>
                <h2 className="mt-4 text-xl font-medium text-white">{user.name}</h2>
                <div className="w-full mt-10 space-y-3">
                  {['profile', 'bookings', 'messages'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-full py-3 rounded-xl text-sm transition-all ${activeTab === tab ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20" : "text-gray-400 hover:bg-white/5"}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <button onClick={handleLogout} className="mt-auto text-red-500 text-sm flex items-center gap-2 hover:opacity-70 pt-6">
                   <i className="fa-solid fa-power-off"></i> {t("16")}
                </button>
              </div>

              {/* Content Modal */}
              <div className="w-full md:w-2/3 p-6 md:p-12 overflow-y-auto bg-[#121212]">
                {activeTab === "profile" && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-light text-white tracking-wide">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input className="w-full bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-pink-500/50 transition" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input className="w-full bg-[#1a1a1a] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-pink-500/50 transition" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                            <button onClick={() => alert("Updated!")} className="w-full bg-pink-600 py-4 rounded-2xl text-white font-medium hover:bg-pink-700 transition">Save Changes</button>
                        </div>
                    </div>
                )}
                {/* Bookings ve Messages üçün bənzər modern strukturu davam etdirmək olar */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;