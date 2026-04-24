import React from "react";
import opp11 from "../assets/opp11.jpg";
import opp22 from "../assets/opp22.jpg";
import opp33 from "../assets/opp33.jpg";
import opp44 from "../assets/opp44.jpg";
import design from "../assets/design.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Opp() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goBooking = (name, price) => {
        navigate("/booking", {
            state: {
                selectedServices: [
                    {
                        name,
                        price,
                        category: "Special Offer",
                    },
                ],
            },
        });
    };

    const offers = [
        { id: 1, name: "Hair Magic Offer", price: "100AZN", img: opp11 },
        { id: 2, name: "Glow Up Deal", price: "110AZN", img: opp22 },
        { id: 3, name: "Limited Glow Offers", price: "145AZN", img: opp33 },
        { id: 4, name: "Glamora Specials", price: "119AZN", img: opp44 },
    ];

    return (
        <div className="min-h-screen bg-[#080808] text-white pb-20">
            {/* --- HERO HEADER --- */}
            <div
                className="relative w-full h-[300px] md:h-[500px] bg-center  bg-fixed flex items-center justify-center"
                style={{ backgroundImage: `url(${design})` }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center px-4"
                >
                    <span className="text-pink-500 tracking-[0.4em] uppercase text-xs mb-4 block font-medium">
                        Exclusive Rewards
                    </span>
                    <h1 className="text-3xl md:text-6xl font-light tracking-widest uppercase italic">
                        The new standard <br /> of <span className="text-pink-500">beauty</span>
                    </h1>
                </motion.h1>
            </div>

            {/* --- DESCRIPTION --- */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-3xl border-l-2 border-pink-500 pl-6"
                >
                    {t("23")}
                </motion.h3>
            </div>

            {/* --- OFFERS GRID --- */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                {offers.map((offer, index) => (
                    <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => goBooking(offer.name, offer.price)}
                        className="group relative cursor-pointer overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl"
                    >
                        {/* Image Layer */}
                        <div className="aspect-[16/10] overflow-hidden">
                            <img 
                                src={offer.img} 
                                alt={offer.name}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 brightness-90 group-hover:brightness-100" 
                            />
                        </div>

                        {/* Overlay Information */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-pink-500 text-xs tracking-widest uppercase mb-2 block">
                                        Limited Offer 0{offer.id}
                                    </span>
                                    <h4 className="text-2xl md:text-3xl font-light tracking-wide text-white mb-2">
                                        {offer.name}
                                    </h4>
                                    <p className="text-pink-400 text-xl font-medium">{offer.price}</p>
                                </div>
                                
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                    <i className="fa-solid fa-calendar-check text-pink-500 text-xl"></i>
                                </div>
                            </div>
                        </div>

                        {/* Hover Border Border */}
                        <div className="absolute inset-6 border border-white/0 group-hover:border-white/10 transition-all duration-700 rounded-[1.5rem] pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>

            {/* --- FOOTER CALL TO ACTION --- */}
            <div className="mt-24 text-center">
                <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-pink-500 to-transparent w-full max-w-md mb-8"></div>
                <p className="text-gray-500 tracking-[0.2em] uppercase text-sm italic">
                    Appointments fill up fast. Secure yours today.
                </p>
            </div>
        </div>
    );
}

export default Opp;