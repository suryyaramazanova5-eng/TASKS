import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import book from "../assets/booking.jpg";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, items } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });



  const handleBooking = () => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Hesabiniza daxil olun");
      setTimeout(() => {
        navigate("/login")
      }, 1500)
      return
    }

    const newBookings = items.map((item) => ({
      id: Date.now().toString() + Math.random().toString(),
      service: service.title,
      item: item.name,
      price: item.price,
      ...formData,
      itemEmail: item.email,
      userEmail: user?.email,
    }));

    localStorage.setItem("bookings", JSON.stringify([...saved, ...newBookings]));

    toast.success("Rezervasiya edildi");
    setTimeout(() => navigate("/"), 2000);
  };

  const totalPrice = items?.reduce(
    (sum, item) => sum + parseInt(item.price),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, phone, date, time } = formData;

    if (!name) return toast.error("Ad daxil et");
    if (!phone) return toast.error("Telefon daxil et");
    if (!date) return toast.error("Tarix seç");
    if (!time) return toast.error("Saat seç");

    handleBooking();

  }
  window.dispatchEvent(new Event("bookingsUpdated"));
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${book})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24">

        {!service || !items ? (
          <div className="backdrop-blur-md p-8 rounded-2xl text-center">
            <p className="text-2xl mb-4 text-purple-300 ">
              No service selected!
            </p>

            <button
              onClick={() => navigate("/services")}
              className="px-6 py-2 bg-purple-400 hover:bg-purple-500 text-white rounded-full cursor-pointer" >
              Go Services
            </button>
          </div>
        ) : (
          <div className="backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md text-center">

            <div className="flex gap-6">
              <i className="fa-solid fa-arrow-left text-2xl text-purple-300 cursor-pointer " onClick={() => navigate("/services")}></i>
              <h2 className="text-2xl text-purple-300 font-bold mb-4 ">
                {service.title}
              </h2>
            </div>

            <div className="mb-3 flex gap-4 justify-center flex-wrap">
              {items.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg w-44">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-34 object-cover rounded mb-2" />
                  <h3 className="font-semibold text-md text-purple-300">{item.name}</h3>
                  <p className="text-white font-bold text-sm">{item.price}</p>
                </div>
              ))}
            </div>

            <p className="text-lg font-bold text-purple-300 mb-4">
              Total: {totalPrice} AZN
            </p>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-purple-300 p-2 rounded placeholder:text-white"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-purple-300 placeholder:text-white  p-2 rounded"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-purple-300  p-2 rounded"
              />
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border border-purple-300 p-2 rounded" />

              <button
                onClick={handleSubmit}
                className="w-full bg-purple-300 text-white py-2 rounded-full hover:bg-purple-500 cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        <ToastContainer
          theme="colored"
          position="top-center"
        />
      </div>
    </div>
  );
}

export default Booking;