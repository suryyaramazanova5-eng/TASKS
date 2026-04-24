import React, { useEffect, useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import servicesData from "../data/servicesData";
import { motion, AnimatePresence } from "framer-motion";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState({});
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "" });

    const safeParse = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch { return []; }
    };

    const sendReply = (id) => {
        if (!replyText[id]) return;

        fetch(`http://localhost:3001/messages/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: replyText[id] })
        })
            .then(res => res.json())
            .then(updated => {
                setMessages(messages.map(m => m.id === id ? updated : m));
                setReplyText(prev => ({ ...prev, [id]: "" }));
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const loadData = () => {
            setUsers(safeParse("users"));
            setBookings(safeParse("bookings"));
        };
        loadData();
        window.addEventListener("bookingsUpdated", loadData);

        fetch("http://localhost:3001/messages")
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.log(err));

        return () => window.removeEventListener("bookingsUpdated", loadData);
    }, []);

    const chartData = useMemo(() => {
        const map = {};
        bookings.forEach((b) => {
            const d = String(b.date).slice(0, 10);
            map[d] = (map[d] || 0) + 1;
        });
        return Object.keys(map).sort().map((date) => ({ date, count: map[date] }));
    }, [bookings]);

    const totalRevenue = useMemo(() => {
        return bookings
            .filter(b => b.done)
            .reduce((sum, b) => {
                const price = Number(String(b.price).replace(/[^0-9.-]+/g, ""));
                return sum + (isNaN(price) ? 0 : price);
            }, 0);
    }, [bookings]);
    const filteredUsers = useMemo(() => {
        return users
            .filter(u =>
                u.name?.toLowerCase().includes(search.toLowerCase()) ||
                u.email?.toLowerCase().includes(search.toLowerCase())
            )
            .reverse(); 
    }, [users, search]);

    const toggleDone = (index) => {
        const updated = bookings.map((b, i) => i === index ? { ...b, done: !b.done } : b);
        setBookings(updated);
        localStorage.setItem("bookings", JSON.stringify(updated));
    };
    const addUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) return;

        const userEntry = {
            ...newUser,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString("az-AZ")
        };

        const updatedUsers = [...users, userEntry];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Formu təmizlə və modalı bağla
        setNewUser({ name: "", email: "" });
        setIsUserModalOpen(false);
    };

    const stats = [
        { title: "Ümumi Rezervlər", value: bookings.length, icon: "fa-calendar-check", color: "text-blue-400" },
        { title: "Aktiv Xidmətlər", value: servicesData.length, icon: "fa-scissors", color: "text-pink-400" },
        { title: "Ümumi Gəlir", value: `${totalRevenue} ₼`, icon: "fa-wallet", color: "text-green-400" },
        { title: "Müştəri Sayı", value: users.length, icon: "fa-users", color: "text-violet-400" } // Yeni kart
    ];

    const tabs = [
        { id: "dashboard", icon: "fa-chart-pie", label: "Dashboard" },
        { id: "reservations", icon: "fa-receipt", label: "Rezervasiyalar" },
        { id: "messages", icon: "fa-comment-dots", label: "Mesajlar" },
        { id: "users", icon: "fa-users", label: "Müştərilər" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-pink-500/30">

            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-8">
                    <h1 className="text-2xl font-light tracking-[0.2em] uppercase">
                        Glamora<span className="text-pink-500 font-bold">.</span>
                        <span className="block text-[10px] text-gray-500 tracking-widest mt-1">Management Suite</span>
                    </h1>
                </div>

                <nav className="px-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === tab.id ? "bg-pink-500/10 text-pink-500 border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.1)]" : "text-gray-500 hover:bg-white/5 hover:text-gray-300"}`}
                        >
                            <i className={`fa-solid ${tab.icon} text-lg`}></i>
                            <span className="text-sm font-medium tracking-wide">{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 md:ml-72 min-h-screen relative">

                <header className="md:hidden flex justify-between items-center p-6 border-b border-white/5 bg-black/20">
                    <h2 className="text-lg font-medium">Admin</h2>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 bg-white/5 rounded-lg">
                        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                    </button>
                </header>

                <div className="p-6 md:p-12 max-w-6xl mx-auto">

                    {activeTab === "dashboard" && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="mb-10">
                                <h2 className="text-3xl font-light italic">Xoş gəldiniz, <span className="font-semibold not-italic">Admin</span></h2>
                                <p className="text-gray-500 mt-2">Bu gün üçün salonunuzun statistikası.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                                {stats.map((s, i) => (
                                    <div key={i} className="group p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-pink-500/30 transition-all duration-500">
                                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <i className={`fa-solid ${s.icon} ${s.color} text-xl`}></i>
                                        </div>
                                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{s.title}</p>
                                        <h3 className="text-3xl font-bold">{s.value}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                                <h3 className="text-lg font-medium mb-8 flex items-center gap-3 italic">
                                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                                    Rezervasiya Dinamikası
                                </h3>
                                <div className="h-[350px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                            <XAxis dataKey="date" stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#444" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", borderRadius: "12px" }} />
                                            <Area type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            {/* --- RECENT BOOKINGS TABLE (Dashboard tabının daxilinə əlavə et) --- */}
                            <div className="mt-10 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-lg font-medium italic">Son Rezervasiyalar</h3>
                                    <button
                                        onClick={() => setActiveTab("reservations")}
                                        className="text-xs uppercase tracking-widest text-pink-500 hover:text-pink-400 transition"
                                    >
                                        Hamısına bax <i className="fa-solid fa-arrow-right ml-2"></i>
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/5">
                                                <th className="pb-4 font-medium">Müştəri</th>
                                                <th className="pb-4 font-medium">Xidmət</th>
                                                <th className="pb-4 font-medium">Tarix/Saat</th>
                                                <th className="pb-4 font-medium text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {bookings.slice(-5).reverse().map((b, i) => (
                                                <tr key={i} className="border-b border-white/5 group hover:bg-white/[0.02] transition">
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500/20 to-violet-500/20 flex items-center justify-center text-[10px] text-pink-400 font-bold border border-pink-500/10">
                                                                {b.userName?.charAt(0) || "U"}
                                                            </div>
                                                            <span className="font-medium text-gray-200">{b.userName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-gray-400 font-light">{b.service}</td>
                                                    <td className="py-4 text-gray-400 font-light">
                                                        {b.date} <span className="text-[10px] ml-2 text-pink-500/50">{b.time}</span>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${b.done ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-orange-500 animate-pulse"}`}></span>
                                                        <span className={`text-[10px] uppercase tracking-widest ${b.done ? "text-green-500" : "text-orange-500"}`}>
                                                            {b.done ? "Completed" : "Pending"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {bookings.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="py-10 text-center text-gray-600 italic text-sm">
                                                        Hələ ki, rezervasiya məlumatı yoxdur.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
{activeTab === "users" && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div>
                <h2 className="text-2xl md:text-3xl font-light italic">İstifadəçi <span className="font-bold not-italic text-pink-500">Bazası</span></h2>
                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-medium">Cəmi {users.length} müştəri</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                    <input 
                        type="text" 
                        placeholder="Müştəri axtar..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm focus:border-pink-500/50 outline-none transition-all placeholder:text-gray-600 text-white"
                    />
                </div>
                <button 
                    onClick={() => setIsUserModalOpen(true)}
                    className="bg-pink-600 hover:bg-pink-500 text-white w-12 h-12 md:w-auto md:px-6 md:h-auto py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-pink-600/20"
                >
                    <i className="fa-solid fa-plus text-lg md:text-sm"></i> 
                    <span className="hidden md:inline">Yeni Müştəri</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredUsers.map((u, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/10 text-xs">
                            {u.name?.charAt(0) || "U"}
                        </div>
                        <div>
                            <h4 className="text-gray-200 font-medium text-base">{u.name}</h4>
                            <p className="text-gray-500 text-[11px] font-light truncate max-w-[150px]">{u.email}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-600 uppercase tracking-tighter mb-1">{u.createdAt}</p>
                        <span className="text-[9px] px-2 py-1 rounded-md bg-green-500/10 text-green-500 font-bold border border-green-500/20">AKTİV</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="hidden md:block bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/5 bg-white/[0.02]">
                        <th className="p-6 font-medium">Müştəri Məlumatı</th>
                        <th className="p-6 font-medium text-center">E-poçt</th>
                        <th className="p-6 font-medium text-center">Tarix</th>
                        <th className="p-6 font-medium text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {filteredUsers.map((u, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition group">
                            <td className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-pink-500 border border-white/5 group-hover:border-pink-500/30 transition-all font-bold">
                                        {u.name?.charAt(0) || "U"}
                                    </div>
                                    <span className="font-medium text-gray-200">{u.name}</span>
                                </div>
                            </td>
                            <td className="p-6 text-gray-400 font-light text-center">{u.email}</td>
                            <td className="p-6 text-gray-400 font-light text-center text-xs uppercase tracking-tighter">{u.createdAt}</td>
                            <td className="p-6 text-right font-bold text-[10px] text-green-500 uppercase tracking-widest">Active</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <AnimatePresence>
            {isUserModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsUserModalOpen(false)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-md bg-[#111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl z-10"
                    >
                        <h3 className="text-2xl font-light mb-6 italic text-center">Yeni <span className="font-bold not-italic text-pink-500">Müştəri</span></h3>
                        <form onSubmit={addUser} className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2 mb-2 block font-bold">Tam Adı</label>
                                <input 
                                    required type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-pink-500 outline-none transition-all text-white"
                                    placeholder="Ad Soyad"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2 mb-2 block font-bold">E-poçt</label>
                                <input 
                                    required type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-pink-500 outline-none transition-all text-white"
                                    placeholder="nümunə@mail.com"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button" onClick={() => setIsUserModalOpen(false)}
                                    className="flex-1 py-4 rounded-2xl text-sm font-medium text-gray-500 hover:text-white transition-all"
                                >
                                    Ləğv et
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-4 rounded-2xl text-sm font-bold bg-pink-600 hover:bg-pink-500 text-white transition-all active:scale-95"
                                >
                                    Əlavə Et
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </motion.div>
)}
                    {activeTab === "reservations" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h2 className="text-2xl font-light mb-8">Rezervasiya <span className="font-bold text-pink-500">Siyahısı</span></h2>
                            <div className="space-y-4">
                                {bookings.length === 0 ? (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-gray-500 italic">Hələ ki, heç bir rezerv yoxdur.</div>
                                ) : (
                                    bookings.map((b, i) => (
                                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">
                                                    {b.userName?.charAt(0) || "U"}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-lg">{b.service}</h4>
                                                    <p className="text-gray-500 text-sm">{b.userName} • {b.date} • {b.time}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex items-center gap-6">
                                                <span className="text-pink-400 font-medium">{b.price}</span>
                                                <button
                                                    onClick={() => toggleDone(i)}
                                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${b.done ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-400"}`}
                                                >
                                                    {b.done ? "Tamamlandı" : "Gözləyir"}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                  {activeTab === "messages" && (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-2xl font-light mb-8">
      Müştəri <span className="font-bold text-pink-500">Mesajları</span>
    </h2>

    {messages.length === 0 ? (
      /* Mesaj olmayanda görünəcək hissə */
      <div className="flex flex-col items-center justify-center p-20 rounded-3xl bg-white/5 border border-dashed border-white/10">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <i className="fa-regular fa-envelope-open text-gray-500 text-2xl"></i>
        </div>
        <p className="text-gray-400 font-light italic">Hələ ki, heç bir mesaj yoxdur.</p>
      </div>
    ) : (
      /* Mesajlar olanda görünəcək hissə */
      <div className="grid grid-cols-1 gap-6">
        {messages.map((m) => (
          <div key={m.id} className="p-8 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-bold text-lg">{m.name}</h4>
                <p className="text-pink-500/60 text-xs italic">{m.email}</p>
              </div>
              <span className="text-[10px] text-gray-600 uppercase tracking-tighter">İD: #{m.id.slice(0, 5)}</span>
            </div>

            <div className="bg-black/40 p-4 rounded-2xl mb-6 text-gray-300 text-sm leading-relaxed italic border-l-2 border-pink-500">
              "{m.message}"
            </div>

            {m.reply && (
              <div className="mb-6 pl-6 border-l border-green-500/30">
                <p className="text-[10px] uppercase text-green-500 mb-1">Adminin Cavabı:</p>
                <p className="text-sm text-gray-400">{m.reply}</p>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Cavabınızı bura yazın..."
                value={replyText[m.id] || ""}
                onChange={(e) => setReplyText({ ...replyText, [m.id]: e.target.value })}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50 transition-all"
              />
              <button
                onClick={() => sendReply(m.id)}
                className="bg-pink-600 hover:bg-pink-500 px-6 rounded-xl transition-all active:scale-95"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </motion.div>
)}

                </div>

                <footer className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest border-t border-white/5">
                    <span>Glamora System v2.4</span>

                </footer>
            </main>
        </div>
    );
}

export default AdminPanel;