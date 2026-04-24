import React, { useState, useEffect } from "react";
import services1 from "../assets/services1.jpg";
import servicesData from "../data/servicesData.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Animasiya üçün

function Services1() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const normalize = (str) => (str ? str.trim().toLowerCase() : "");

    const [activeCategory, setActiveCategory] = useState(
        servicesData?.[0]?.category || ""
    );

    const [selectedServices, setSelectedServices] = useState([]);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    const toggleFavorite = (item) => {
        let updated;
        const exists = favorites.find((i) => i.name === item.name);
        if (exists) {
            updated = favorites.filter((i) => i.name !== item.name);
        } else {
            updated = [...favorites, item];
        }
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    const toggleService = (item, category) => {
        const exists = selectedServices.find((i) => i.name === item.name);
        if (exists) {
            setSelectedServices(selectedServices.filter((i) => i.name !== item.name));
        } else {
            setSelectedServices([...selectedServices, { ...item, category: category }]);
        }
    };

    const filteredData = servicesData
        .map((cat) => {
            const matchCategory = normalize(cat.category) === normalize(activeCategory);
            if (!matchCategory && !search) return null;

            const searchLower = search.toLowerCase();
            const filteredItems = cat.items?.filter((item) =>
                item.name.toLowerCase().includes(searchLower)
            );

            const filteredSections = cat.sections?.map((section) => {
                const items = section.items?.filter((item) =>
                    item.name.toLowerCase().includes(searchLower)
                );
                return { ...section, items };
            }).filter((s) => s.items && s.items.length > 0);

            if ((filteredItems && filteredItems.length > 0) || (filteredSections && filteredSections.length > 0)) {
                return { ...cat, items: filteredItems, sections: filteredSections };
            }
            return null;
        }).filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="relative w-full h-[350px] bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${services1})` }}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extralight tracking-[0.4em] uppercase italic"
                    >
                        Services
                    </motion.h1>
                    <div className="w-24 h-1 bg-pink-500 mt-4 shadow-lg"></div>
                </div>
            </div>

            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b">
                <div className="max-w-6xl mx-auto">
                    <div className="p-4 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full md:w-1/3">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder={t("search_placeholder") || "Search services..."}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition"
                            />
                        </div>
                        
                        <div className="flex gap-6 overflow-x-auto no-scrollbar w-full py-2">
                            {servicesData.map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setActiveCategory(cat.category); setSearch(""); }}
                                    className={`whitespace-nowrap text-sm font-bold uppercase tracking-widest transition-all ${
                                        normalize(activeCategory) === normalize(cat.category)
                                            ? "text-pink-600 border-b-2 border-pink-600"
                                            : "text-gray-400 hover:text-gray-600"
                                    } pb-1`}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6 mt-8">
                <AnimatePresence mode="wait">
                    {filteredData.length === 0 ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-20 italic">
                            No services found matching your search.
                        </motion.p>
                    ) : (
                        filteredData.map((cat, i) => (
                            <motion.div 
                                key={cat.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-light text-gray-800 mb-8 border-l-4 border-pink-500 pl-4">
                                    {cat.category}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    {/* Render standalone items */}
                                    {cat.items?.map((item, k) => (
                                        <ServiceItem 
                                            key={k} 
                                            item={item} 
                                            isSelected={selectedServices.some(s => s.name === item.name)}
                                            isFav={favorites.some(f => f.name === item.name)}
                                            onToggle={() => toggleService(item, cat.category)}
                                            onFav={() => toggleFavorite(item)}
                                        />
                                    ))}

                                    {/* Render sections */}
                                    {cat.sections?.map((section, j) => (
                                        <div key={j} className="col-span-full mt-6">
                                            <h3 className="text-lg font-bold text-pink-400 mb-4 uppercase tracking-tighter italic">
                                                {section.title}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                                {section.items?.map((item, k) => (
                                                    <ServiceItem 
                                                        key={k} 
                                                        item={item} 
                                                        isSelected={selectedServices.some(s => s.name === item.name)}
                                                        isFav={favorites.some(f => f.name === item.name)}
                                                        onToggle={() => toggleService(item, cat.category)}
                                                        onFav={() => toggleFavorite(item)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {selectedServices.length > 0 && (
                <motion.div 
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4"
                >
                    <button
                        onClick={() => navigate("/booking", { state: { selectedServices } })}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-pink-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        <span>{t("book")}</span>
                        <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                            {selectedServices.length}
                        </span>
                    </button>
                </motion.div>
            )}

            <ToastContainer position="top-center" theme="colored" hideProgressBar />
        </div>
    );
}

const ServiceItem = ({ item, isSelected, isFav, onToggle, onFav }) => (
    <div className="group flex items-center justify-between py-2 border-b border-dashed border-gray-200 hover:border-pink-200 transition-colors">
        <div className="flex flex-col">
            <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors italic uppercase tracking-tighter">{item.name}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{item.duration || "45 min"}</span>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] w-12 bg-gray-100 hidden lg:block"></div>
            <span className="font-bold text-gray-900">{item.price} AZN</span>
            
            <div className="flex items-center gap-2">
                <button onClick={onFav} className="transition-transform active:scale-125">
                    <i className={`fa-solid fa-heart ${isFav ? "text-red-500" : "text-gray-200 hover:text-red-200"}`}></i>
                </button>
                <button
                    onClick={onToggle}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "bg-pink-500 border-pink-500 text-white" : "border-gray-200 text-gray-400 hover:border-pink-400"
                    }`}
                >
                    {isSelected ? <i className="fa-solid fa-check text-xs"></i> : <i className="fa-solid fa-plus text-xs"></i>}
                </button>
            </div>
        </div>
    </div>
);

export default Services1;