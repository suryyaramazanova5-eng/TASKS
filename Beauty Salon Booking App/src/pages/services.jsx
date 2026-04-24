import React from "react";
import services from "../assets/services.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // Animasiya üçün

const serviceList = [
  {
    title: "Hair section",
    img: "https://i.pinimg.com/1200x/09/b1/64/09b164adba0149c36f1e6b279f6e829d.jpg",
    icon: <i className="fa-solid fa-scissors"></i>
  },
  {
    title: "Makeup",
    img: "https://i.pinimg.com/736x/52/28/61/522861227174f829488683cd743b3425.jpg",
    icon: <i className="fa-solid fa-brush"></i>
  },
  {
    title: "Laser",
    img: "https://i.pinimg.com/736x/e3/eb/83/e3eb8339ab39d1fe10ecf4e8a3fe47e9.jpg",
    icon: <i className="fa-solid fa-bolt"></i>
  },
  {
    title: "Piercing",
    img: "https://i.pinimg.com/1200x/87/a2/de/87a2de219ec7ff098c6b99d39c578367.jpg",
    icon: <i className="fa-solid fa-gem"></i>
  },
  {
    title: "Permanent",
    img: "https://i.pinimg.com/736x/44/30/36/443036ff2b5e1e94427684ffadf7c831.jpg",
    icon: <i className="fa-solid fa-pen"></i>
  },
  {
    title: "Cyprus",
    img: "https://i.pinimg.com/736x/56/da/45/56da453d2d37414f8f684748baab9f29.jpg",
    icon: <i className="fa-solid fa-eye"></i>
  },
  {
    title: "Glamora man",
    img: "https://i.pinimg.com/736x/20/c9/28/20c9287356ed42c8c76ec0188c8303b9.jpg",
    icon: <i className="fa-solid fa-user"></i>
  },
  {
    title: "Nail",
    img: "https://i.pinimg.com/736x/af/3c/15/af3c1533182f27d8282feb788f7dcfd0.jpg",
    icon: <i className="fa-solid fa-hand-sparkles"></i>
  },
];

function Services() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col bg-white">
      <div
        className="relative w-full h-[400px] bg-center bg-cover flex items-center justify-center shadow-inner"
        style={{ backgroundImage: `url(${services})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-white text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] uppercase italic leading-tight">
            The new standard <br /> of beauty
          </h1>
          <p className="text-lg md:text-xl mt-4 font-light opacity-90 tracking-wide">
            {t("muk")}
          </p>
          <div className="w-20 h-[2px] bg-pink-500 mx-auto mt-6"></div>
        </motion.div>
      </div>

      <div className="py-16 px-6">
        <h2 className="text-4xl md:text-5xl font-light text-center text-gray-800 tracking-tight">
          {t("add")}
        </h2>
        <p className="text-center text-gray-400 mt-4 uppercase tracking-[0.3em] text-xs font-bold">
          Exclusive Treatments
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-12 max-w-[1600px] mx-auto">
        {serviceList.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            onClick={() => navigate("/services1")}
            className="relative h-[450px] group overflow-hidden rounded-[2rem] cursor-pointer shadow-2xl shadow-gray-200"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
            <div className="absolute inset-0 bg-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl border border-white/30 group-hover:bg-pink-500 group-hover:border-pink-500 transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              <h2 className="text-2xl font-light tracking-wide group-hover:tracking-widest transition-all italic">
                {item.title}
              </h2>
              
              <div className="mt-4 overflow-hidden h-0 group-hover:h-8 transition-all duration-300">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-pink-400">
                  Explore More +
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50">
        <p className="text-gray-400 text-sm mb-6 italic">Everything for your beauty</p>
        <button
          onClick={() => navigate("/services1")}
          className="group relative px-12 py-4 bg-gray-900 text-white rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95"
        >
          <span className="relative z-10 font-bold tracking-widest uppercase text-sm">
            {t("all")}
          </span>
          <i className="fa-solid fa-arrow-right absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"></i>
          <div className="absolute inset-0 bg-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

    </div>
  );
}

export default Services;