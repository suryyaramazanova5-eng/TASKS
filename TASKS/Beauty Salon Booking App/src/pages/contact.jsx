import React, { useState } from "react";
import contact from "../assets/contactimg.jpg";
import { Bounce, toast, ToastContainer } from "react-toastify";
import faqs from "../data/faqs";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Bütün xanaları doldurun", { position: "top-center" });
      return;
    }

    setLoading(true);

    fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        reply: "",
        date: new Date().toLocaleString(),
      }),
    })
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
        toast.success("Mesajınız uğurla göndərildi!", { transition: Bounce });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER SECTION */}
      <div
        style={{ backgroundImage: `url(${contact})` }}
        className="relative w-full h-[350px] sm:h-[320px]  bg-fixed bg-center flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-white text-4xl sm:text-6xl font-extralight tracking-[0.3em] uppercase italic mb-4">
            Contact Us
          </h1>
          <p className="text-gray-200 text-lg sm:text-xl font-light max-w-2xl mx-auto">
            {t("teklif")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
        

          {/* RIGHT SIDE: MESSAGE FORM */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white space-y-6"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-light text-gray-800">{t("msg")}</h2>
                <p className="text-gray-400 text-sm mt-2">Get back to you within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Ad Soyad</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-100 transition outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">E-poçt</label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-100 transition outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Mesajınız</label>
                <textarea
                  rows="5"
                  placeholder="Bura yazın..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-100 transition outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? "Göndərilir..." : t("send")}
              </button>
            </motion.form>
          </div>
            {/* LEFT SIDE: CONTACT INFO & FAQ */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
              <h2 className="text-2xl font-light text-gray-800 mb-8">{t("Bizimlə Əlaqə")}</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 text-xl">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Call Us</p>
                    <p className="text-gray-700 font-medium">*2024 / 051 558 00 00</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 text-xl">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email</p>
                    <p className="text-gray-700 font-medium">info@glamora.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-50">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="rounded-2xl border border-gray-50 overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50/50 hover:bg-pink-50/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700">{t(faq.question)}</span>
                        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></i>
                      </button>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 text-sm text-gray-500 leading-relaxed bg-white font-light">
                              {t(faq.answer)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING SOCIAL MEDIA */}
      <div className="fixed bottom-8 left-8 flex flex-col gap-4 z-50">
        {[
          { icon: "instagram",  url: 'https://instagram.com/glamora', color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500" },
          { icon: "telegram", link: "https://t.me", color: "hover:bg-blue-400" },
          { icon: "facebook",url: 'https://facebook.com/glamora', color: "hover:bg-blue-600" }
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-lg text-gray-600 transition-all duration-300 transform hover:-rotate-12 hover:text-white ${social.color}`}
          >
            <i className={`fa-brands fa-${social.icon} text-xl`}></i>
          </a>
        ))}
      </div>

      <ToastContainer position="bottom-right" theme="colored" hideProgressBar transition={Bounce} />
    </div>
  );
}

export default Contact;