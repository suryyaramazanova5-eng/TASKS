import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import footer from "../assets/footer.jpg";
import { motion } from "framer-motion";

function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="relative w-full bg-[#080808] pt-20">
      {/* --- TOP CTA SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div
          className="relative w-full h-[400px] rounded-[3rem] overflow-hidden bg-cover bg-center flex items-center justify-center group"
          style={{ backgroundImage: `url(${footer})` }}
        >
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-700"></div>

          <div className="relative z-10 text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight"
            >
              Discover <span className="font-serif italic text-pink-500">your beauty</span> at Glamora!
            </motion.h2>

            <p className="text-gray-200 text-lg mb-8 font-light tracking-wide">
              Book now for the perfect touch. </p>

            <button
              onClick={() => navigate("/contact")}
              className="group relative px-10 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10 font-medium uppercase tracking-widest text-xs">
                Contact us
              </span>
              <i className="fa-solid fa-arrow-right absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"></i>
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN FOOTER LINKS --- */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-400">

          {/* BRAND */}
         <div className="md:col-span-1">
  <h2 className="text-2xl font-light tracking-[0.2em] text-white uppercase mb-6">
    Glamora<span className="text-pink-500">.</span>
  </h2>
  <p className="text-sm leading-loose font-light">
    {t("about") || "Sizin gözəlliyiniz bizim sənətimizdir. Ən son trendlər və peşəkar xidmət ilə hər zaman yanınızdayıq."}
  </p>
  <div className="flex gap-4 mt-6">
    {[
      { name: 'instagram', url: 'https://instagram.com/glamora' },
      { name: 'facebook', url: 'https://facebook.com/glamora' },
      { name: 'whatsapp', url: 'https://wa.me/9945586968' } // Nömrəni bura daxil et
    ].map(social => (
      <a 
        key={social.name} 
        href={social.url}
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-pink-500 hover:text-pink-500 transition-all hover:scale-110"
      >
        <i className={`fa-brands fa-${social.name} text-lg`}></i>
      </a>
    ))}
  </div>
</div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Menu</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link to="/" className="hover:text-pink-500 transition-colors italic">Home</Link></li>
              <li><Link to="/services" className="hover:text-pink-500 transition-colors italic">Services</Link></li>
              <li><Link to="/booking" className="hover:text-pink-500 transition-colors italic">Booking</Link></li>
              <li><Link to="/contact" className="hover:text-pink-500 transition-colors italic">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES PREVIEW */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Xidmətlər</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="hover:text-white cursor-default transition-colors italic">Hair Styling</li>
              <li className="hover:text-white cursor-default transition-colors italic">Professional Makeup</li>
              <li className="hover:text-white cursor-default transition-colors italic">Skin Care</li>
              <li className="hover:text-white cursor-default transition-colors italic">Nail Art</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs">Ünvan</h4>
            <div className="space-y-4 text-sm font-light leading-relaxed italic">
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-pink-500"></i>
                Baku, Azerbaijan <br /> Nizami str. 104
              </p>
              <p className="flex items-center gap-3 italic">
                <i className="fa-solid fa-phone text-pink-500"></i>
                +994 51 000 00 00
              </p>
              <p className="flex items-center gap-3 italic">
                <i className="fa-solid fa-envelope text-pink-500"></i>
                info@glamora.com
              </p>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600">
            2026 Glamora Beauty. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-gray-600">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;