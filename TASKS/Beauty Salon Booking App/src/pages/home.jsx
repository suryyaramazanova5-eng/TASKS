import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import team from "../data/team";
import image from "../assets/home.jpg";
import g1 from "../assets/g1.jpg";
import g2 from "../assets/g2.jpg";
import g3 from "../assets/g3.jpg";
import g4 from "../assets/g4.jpg";
import g5 from "../assets/g5.jpg";
import g6 from "../assets/g6.jpg";
import g7 from "../assets/g7.jpg";
import opp11 from "../assets/opp11.jpg";
import opp22 from "../assets/opp22.jpg";
import opp33 from "../assets/opp33.jpg";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const gallery = [
    { img: g1, title: "Hair styling" },
    { img: g2, title: "Makeup" },
    { img: g3, title: "Nail Art" },
    { img: g4, title: "Skin care" },
    { img: g5, title: "Salon Interior" },
    { img: g6, title: "Laser specialist" },
    { img: g7, title: "Glamora man" },


  ];

  const opp = [{ img: opp11 }, { img: opp22 }, { img: opp33 }];

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);

  const avg = reviews.length > 0
    ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
    : 0;

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const addReview = (e) => {
    e.preventDefault();
    if (!name || !text || rating === 0) return;
    const newReview = { name, text, rating, date: new Date().toLocaleDateString() };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setName(""); setText(""); setRating(0);
  };

  const deleteReview = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  return (
    <div className="w-full bg-[#fafafa]">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 w-full max-w-7xl px-8 md:px-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-pink-400 tracking-[0.4em] uppercase text-sm mb-4 block"
          >
            Welcome to luxury
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-light text-white leading-tight uppercase tracking-tighter"
          >
            Glamora <br /> <span className="font-serif italic text-pink-500">Beauty Salon</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-lg mt-6 font-light"
          >
            {t("title")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-10"
          >
            <button onClick={() => navigate("/booking")} className="px-10 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all shadow-lg shadow-pink-600/30 font-medium">
              {t("button")}
            </button>
            <button onClick={() => navigate("/services")} className="px-10 py-4 border border-white/30 text-white rounded-full backdrop-blur-md hover:bg-white hover:text-black transition-all">
              {t("btn")}
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm text-pink-500 tracking-[0.3em] uppercase mb-2">Special Offers</h2>
            <h3 className="text-4xl font-light">{t("weekly")}</h3>
          </div>
          <button onClick={() => navigate("/opp")} className="hidden md:flex items-center gap-2 text-gray-500 hover:text-pink-600 transition">
            {t("imkan")} <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opp.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="relative aspect-[6/5] overflow-hidden rounded-[2rem] shadow-xl group cursor-pointer"
              onClick={() => navigate("/opp")}
            >
              <img src={item.img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="offer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#080808] text-white">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-pink-500/80 tracking-[0.5em] uppercase text-[10px] mb-3 block"
          >
            Master Artisans
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            Meet our <span className="font-serif italic text-pink-500">experts</span>
          </h2>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-8 md:px-32">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8">
                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <img
                  src={member.img}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                  alt={member.name}
                />


                <div className="absolute inset-4 border border-white/10 group-hover:border-pink-500/30 transition-all duration-700 rounded-xl"></div>
              </div>

              <div className="relative pl-4 border-l border-white/5 group-hover:border-pink-500 transition-colors duration-500">
                <h3 className="text-2xl font-light tracking-wide group-hover:text-pink-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mt-2 group-hover:text-gray-300 transition-colors">
                  {member.role}
                </p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <i className="fa-solid fa-plus text-xs"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto">
  <div className="text-center mb-16">
    <h2 className="text-sm text-pink-500 tracking-[0.4em] uppercase mb-3 font-bold">Our Masterpieces</h2>
    <h3 className="text-4xl md:text-6xl font-light tracking-tight text-gray-800">
      Visual <span className="font-serif italic text-pink-500">Journey</span>
    </h3>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {gallery.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`relative overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-xl transition-all duration-500
          ${
            index === 6 
            ? "lg:col-span-1 h-[400px] md:h-[400px]" 
            : index === 1 || index === 4 
            ? "md:row-span-2 h-[500px] md:h-[820px]" 
            : "h-[350px] md:h-[400px]" 
          }
        `}
      >
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
          
          <h4 className="text-white text-3xl font-light italic translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
            {item.title}
          </h4>
        </div>

      
      </motion.div>
    ))}
  </div>
</section>

      <section className="py-24 bg-[#0f0f0f] text-white">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-pink-500 font-medium">Testimonials</span>
            <h2 className="text-5xl font-light mt-4 mb-6">What our clients say</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-6xl font-bold text-pink-500">{avg}</div>
              <div>
                <div className="flex text-yellow-400 gap-1">
                  {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star text-sm"></i>)}
                </div>
                <p className="text-gray-400 text-sm mt-1">Based on {reviews.length} reviews</p>
              </div>
            </div>

            <form onSubmit={addReview} className="space-y-4 bg-white/5 p-8 rounded-3xl border border-white/10">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("name")} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-pink-500 transition" />
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("review")} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-32 outline-none focus:border-pink-500 transition" />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      className={`fa-solid fa-star cursor-pointer text-xl transition ${(hoverRating || rating) >= star ? "text-yellow-400" : "text-white/20"}`} />
                  ))}
                </div>
                <button className="bg-pink-600 px-8 py-3 rounded-xl hover:bg-pink-700 transition">Post Review</button>
              </div>
            </form>
          </div>

          <div className="h-[500px] overflow-y-auto pr-4 custom-scrollbar space-y-6">
            <AnimatePresence>
              {reviews.map((r, idx) => (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-lg">{r.name}</h4>
                      <div className="flex text-yellow-500 text-[10px] gap-1 mt-1">
                        {Array.from({ length: r.rating }).map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                      </div>
                    </div>
                    <button onClick={() => deleteReview(idx)} className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <p className="text-gray-400 font-light italic leading-relaxed">"{r.text}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="relative">
        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.18552605517!2d49.8552199!3d40.4092616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d40a03531f9%3A0x7593e5954f2c98c7!2sBaku!5e0!3m2!1sen!2saz!4v1715000000000!5m2!1sen!2saz" width="100%" height="500" style={{ border: 0, filter: "grayscale(1) invert(0.9)" }} allowFullScreen="" loading="lazy"></iframe>
        <a href="https://wa.me/994515586968" target="_blank" rel="noopener noreferrer" className="fixed bottom-10 right-10 w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-all z-50 animate-bounce">
          <i className="fa-brands fa-whatsapp text-3xl"></i>
        </a>
      </section>

      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white max-w-4xl w-full rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative">
              <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
              <div className="md:w-1/2 ">
                <img src={selectedMember.img} className="w-full h-full " alt="" />
              </div>
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h2 className="text-4xl font-serif italic mb-2">{selectedMember.name}</h2>
                <p className="text-pink-600 tracking-widest uppercase text-sm mb-6">{selectedMember.role}</p>
                <p className="text-gray-600 leading-relaxed mb-8">{selectedMember.about || "Expert in creating beauty and confidence for every client."}</p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center border border-gray-200 rounded-2xl hover:text-pink-600 transition"
                  >
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;