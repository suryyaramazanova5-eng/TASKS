import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

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
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          <Link to="/" className="relative z-[110]">
            <img src={logo} className="w-[100px] md:w-[130px] rounded-lg" alt="logo" />
          </Link>

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

          <div className="flex items-center gap-5 relative z-[110]">
            <select onChange={changeLang} value={i18n.language} className="bg-white/10 text-white text-md border-none rounded-full px-3 py-1 outline-none backdrop-blur-md cursor-pointer">
              <option value="az" className="text-black">AZ</option>
              <option value="en" className="text-black">EN</option>
            </select>

            <Link to="/fav" className="text-white hover:text-pink-500 transition-transform hover:scale-110">
              <i className="fa-solid fa-heart text-2xl"></i>
            </Link>

            {user ? (
              <button
                onClick={() => { setShowProfile(true); setActiveTab("profile"); }}
                className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold shadow-lg border-2 border-white/20 hover:scale-105 transition"
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </button>
            ) : (
              <Link to="/login" className="text-white hover:text-pink-500 transition">
                <i className="fa-solid fa-user text-xl"></i>
              </Link>
            )}

            <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
              <i className={`fa-solid ${isOpen ? "fa-times" : "fa-bars-staggered"} transition-all`}></i>
            </button>
          </div>
        </div>
      </nav>
{/* Modern Profile Modal */}
<AnimatePresence>
  {showProfile && user && (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[1000] p-0 md:p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full h-full md:h-[600px] md:max-w-5xl bg-[#0f0f0f] md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 relative text-left"
      >
        {/* Close Button */}
        <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 md:top-6 md:right-8 text-gray-500 hover:text-white transition-colors z-50 p-2">
          <i className="fa-solid fa-xmark text-2xl" />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-80 bg-[#161616] p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 p-[2px] md:mb-4">
                  <div className="w-full h-full bg-[#161616] rounded-[14px] md:rounded-[22px] flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase()}
                  </div>
              </div>
              <div className="text-left md:text-center">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-1">{user.name}</h2>
                <p className="text-pink-500/80 text-[10px] md:text-[11px] font-medium tracking-wider uppercase bg-pink-500/5 px-3 py-1 rounded-full border border-pink-500/20 inline-block">
                    {user.email}
                </p>
              </div>
          </div>

          {/* Mobildə Yan-yana, Desktopda Alt-alta Menyu */}
          <nav className="mt-6 md:mt-10 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-scrollbar">
            {[
              { id: 'profile', icon: 'fa-user-gear', label: 'Profil' },
              { id: 'bookings', icon: 'fa-calendar-check', label: 'Rezervlər' },
              { id: 'messages', icon: 'fa-envelope', label: 'Mesajlar' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all ${activeTab === tab.id ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20" : "text-gray-400 hover:bg-white/5"}`}
              >
                <i className={`fa-solid ${tab.icon} w-4 md:w-5`}></i>
                {tab.label}
              </button>
            ))}
          </nav>

          <button onClick={handleLogout} className="hidden md:flex mt-auto text-rose-500 text-sm font-medium items-center gap-3 px-6 py-3 hover:bg-rose-500/10 rounded-2xl transition-all">
             <i className="fa-solid fa-arrow-right-from-bracket"></i> Çıxış et
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 pb-24 md:pb-12">
          {/* Mobildə Çıxış düyməsi aşağıda görünsün */}
          <div className="md:hidden flex justify-end mb-6">
             <button onClick={handleLogout} className="text-rose-500 text-xs font-bold uppercase tracking-widest border border-rose-500/20 px-4 py-2 rounded-lg">
                Çıxış et
             </button>
          </div>

          {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8">
                  <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Hesab Ayarları</h3>
                      <p className="text-gray-500 text-sm">Məlumatlarınızı buradan idarə edə bilərsiniz.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                      <div className="space-y-2">
                          <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest ml-1">E-poçt (Dəyişdirilə bilməz)</label>
                          <div className="relative">
                            <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                            <input 
                              className="w-full bg-white/5 border border-white/5 p-4 rounded-xl md:rounded-2xl text-gray-500 outline-none cursor-not-allowed italic text-sm" 
                              value={user.email} 
                              readOnly 
                            />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="space-y-2">
                              <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest ml-1">Ad Soyad</label>
                              <input className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl text-white outline-none focus:border-pink-500/50 transition text-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest ml-1">Telefon</label>
                              <input className="w-full bg-white/5 border border-white/10 p-4 rounded-xl md:rounded-2xl text-white outline-none focus:border-pink-500/50 transition text-sm" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                          </div>
                      </div>
                  </div>
                  <button onClick={() => toast("Profil yeniləndi!")} className="w-full md:w-auto bg-pink-600 px-10 py-4 rounded-xl md:rounded-2xl text-white font-bold hover:bg-pink-700 transition-all text-sm">Yadda Saxla</button>
              </motion.div>
          )}

          {/* Bookings & Messages hissələri eyni məntiqlə davam edir... */}
          {activeTab === "bookings" && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <h3 className="text-xl md:text-2xl font-bold text-white">Rezervasiyalarım</h3>
                 {/* Mövcud booking mapping kodunuz bura gəlir */}
             </motion.div>
          )}

          {activeTab === "messages" && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <h3 className="text-xl md:text-2xl font-bold text-white">Mesaj Qutusu</h3>
                 {/* Mövcud mesaj mapping kodunuz bura gəlir */}
             </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Modern Profile Modal */}
      <AnimatePresence>
        {showProfile && user && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[1000] p-2 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl bg-[#0f0f0f] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/10 h-[85vh] md:h-[600px] relative text-left"
            >
              {/* Close Button */}
              <button onClick={() => setShowProfile(false)} className="absolute top-6 right-8 text-gray-500 hover:text-white transition-colors z-50">
                <i className="fa-solid fa-xmark text-2xl" />
              </button>

              {/* Sidebar */}
              <div className="w-full md:w-80 bg-[#161616] p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 p-[2px] mb-4">
                        <div className="w-full h-full bg-[#161616] rounded-[22px] flex items-center justify-center text-3xl font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase()}
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-1">{user.name}</h2>
                    <p className="text-pink-500/80 text-[11px] font-medium tracking-wider uppercase bg-pink-500/5 px-3 py-1 rounded-full border border-pink-500/20">
                        {user.email}
                    </p>
                </div>

                <nav className="mt-10 space-y-2 flex-grow text-left">
                  {[
                    { id: 'profile', icon: 'fa-user-gear', label: 'Profil' },
                    { id: 'bookings', icon: 'fa-calendar-check', label: 'Reservations' },
                    { id: 'messages', icon: 'fa-envelope', label: 'Messages' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-2xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20" : "text-gray-400 hover:bg-white/5"}`}
                    >
                      <i className={`fa-solid ${tab.icon} w-5`}></i>
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <button onClick={handleLogout} className="mt-auto text-rose-500 text-sm font-medium flex items-center gap-3 px-6 py-3 hover:bg-rose-500/10 rounded-2xl transition-all">
                   <i className="fa-solid fa-arrow-right-from-bracket"></i> Çıxış et
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
                
                {/* 1. Account Settings */}
                {activeTab === "profile" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">Account Settings</h3>
                            <p className="text-gray-500 text-sm">You can manage your data here.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">E-poçt Ünvanı (Qeydiyyat)</label>
                                <div className="relative">
                                  <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                                  <input 
                                    className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-gray-400 outline-none cursor-not-allowed italic" 
                                    value={user.email} 
                                    readOnly 
                                  />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Ad Soyad</label>
                                    <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-pink-500/50 transition" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest ml-1">Telefon</label>
                                    <input className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-pink-500/50 transition" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <button onClick={() => toast("Profil yeniləndi!")} className="bg-pink-600 px-10 py-4 rounded-2xl text-white font-bold hover:bg-pink-700 hover:shadow-xl hover:shadow-pink-600/30 transition-all">Save changes</button>
                        <ToastContainer/>
                    </motion.div>
                )}

                {/* 2. Bookings */}
                {activeTab === "bookings" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-4">My reservations</h3>
                        {userBookings.length > 0 ? (
                            <div className="grid gap-4">
                                {userBookings.map((b, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex justify-between items-center group hover:bg-white/10 transition">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-500">
                                                <i className="fa-solid fa-calendar-day"></i>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{b.service || "Xidmət adı"}</h4>
                                                <p className="text-gray-500 text-xs">{b.date} • {b.time}</p>
                                            </div>
                                        </div>
                                        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-emerald-500/20">Aktiv</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <i className="fa-solid fa-calendar-xmark text-4xl text-gray-700 mb-4"></i>
                                <p className="text-gray-500">You don't have a reservation yet.</p>
                            </div>
                        )}
                    </motion.div>
                )}

{activeTab === "messages" && (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <h3 className="text-2xl font-bold text-white mb-4">Message Box</h3>
    {messages.length > 0 ? (
      <div className="space-y-6">
        {messages.map((m, idx) => (
          <div key={idx} className="space-y-3">
            {/* İstifadəçinin göndərdiyi mesaj */}
            <div className="bg-[#1a1a1a] p-6 rounded-3xl border-l-4 border-gray-600 shadow-lg ml-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Your message</span>
                <span className="text-gray-600 text-[10px]">{m.date || "Tarix qeyd olunmayıb"}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{m.message}</p>
            </div>

            {/* Adminin Cavabı (Əgər varsa) */}
            {m.reply ? (
              <motion.div 
                initial={{ x: -10, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }}
                className="bg-pink-600/10 p-6 rounded-3xl border-l-4 border-pink-600 shadow-lg mr-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <i className="fa-solid fa-quote-right text-4xl text-pink-500"></i>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-pink-500">
                    <i className="fa-solid fa-headset text-xs"></i>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Admin answer</span>
                  </div>
                  <span className="text-pink-500/50 text-[10px]">{m.replyDate || "Yeni"}</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed font-medium">
                  {m.reply}
                </p>
              </motion.div>
            ) : (
              <div className="ml-8 text-gray-600 text-[11px] italic">
                <i className="fa-solid fa-clock mr-1"></i> Admin cavabı gözlənilir...
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
        <i className="fa-solid fa-comment-slash text-4xl text-gray-700 mb-4"></i>
        <p className="text-gray-500">Hələ ki, heç bir mesajınız yoxdur.</p>
      </div>
    )}
  </motion.div>
)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </>
  );
}

export default Navbar;