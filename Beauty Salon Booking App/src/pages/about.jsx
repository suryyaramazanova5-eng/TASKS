import React from "react";
import about from "../assets/about.jpg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function About() {
    const { t } = useTranslation();

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
            <div
                className="relative w-full h-[500px] md:h-[550px] bg-cover bg-fixed bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${about})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0a0a0a]"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >

                    <h1 className="text-4xl md:text-8xl font-extralight tracking-[0.2em] uppercase italic leading-tight">
                        {t("11")}
                    </h1>

                </motion.div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20">
                <motion.div
                    {...fadeInUp}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl"
                >
                    <div className="grid md:grid-cols-1 gap-8 text-center md:text-left">
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-gray-300 italic">
                            <span className="text-pink-500 text-5xl font-serif mr-2">"</span>
                            {t("1")}
                        </p>

                        <div className="flex items-center gap-6 my-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                        </div>

                        <p className="text-lg md:text-xl text-gray-400 font-light leading-loose text-justify">
                            {t("2")}
                        </p>

                        <p className="text-lg md:text-xl text-gray-400 font-light leading-loose text-justify">
                            {t("3")}
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { count: "10+", label: "Years Experience" },
                    { count: "5K+", label: "Happy Clients" },
                    { count: "15+", label: "Specialists" },
                    { count: "100%", label: "Natural Products" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="p-8 rounded-3xl bg-white/[0.02] border border-white/5"
                    >
                        <h3 className="text-4xl font-bold text-pink-500 mb-2">{stat.count}</h3>
                        <p className="text-gray-500 uppercase tracking-widest text-xs">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-32">
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        { title: t("4"), desc: t("5"), icon: "fa-gem" },
                        { title: t("6"), desc: t("7"), icon: "fa-leaf" },
                        { title: t("8"), desc: t("9"), icon: "fa-star" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group bg-gradient-to-b from-white/5 to-transparent p-10 rounded-[2.5rem] border border-white/5 hover:border-pink-500/30 transition-all duration-500"
                        >
                            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 text-2xl mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                                <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <h2 className="text-2xl font-medium mb-4 tracking-wide">{item.title}</h2>
                            <p className="text-gray-500 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mt-32"
            >
                <p className="text-gray-600 tracking-[0.3em] uppercase text-sm italic">
                    {t("10")}
                </p>
                <div className="mt-4 flex justify-center gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-pink-500/30 rounded-full"></div>)}
                </div>
            </motion.div>
        </div>
    );
}

export default About;