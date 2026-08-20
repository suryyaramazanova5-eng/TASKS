import React, { useEffect, useState } from 'react';
import back from "./assets/backg.jpg";
import rose from "./assets/rose-branch.jpg";
import Countdown from './countdown';
import RSVP from './rsvp';
import Petals from './petals';

function App() {
    const [allRSVPs, setAllRSVPs] = useState([]);

    // LocalStorage-dən məlumatları gətiririk və yenilənmələri dinləyirik
    useEffect(() => {
        const updateData = () => {
            const data = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
            setAllRSVPs(data);
        };

        updateData();

        window.addEventListener('storage', updateData);
        window.addEventListener('rsvp_updated', updateData);

        return () => {
            window.removeEventListener('storage', updateData);
            window.removeEventListener('rsvp_updated', updateData);
        };
    }, []);

    return (
        <div className="relative font-serif bg-[#fdfaf7] overflow-x-hidden">
            <Petals />
            
            {/* CSS Animasiyaları */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    animation: marquee 40s linear infinite;
                    width: max-content;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }

                /* Zərif Açılış Animasiyaları */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(35px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.88);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .anim-fade-up {
                    animation: fadeInUp 1.3s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .anim-scale-in {
                    animation: scaleIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .anim-fade-in {
                    animation: fadeIn 1.6s ease-out both;
                }
            ` }} />

            <div className="relative z-10 text-center">

                {/* --- HERO SECTION --- */}
                <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center -z-10"
                        style={{ backgroundImage: `url(${back})` }}
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] -z-10" />

                    {/* Sol Gül */}
                    <div className="absolute left-[-30px] md:left-[-50px] top-[15%] w-[120px] md:w-[250px] opacity-80 pointer-events-none animate-pulse anim-fade-in [animation-delay:200ms]">
                        <img src={rose} alt="decor" className="w-full h-auto" />
                    </div>

                    {/* Sağ Gül */}
                    <div className="absolute right-[-30px] md:right-[50px] bottom-[15%] w-[120px] md:w-[250px] opacity-80 pointer-events-none animate-pulse anim-fade-in [animation-delay:400ms]">
                        <img src={rose} alt="decor" className="w-full h-auto" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <p className='font-sans text-[#A66F30] tracking-[4px] uppercase text-xs md:text-sm mb-6 anim-fade-up [animation-delay:200ms]'>
                            Toy mərasimi <span className="mx-2 text-xl">·</span> M M X X V I
                        </p>

                        <p className='text-[#E996A4] font-pinyon mb-6 text-3xl md:text-4xl anim-fade-up [animation-delay:400ms]'>
                            Bizimlə paylaşın
                        </p>

                        <h1 className="text-6xl md:text-8xl text-[#39222A] font-pinyon leading-tight anim-scale-in [animation-delay:600ms]">
                            Səxavət
                        </h1>

                        <div className="flex items-center justify-center gap-6 my-4 w-64 md:w-80 mx-auto anim-fade-in [animation-delay:800ms]">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <span className="text-[#A66F30] font-cormorant text-3xl italic">&</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <h1 className="text-6xl md:text-8xl text-[#39222A] font-pinyon leading-tight anim-scale-in [animation-delay:1000ms]">
                            Mələknisə
                        </h1>

                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4 anim-fade-in [animation-delay:1200ms]">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <p className='font-cormorant text-[#6D555D] text-lg md:text-xl mt-4 leading-relaxed max-w-2xl px-6 anim-fade-up [animation-delay:1400ms]'>
                            İki ürəyin bir olduğu, sevginin əbədiyyətə qovuşduğu <br />
                            bu xüsusi anı sizinlə bölüşməkdən şərəf duyacağıq.
                        </p>

                        <div className="flex flex-col md:flex-row items-center mt-12 gap-8 md:gap-20 anim-fade-up [animation-delay:1600ms]">
                            <div className="text-center md:text-right">
                                <p className='mb-2 text-[#A66F30] font-sans tracking-[4px] text-[10px] uppercase'>Tarix</p>
                                <p className='font-pinyon text-4xl text-[#39222A]'>04 Sentyabr 2026</p>
                            </div>
                            <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-[#A66F30]/40 to-transparent"></div>
                            <div className="text-center md:text-left">
                                <p className='mb-2 text-[#A66F30] font-sans tracking-[4px] text-[10px] uppercase'>Saat</p>
                                <p className='font-pinyon text-4xl text-[#39222A]'>18:00</p>
                            </div>
                        </div>

                        <a href='#rsvp' className="inline-block px-11 py-3 border mt-8 border-[#A66F30] text-[#A66F30] hover:bg-[#A66F30] hover:text-white transition-all duration-500 text-[10px] tracking-widest uppercase anim-fade-up [animation-delay:1800ms]">
                            Cavab göndər
                            <i className="fa-solid fa-arrow-down-long text-xl ml-3"></i>
                        </a>
                    </div>
                </section>

                {/* --- COUNTDOWN --- */}
                <div className="bg-[#fdfaf7] py-20">
                    <Countdown />
                </div>

                {/* --- PROGRAMME --- */}
                <section id="programme" className="relative bg-[#F3EBE7]/60 py-24 px-4 text-center">
                    <div className="w-full max-w-6xl mx-auto relative z-10">
                        <h2 className="font-sans text-[#A66F30] tracking-[4px] uppercase text-[10px] md:text-xs mb-3">Programme</h2>
                        <p className='text-[#E996A4] font-pinyon mb-3 text-4xl'>Tədbir axşamı</p>
                        <p className="text-[#39222A] font-cormorant text-5xl md:text-7xl leading-tight mb-6">Bizi gözləyən anlar</p>
                        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-8">
                            Axşamımızın incə təşkili - hər anı sizin üçün
                        </p>
                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                            {/* 1-ci Kart */}
                            <div className="group bg-white/40 backdrop-blur-md border border-[#A66F30]/10 p-8 md:p-12 transition-all duration-700 hover:bg-white/80 flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 mx-auto rounded-full border border-[#A66F30]/30 flex items-center justify-center text-[#A66F30] text-3xl mb-6 group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-calendar text-[#A66F30]"></i>
                                    </div>
                                    <p className="font-pinyon text-5xl md:text-6xl text-[#A66F30] mb-2">18:00</p>
                                    <h3 className="text-[#39222A] font-cormorant text-2xl min-h-[4rem] flex items-center justify-center py-2 px-4 leading-tight">
                                        Qarşılama
                                    </h3>
                                </div>
                                <div>
                                    <div className="w-12 h-[1px] bg-[#A66F30]/30 mx-auto my-6"></div>
                                    <p className="text-[#6D555D] italic font-cormorant text-lg">Qonaqların qəbulu və xoşgəldin kokteyli</p>
                                </div>
                            </div>

                            {/* 2-ci Kart */}
                            <div className="group bg-white/40 backdrop-blur-md border border-[#A66F30]/10 p-8 md:p-12 transition-all duration-700 hover:bg-white/80 flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 mx-auto rounded-full border border-[#A66F30]/30 flex items-center justify-center text-[#A66F30] text-3xl mb-6 group-hover:scale-110 transition-transform">🍽</div>
                                    <p className="font-pinyon text-5xl md:text-6xl text-[#A66F30] mb-2">19:00</p>
                                    <h3 className="text-[#39222A] font-cormorant text-2xl min-h-[4rem] flex items-center justify-center py-2 px-4 leading-tight">
                                        Bəy və gəlinin girişi
                                    </h3>
                                </div>
                                <div>
                                    <div className="w-12 h-[1px] bg-[#A66F30]/30 mx-auto my-6"></div>
                                    <p className="text-[#6D555D] italic font-cormorant text-lg">Təntənəli giriş və xoş anlar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- LOCATION --- */}
                <section id="location" className="bg-[#F3EBE780] py-24 px-4 text-center">
                    <div className="w-full max-w-4xl mx-auto">
                        <h2 className="font-sans text-[#A66F30] tracking-[4px] uppercase text-xs mb-6">The Venue</h2>
                        <p className='text-[#E996A4] font-pinyon mb-6 text-4xl'>Sizi gözləyirik</p>
                        <p className="text-[#39222A] font-cormorant text-5xl md:text-7xl mb-6">Venesiya Şadlıq Sarayı</p>
                        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-8">
                            Bakı şəhərinin ürəyində, bu axşamın sehrli məkanı
                        </p>
                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>
                        <div className="w-full overflow-hidden rounded-lg shadow-xl border border-[#A66F30]/10 mb-12">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.505389310262!2d49.96579537626311!3d40.37549027144623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403064a1d6d8aa59%3A0x6909e952e48bdf4c!2zIlZlbmVzaXlhIiDFn2FkbMSxcSBzYXJhecSx!5e0!3m2!1sen!2saz!4v1786697406655!5m2!1sen!2saz" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                                title="Venesiya Map"
                            ></iframe>
                        </div>
                        <a href="https://maps.app.goo.gl/NuMEfcDAwPu7DV2z6" target="_blank" rel="noopener noreferrer" className="inline-block px-11 py-3 border border-[#A66F30] text-[#A66F30] hover:bg-[#A66F30] hover:text-white transition-all duration-500 text-[10px] tracking-widest uppercase">
                            <i className="fa-solid fa-location-dot mr-2"></i> Xəritədə bax
                        </a>
                    </div>
                </section>

                {/* --- RSVP FORM --- */}
                <div id="rsvp">
                    <RSVP />
                </div>

               

                {/* --- FOOTER SECTION --- */}
                <section className="bg-[#F3EBE780] py-24 px-4 text-center">
                    <div className="w-full max-w-4xl mx-auto relative">
                        <div className="w-[60px] md:w-[120px] mx-auto mb-8 opacity-80 pointer-events-none scale-x-[-1] animate-pulse">
                            <img src={rose} alt="decor" className="w-full h-auto" />
                        </div>

                        <p className='text-[#E996A4] font-pinyon mb-6 text-4xl'>Sevgi ilə</p>
                        <p className="text-[#39222A] font-pinyon text-5xl md:text-7xl mb-6">Səxavət & Mələknisə</p>

                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <p className='font-sans text-[#A66F30] tracking-[4px] uppercase text-xs md:text-sm mb-10'>
                            04 <span className="mx-2">·</span> 09 <span className="mx-2">·</span> M M X X V I
                        </p>

                        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-10">
                            Sizi aramızda görməyi səbirsizliklə gözləyirik
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;