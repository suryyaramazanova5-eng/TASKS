import React, { useState } from "react";
import services1 from "../assets/services1.jpg";
import servicesData from "../data/servicesData.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

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
            setSelectedServices(
                selectedServices.filter((i) => i.name !== item.name)
            );
        } else {
            setSelectedServices([
                ...selectedServices,
                {
                    ...item,
                    category: category,
                }
            ]);
        }
    };

    const filteredData = servicesData
        .map((cat) => {
            const matchCategory =
                normalize(cat.category) === normalize(activeCategory);

            if (!matchCategory) return null;

            if (!search) return cat;

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

            if (
                (filteredItems && filteredItems.length > 0) ||
                (filteredSections && filteredSections.length > 0)
            ) {
                return {
                    ...cat,
                    items: filteredItems,
                    sections: filteredSections,
                };
            }

            return null;
        })
        .filter(Boolean);

    return (
        <div className="flex flex-col">

            <div
                className="relative w-full h-[300px] bg-center"
                style={{ backgroundImage: `url(${services1})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative flex items-center justify-center h-full text-white">
                    <h1 className="text-4xl font-light tracking-[0.3em] uppercase italic">
                        Services
                    </h1>
                </div>

            </div>

            <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        setTimeout(() => setSearch(""), 300);
                    }
                }}
                className="p-3 border rounded-xl outline-none m-7"
            />
            <p className="text-pink-500 text-xl text-center">{t("qiymet")}
            </p>

            <div className="flex gap-4 overflow-x-auto px-6 py-4 text-xl">
                {servicesData.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveCategory(cat.category)}
                        className={`whitespace-nowrap pb-2 transition ${normalize(activeCategory) === normalize(cat.category)
                            ? "border-b-2 border-pink-500 text-pink-500"
                            : "text-gray-500"
                            }`}
                    >
                        {cat.category}
                    </button>
                ))}
            </div>

            <div className="p-6 space-y-10">

                {filteredData.length === 0 ? (
                    <p className="text-red-500">No services found</p>
                ) : (
                    filteredData.map((cat, i) => (
                        <div key={i}>
                            <h2 className="text-2xl font-semibold mb-4">
                                {cat.category}
                            </h2>

                            {cat.items && (
                                <div className="space-y-3">
                                    {cat.items.map((item, k) => {
                                        const isSelected = selectedServices.find(
                                            (i) => i.name === item.name
                                        );

                                        const isFav = favorites.find(
                                            (i) => i.name === item.name
                                        );

                                        return (
                                            <div key={k} className="flex items-center">

                                                <span>{item.name}</span>

                                                <div className="flex-1 border-b mx-3"></div>

                                                <span>{item.price}</span>

                                                <button
                                                    onClick={() => toggleFavorite(item)}
                                                    className="ml-3 text-xl"
                                                >
                                                    {isFav
                                                        ? <i className="fa-solid fa-heart text-red-600"></i>
                                                        : <i className="fa-solid fa-heart"></i>}
                                                </button>

                                                <button
                                                    onClick={() => toggleService(item, cat.category)}
                                                    className={`w-7 h-7 ml-2 rounded-full border flex items-center justify-center ${isSelected
                                                        ? "bg-pink-500 text-white"
                                                        : "text-pink-500"
                                                        }`}
                                                >
                                                    {isSelected ? "✓" : "+"}
                                                </button>

                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {cat.sections && (
                                <div className="grid md:grid-cols-2 gap-10">
                                    {cat.sections.map((section, j) => (
                                        <div key={j}>
                                            <h3 className="text-xl mb-3">
                                                {section.title}
                                            </h3>

                                            <div className="space-y-3">
                                                {section.items?.map((item, k) => {
                                                    const isSelected = selectedServices.find(
                                                        (i) => i.name === item.name
                                                    );

                                                    const isFav = favorites.find(
                                                        (i) => i.name === item.name
                                                    );

                                                    return (
                                                        <div key={k} className="flex items-center">

                                                            <span>{item.name}</span>

                                                            <div className="flex-1 border-b mx-3"></div>

                                                            <span>{item.price}</span>

                                                            <button
                                                                onClick={() => toggleFavorite(item)}
                                                                className="ml-2 text-xl"
                                                            >
                                                                {isFav
                                                                    ? <i className="fa-solid fa-heart text-red-600"></i>
                                                                    : <i className="fa-solid fa-heart"></i>}
                                                            </button>

                                                            <button
                                                                onClick={() => toggleService(item, cat.category)}
                                                                className={`w-7 h-7 ml-2 rounded-full border flex items-center justify-center ${isSelected
                                                                    ? "bg-pink-500 text-white"
                                                                    : "text-pink-500"
                                                                    }`}
                                                            >
                                                                {isSelected ? "✓" : "+"}
                                                            </button>

                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    ))
                )}

            </div>

            <div className="p-7 flex justify-center">
                <button
                    onClick={() => {
                        if (!selectedServices || selectedServices.length === 0) {
                            toast.error("Ən azı 1 servis seçin!");
                            return;
                        }

                        navigate("/booking", {
                            state: { selectedServices },
                        });
                    }}
                    className="px-6 py-3 bg-pink-500 text-white rounded-full cursor-pointer"
                >
                    {t("book")} ({selectedServices.length})
                </button>
                <ToastContainer position="top-center" theme="colored" />
            </div>

        </div>
    );
}

export default Services1;