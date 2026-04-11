import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import footer from "../assets/footer.jpg";

function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">

      {/* BACKGROUND */}
      <div
        className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] bg-cover bg-center mt-7"
        style={{ backgroundImage: `url(${footer})` }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-white px-4 sm:px-10 md:px-20 py-8 sm:py-12 h-full flex flex-col justify-between">

          {/* TOP */}
          <div className="text-center mt-6 sm:mt-10">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-light mb-3 sm:mb-4">
              Glamora'da gözəlliyinizi kəşf edin!
            </h1>

            <p className="text-xs sm:text-sm md:text-lg text-gray-200">
              Elə isə indi rezervasiya edin.
            </p>

            <button
              onClick={() => navigate("/booking")}
              className="mt-5 sm:mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-pink-400 text-white rounded-full hover:bg-pink-600 active:scale-95 transition text-sm sm:text-base"
            >
              Bizimlə əlaqə
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-xs sm:text-sm">

            {/* BRAND */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-pink-400">
                Glamora
              </h2>
              <p className="mt-3 text-gray-200 leading-relaxed">
                {t("about")}
              </p>
            </div>

            {/* LINKS */}
            <div>
              <ul className="space-y-2 text-gray-200">
                <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
                <li><Link to="/services" className="hover:text-pink-400">Services</Link></li>
                <li><Link to="/booking" className="hover:text-pink-400">Booking</Link></li>
                <li><Link to="/contact" className="hover:text-pink-400">Contact</Link></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="text-gray-200">
              <p>Baku, Azerbaijan</p>
              <p className="mt-2">+994 51 000 00 00</p>
              <p className="mt-2">info@glamora.com</p>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="text-center text-gray-300 text-[10px] sm:text-xs mt-4">
            © 2026 Glamora Beauty. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;