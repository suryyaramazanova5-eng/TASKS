import React from "react";
import services from "../assets/services.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const service = [
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
    <div className="flex flex-col">

      <div
        className="relative w-full h-[300px] bg-center "
        style={{ backgroundImage: `url(${services})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase italic">
            The new standard of beauty
          </h1>
          <p className="text-xl mt-3">
            {t("muk")}
          </p>
        </div>
      </div>

      <h2 className="text-5xl font-light m-15 text-center">
        {t("add")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 sm:p-6">
        {service.map((item, index) => (
          <div
            onClick={() => navigate("/services1")}
            key={index}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] group overflow-hidden rounded-xl cursor-pointer" >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105  transition duration-500 " />
                  <div className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-30 transition duration-500"></div>


            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
              <div className="text-2xl sm:text-3xl md:text-4xl ">
                {item.icon}
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-light mt-2">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/services1")}
          className="px-8 py-3 bg-pink-400 text-white rounded-full hover:bg-pink-600 hover:scale-105 cursor-pointer m-4">
          {t("all")}
          <i className="fa-solid fa-arrow-right text-xl ml-2"></i>
        </button>
      </div>

    </div>
  );
}

export default Services;