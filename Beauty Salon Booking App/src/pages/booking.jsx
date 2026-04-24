import React, { useState } from "react";
import bookingImg from "../assets/booking.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import servis from "../assets/servis.jpg";
import { motion } from "framer-motion"; // Animasiya üçün

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { selectedServices = [] } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const totalPrice = selectedServices.reduce(
    (sum, item) => sum + parseInt(item.price || 0),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, time } = formData;

    if (!name || !phone || !date || !time) {
      toast.error("Bütün xanaları doldurun");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBookings = selectedServices.map((item) => ({
      id: Date.now() + Math.random(),
      service: item.name,
      price: item.price,
      date: formData.date,
      time: formData.time,
      userEmail: user.email.toLowerCase().trim(),
      userName: formData.name,
      phone: formData.phone,
    }));

    localStorage.setItem("bookings", JSON.stringify([...saved, ...newBookings]));
    window.dispatchEvent(new Event("storage"));
    toast.success("Rezervasiya edildi");

    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div
        className="relative w-full h-[300px] flex items-center justify-center bg-center"
        style={{ backgroundImage: `url(${bookingImg})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-white text-5xl md:text-7xl font-extralight tracking-[0.2em] uppercase italic">
            Book Now
          </h1>
          <div className="h-1 w-20 bg-pink-400 mx-auto mt-4"></div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <h2 className="text-2xl font-light text-center mb-10 text-white drop-shadow-md">
          {t("brand")}
        </h2>

        {!user ? (
          /* Login Required State */
          <div className="bg-white rounded-[2rem] shadow-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-lock text-3xl"></i>
            </div>
            <p className="text-gray-600 text-xl mb-8 font-light">{t("login")}</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 bg-pink-500 text-white rounded-2xl hover:bg-pink-600 transition shadow-lg shadow-pink-100 font-medium"
            >
              Login to Account
            </button>
          </div>
        ) : selectedServices.length === 0 ? (
          /* Empty Services State */
          <div className="bg-white rounded-[2rem] shadow-2xl p-12 text-center max-w-2xl mx-auto">
            <img src={servis} alt="servis" className="w-64 mx-auto mb-8 opacity-80" />
            <p className="text-gray-500 text-xl mb-8 font-light">{t("serv")}</p>
            <button
              onClick={() => navigate("/services")}
              className="px-10 py-4 border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition duration-300 font-medium"
            >
              {t("go")}
            </button>
          </div>
        ) : (
          /* Booking Form & Summary */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-white/20"
            >
              <h3 className="text-2xl font-light text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                {t("select")}
              </h3>
              
              <div className="space-y-4 mb-8">
                {selectedServices.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-pink-50 transition-colors">
                    <div>
                      <p className="text-xs text-pink-400 uppercase tracking-widest font-bold">{item.category || "Service"}</p>
                      <p className="text-gray-700 font-medium">{item.name}</p>
                    </div>
                    <span className="font-semibold text-gray-900">{item.price} AZN</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 flex justify-between items-center">
                <span className="text-gray-500 text-lg">Total Amount</span>
                <span className="text-3xl font-light text-pink-500">{totalPrice} AZN</span>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50"
            >
               <h3 className="text-2xl font-light text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Details
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition"
                  />
                </div>

                <div className="relative">
                  <i className="fa-solid fa-phone-flip absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition text-gray-600"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none transition text-gray-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-pink-100 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {t("book")}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/services1")}
                    className="w-full text-gray-400 hover:text-pink-500 py-2 transition font-light"
                  >
                    ← {t("go")}
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </div>

      <ToastContainer position="top-center" theme="colored" hideProgressBar />
    </div>
  );
}

export default Booking;