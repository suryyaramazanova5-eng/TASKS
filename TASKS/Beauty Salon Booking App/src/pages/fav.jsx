import React, { useState } from "react";
import fav from "../assets/fav.jpg";
import { useNavigate } from "react-router-dom";
import wishlist from "../assets/wishlist.jpg";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion"; // Animasiya üçün

function Fav() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const toggleFavorite = (item) => {
    const updated = favorites.filter((i) => i.name !== item.name);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Section */}
      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center   bg-center"
        style={{ backgroundImage: `url(${fav})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-extralight tracking-[0.2em] uppercase mb-4"
          >
            {t("Favorites")}
          </motion.h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto italic">
            {t("12")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {favorites.length === 0 ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-[2rem] shadow-xl p-12 text-center flex flex-col items-center"
          >
            <img src={wishlist} alt="empty" className="w-64 md:w-80 opacity-80 mb-8" />
            <h3 className="text-2xl font-light text-gray-800 mb-3">{t("13")}</h3>
            <button
              onClick={() => navigate("/services1")}
              className="group flex items-center gap-3 px-10 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 shadow-lg shadow-pink-200"
            >
              <span className="font-medium">{t("14")}</span>
              <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
            </button>
          </motion.div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {favorites.map((item, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={item.name}
                  className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  {/* Dekorativ element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-pink-100 transition-colors"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-pink-500 font-bold bg-pink-50 px-3 py-1 rounded-full">
                        Premium Service
                      </span>
                    </div>

                    <h2 className="text-2xl font-medium text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {item.name}
                    </h2>
                    
                    <div className="flex items-baseline gap-1 mt-auto pt-8">
                      <span className="text-3xl font-light text-gray-900">{item.price}</span>
                      <span className="text-sm text-gray-400 font-light">/ starting from</span>
                    </div>

                    <div className="flex items-center justify-between mt-8 border-t border-gray-50 pt-6">
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-100"
                        title="Remove from favorites"
                      >
                        <i className="fa-regular fa-trash-can text-lg"></i>
                      </button>
                      
                      
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fav;