import React, { useEffect, useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import servicesData from "../data/servicesData";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState({});

    const safeParse = (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : [];
        } catch {
            return [];
        }
    };
    const sendReply = (id) => {
        fetch(`http://localhost:3001/messages/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reply: replyText[id] })
        })
            .then(res => res.json())
            .then(updated => {
                const newMessages = messages.map(m =>
                    m.id === id ? updated : m
                );
                setMessages(newMessages);

                setReplyText((prev) => ({
                    ...prev,
                    [id]: ""
                }));
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

    }, []


    );

    const filteredUsers = users.filter(
        (u) =>
            (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (u.email || "").toLowerCase().includes(search.toLowerCase())
    );

    const visibleBookings = showAll ? bookings : bookings.slice(0, 6);

    const chartData = useMemo(() => {
        const map = {};
        bookings.forEach((b) => {
            const d = String(b.date).slice(0, 10);
            map[d] = (map[d] || 0) + 1;
        });

        return Object.keys(map)
            .sort()
            .map((date) => ({ date, count: map[date] }));
    }, [bookings]);

    const totalRevenue = useMemo(() => {
        return bookings
            .filter(b => b.done)
            .reduce((sum, b) => {
                const price = Number(
                    String(b.price)
                        .replace("₼", "")
                        .trim()
                );

                return sum + (isNaN(price) ? 0 : price);
            }, 0);
    }, [bookings]);
    const toggleDone = (index) => {
        const updated = bookings.map((b, i) =>
            i === index ? { ...b, done: !b.done } : b
        )

        setBookings(updated)
        localStorage.setItem("bookings", JSON.stringify(updated))
    }

    const stats = [
        { title: "Rezervlər", value: bookings.length, icon: "fa-calendar-check" },
        { title: "Servislər", value: servicesData.length, icon: "fa-scissors" },
        { title: "Ümumi gəlir", value: totalRevenue, icon: "fa-wallet" }
    ];

    const tabs = [
        { id: "dashboard", icon: "fa-chart-line" },
        { id: "gelir", icon: "fa-wallet" },
        { id: "reservations", icon: "fa-calendar-check" },
        { id: "messages", icon: "fa-envelope" }

    ];

    return (
        <div className="relative flex min-h-screen bg-black text-white bg-cover bg-center bg-no-repeat">
            <div className="relative flex w-full">

                <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 flex justify-between items-center z-50">
                    <h1 className="font-bold">Admin Panel</h1>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>

                <div
                    className={`
    fixed top-0 left-0 h-full w-72 z-40
    mt-12 md:mt-0
    bg-black/50 backdrop-blur-xl
    border-r border-white/10
    p-4 flex flex-col gap-3

    transform transition-transform duration-300 ease-in-out

    ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
                >

                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setMenuOpen(false);
                                }}
                                className={`relative flex items-center gap-3 w-full px-3 py-3 rounded-xl transition
                                ${isActive
                                        ? "bg-pink-500/15 text-pink-400 border border-pink-400/30"
                                        : "text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-pink-500 rounded-full" />
                                )}

                                <i className={`fa-solid ${tab.icon}`}></i>

                                <span className="flex-1 text-left capitalize">
                                    {tab.id}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex-1 pt-16 md:pt-6 p-4 md:p-6 md:ml-72">

                    {activeTab === "dashboard" && (
                        <>
                            <h2 className="text-2xl font-bold m-4">Dashboard</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                                        <i className={`fa-solid ${s.icon} text-pink-400 text-2xl`}></i>
                                        <p className="text-gray-400 text-sm mt-2">{s.title}</p>
                                        <h2 className="text-xl font-semibold">{s.value}</h2>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <h3 className="mb-3">Günlük Rezervlər</h3>

                                <div className="h-[320px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <XAxis dataKey="date" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "gelir" && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Gəlir Paneli</h2>

                            <div className="bg-green-500/10 border border-green-400/30 p-6 rounded-2xl mb-6">
                                <p className="text-gray-400">Ümumi gəlir</p>
                                <h2 className="text-3xl font-bold text-green-400">
                                    {totalRevenue} ₼
                                </h2>
                            </div>
                        </>
                    )}
                    {activeTab === "reservations" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Reservations</h2>

                            {bookings.length === 0 ? (
                                <p className="text-gray-400">Heç rezervasiya yoxdur</p>
                            ) : (
                                bookings.map((b, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/5 border border-white/10 p-4 rounded-xl mb-3"
                                    >
                                        <p className="font-bold">Service: {b.service}</p>
                                        <p className="text-gray-300">User: {b.userName}</p>
                                        <p className="mt-2">Date: {b.date}</p>
                                        <p>Time: {b.time}</p>
                                        <p>Price: {b.price}</p>

                                        <p
                                            onClick={() => toggleDone(i)}
                                            className={`mt-2 cursor-pointer font-semibold ${b.done ? "text-green-400" : "text-gray-500"
                                                }`}
                                        >
                                            {b.done ? "Completed" : "Pending"}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    {activeTab === "messages" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Messages</h2>

                            {messages.length === 0 ? (
                                <p className="text-gray-400">Heç mesaj yoxdur</p>
                            ) : (
                                messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className="bg-white/5 border border-white/10 p-4 rounded-xl mb-3"
                                    >
                                        <p className="font-bold">{m.name}</p>
                                        <p className="text-gray-300">{m.email}</p>
                                        <p className="mt-2">{m.message}</p>

                                        {m.reply ? (
                                            <p className="text-green-400 mt-2">
                                                {m.reply}
                                            </p>
                                        ) : (
                                            <p className="text-gray-500 mt-2">
                                                Cavab yoxdur
                                            </p>
                                        )}
                                        <input
                                            type="text"
                                            placeholder="Cavab yaz..."
                                            value={replyText[m.id] || ""}
                                            onChange={(e) =>
                                                setReplyText({
                                                    ...replyText,
                                                    [m.id]: e.target.value
                                                })
                                            }
                                            className="w-full p-2 mt-2 bg-black border border-white/20 rounded"
                                        />

                                        <button
                                            onClick={() => sendReply(m.id)}
                                            className="mt-2 px-4 py-2 bg-pink-500 rounded cursor-pointer"
                                        >
                                            Send Reply
                                        </button>
                                    </div>

                                ))
                            )}
                        </div>
                    )}

                </div>
            </div>
            <div className="fixed bottom-0 left-0 md:left-72 right-0 h-10 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-4 text-xs text-gray-400">

                <span>Admin Panel v1.0</span>



            </div>
        </div>
    );
}

export default AdminPanel;