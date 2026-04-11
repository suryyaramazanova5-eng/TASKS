import React, { useEffect, useState } from "react";

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [search, setSearch] = useState("");

    // LOAD DATA
    useEffect(() => {
        const loadData = () => {
            const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

            setUsers(savedUsers);
            setBookings(savedBookings);
        };

        loadData();

        window.addEventListener("bookingsUpdated", loadData);

        return () => {
            window.removeEventListener("bookingsUpdated", loadData);
        };
    }, []);

    // USERS
    const saveUsers = (data) => {
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
    };

    const addUser = () => {
        const newUser = {
            name: "User " + (users.length + 1),
            email: "user" + (users.length + 1) + "@mail.com",
            hasReservation: false,
        };

        saveUsers([...users, newUser]);
    };

    const deleteUser = (name) => {
        const updated = users.filter((u) => u.name !== name);
        saveUsers(updated);
    };

    const makeReservation = (username) => {
        if (!username) return;

        const newBooking = {
            id: Date.now(),
            name: username,
            phone: "-",
            service: "Manual",
            item: "Manual Item",
            price: 0,
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toTimeString().slice(0, 5),
        };

        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        const updatedUsers = users.map((u) =>
            u.name === username ? { ...u, hasReservation: true } : u
        );

        saveUsers(updatedUsers);

        window.dispatchEvent(new Event("bookingsUpdated"));
    };
    

    // STATS
    const totalReservations = bookings.length;
    const registeredOnly = users.filter((u) => !u.hasReservation).length;
    const customers = users.filter((u) => u.hasReservation).length;

    const stats = [
        { title: "Ümumi rezervlər", value: totalReservations },
        { title: "Qeydiyyatdan keçənlər", value: registeredOnly },
        { title: "Müştərilər", value: customers },
    ];

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#0b1220] text-white">

            {/* SIDEBAR */}
            <div className="w-64 bg-[#070d1a] p-5 flex flex-col justify-between">
                <div>
                    <nav className="space-y-4">

                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`w-full px-4 py-3 rounded-xl text-left mt-11 ${activeTab === "dashboard" ? "bg-red-500" : "hover:bg-gray-800"
                                }`}
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => setActiveTab("customers")}
                            className={`w-full px-4 py-3 rounded-xl text-left ${activeTab === "customers" ? "bg-red-500" : "hover:bg-gray-800"
                                }`}
                        >
                            Müştərilər
                        </button>

                        {/* FIXED */}
                        <button
                            onClick={() => setActiveTab("reservations")}
                            className={`w-full px-4 py-3 rounded-xl text-left ${activeTab === "reservations" ? "bg-red-500" : "hover:bg-gray-800"
                                }`}
                        >
                            Rezervlər
                        </button>

                    </nav>
                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1 p-6">

                {/* DASHBOARD */}
                {activeTab === "dashboard" && (
                    <>
                        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {stats.map((item, i) => (
                                <div key={i} className="bg-[#111827] p-5 rounded-2xl">
                                    <p className="text-gray-400 text-sm">{item.title}</p>
                                    <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#111827] p-5 rounded-2xl">
                            <h3 className="mb-4">Son rezervlər</h3>

                            {bookings.slice(-5).map((b) => (
                                <div
                                    key={b.id}
                                    className="flex justify-between bg-[#0b1220] p-3 rounded-xl mb-3"
                                >
                                    <div>
                                        <p className="font-bold w-12 h-12  ">
                                            {b.name?.[0]?.toUpperCase()} {b.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {b.service} • {b.item}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {b.date} - {b.time}
                                        </p>
                                    </div>

                                    <p className="text-green-400 font-bold">
                                        {b.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* CUSTOMERS */}
                {activeTab === "customers" && (
                    <>
                        <h2 className="text-2xl mb-4">Qeydiyyatdan keçənlər</h2>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#111827] p-3 rounded-xl w-full mb-4"
                            placeholder="Axtar..."
                        />

                        {users.filter((u) => !u.hasReservation)
                            .filter((u) =>
                                u.name.toLowerCase().includes(search.toLowerCase())
                            ).length === 0 ? (

                            <p className="text-gray-400 text-center mt-10">
                                Qeydiyyatdan keçən yoxdur
                            </p>

                        ) : (
                            users
                                .filter((u) => !u.hasReservation)
                                .filter((u) =>
                                    u.name.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((user, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between bg-[#111827] p-4 rounded-xl mb-3"
                                    >
                                        <div>
                                            <p>{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                            <p className="text-xs text-yellow-400">
                                                Qeydiyyatdan keçib
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => makeReservation(user.name)}
                                            className="text-green-400"
                                        >
                                            Rezerv et
                                        </button>
                                    </div>
                                ))
                        )}
                    </>
                )}

                {/* RESERVATIONS */}
                {activeTab === "reservations" && (
                    <>
                        <h2 className="text-2xl mb-4">Rezervlər</h2>

                        {bookings.length === 0 ? (
                            <p className="text-gray-400">Rezerv yoxdur</p>
                        ) : (
                            bookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="flex justify-between bg-[#111827] p-4 rounded-xl mb-3"
                                >
                                    <div>
                                        <p className="font-bold">{b.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {b.service} • {b.item}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {b.date} - {b.time}
                                        </p>
                                    </div>

                                    <p className="text-green-300 ">
                                        {b.price}
                                    </p>
                                </div>
                            ))
                        )}
                    </>
                )}

            </div>
        </div>
    );
}

export default AdminPanel;