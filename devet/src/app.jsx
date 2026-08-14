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

        // Eyni səhifədə və ya digər tablarda olan dəyişiklikləri tutmaq üçün
        window.addEventListener('storage', updateData);
        // Custom event yaradıb RSVP-dən tetikləyə bilərik (aşağıda izah olunub)
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
                    <div className="absolute left-[-30px] md:left-[-50px] top-[15%] w-[120px] md:w-[250px] opacity-80 pointer-events-none animate-pulse">
                        <img src={rose} alt="decor" className="w-full h-auto" />
                    </div>

                    {/* Sağ Gül */}
                    <div className="absolute right-[-30px] md:right-[50px] bottom-[15%] w-[120px] md:w-[250px] opacity-80 pointer-events-none animate-pulse">
                        <img src={rose} alt="decor" className="w-full h-auto" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <p className='font-sans text-[#A66F30] tracking-[4px] uppercase text-xs md:text-sm mb-6'>
                            Toy mərasimi <span className="mx-2 text-xl">·</span> M M X X V I
                        </p>
                        <p className='text-[#E996A4] font-pinyon mb-6 text-3xl md:text-4xl'>Bizimlə paylaşın</p>

                        <h1 className="text-6xl md:text-8xl text-[#39222A] font-pinyon leading-tight">Səxavət</h1>

                        <div className="flex items-center justify-center gap-6 my-4 w-64 md:w-80 mx-auto">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <span className="text-[#A66F30] font-cormorant text-3xl italic">&</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <h1 className="text-6xl md:text-8xl text-[#39222A] font-pinyon leading-tight">Mələknisə</h1>

                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <p className='font-cormorant text-[#6D555D] text-lg md:text-xl mt-4 leading-relaxed max-w-2xl px-6'>
                            İki ürəyin bir olduğu, sevginin əbədiyyətə qovuşduğu <br />
                            bu xüsusi anı sizinlə bölüşməkdən şərəf duyacağıq.
                        </p>

                        <div className="flex flex-col md:flex-row items-center mt-12 gap-8 md:gap-20">
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
                        <a href='#rsvp' className="inline-block px-11 py-3 border mt-8 border-[#A66F30] text-[#A66F30] hover:bg-[#A66F30] hover:text-white transition-all duration-500 text-[10px] tracking-widest uppercase">
                            Cavab göndər
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
                            {/* 1-ci Kart: Qarşılama */}
                            <div className="group bg-white/40 backdrop-blur-md border border-[#A66F30]/10 p-8 md:p-12 transition-all duration-700 hover:bg-white/80 flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 mx-auto rounded-full border border-[#A66F30]/30 flex items-center justify-center text-[#A66F30] text-3xl mb-6 group-hover:scale-110">
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

                            {/* 2-ci Kart: Giriş */}
                            <div className="group bg-white/40 backdrop-blur-md border border-[#A66F30]/10 p-8 md:p-12 transition-all duration-700 hover:bg-white/80 flex flex-col justify-between">
                                <div>
                                    <div className="w-16 h-16 mx-auto rounded-full border border-[#A66F30]/30 flex items-center justify-center text-[#A66F30] text-3xl mb-6 group-hover:scale-110">🍽</div>
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
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.505389310262!2d49.96579537626311!3d40.37549027144623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403064a1d6d8aa59%3A0x6909e952e48bdf4c!2zIlZlbmVzaXlhIiDFn2FkbMSxcSBzYXJhecSx!5e0!3m2!1sen!2saz!4v1786697406655!5m2!1sen!2saz" width="950" height="450"  ></iframe>
                        </div>
                        <a href="https://maps.app.goo.gl/NuMEfcDAwPu7DV2z6" target="_blank" rel="noopener noreferrer" className="inline-block px-11 py-3 border border-[#A66F30] text-[#A66F30] hover:bg-[#A66F30] hover:text-white transition-all duration-500 text-[10px] tracking-widest uppercase">
                            <i className="fa-solid fa-location-dot"></i> Xəritədə bax
                        </a>
                    </div>
                </section>

                {/* --- RSVP FORM --- */}
                <div id="rsvp">
                    <RSVP />
                </div>

                {/* --- GUEST BOOK --- */}
                <section className="bg-[#F3EBE780] py-24 px-4 text-center overflow-hidden">
                    <div className="w-full max-w-4xl mx-auto">
                        <h2 className="font-sans text-[#A66F30] tracking-[4px] uppercase text-xs mb-6">Guest book</h2>
                        <p className='text-[#E996A4] font-pinyon mb-6 text-4xl'>Sizdən bizə</p>
                        <p className="text-[#39222A] font-cormorant text-5xl md:text-7xl mb-6">Ürək sözləri</p>
                        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-10">
                            Sevdiklərimizdən bizə yazılan zərif sətirlər
                        </p>

                        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
                        </div>

                        <div className="mt-20 border-y border-[#f1e7e2] bg-white/30 py-16 relative overflow-hidden">
                            <div className="flex animate-marquee gap-8">
                                {(() => {
                                    const validMessages = allRSVPs.filter(r => r.message && r.message.trim() !== "");

                                    if (validMessages.length === 0) {
                                        return (
                                            <div className="w-full flex items-center justify-center py-16">
                                                <p className="font-cormorant italic text-[#6D555D]/60 text-3xl text-center tracking-wide ">
                                                    İlk xoş arzunu bizimlə bölüş...
                                                </p>
                                            </div>
                                        );
                                    }

                                    // Loop kəsilməsin deyə massivi bir az çoxaldırıq
                                    const repeatedMessages = validMessages.length < 5
                                        ? [...validMessages, ...validMessages, ...validMessages, ...validMessages]
                                        : [...validMessages, ...validMessages];

                                    return repeatedMessages.map((rsvp, index) => (
                                        <div
                                            key={`${rsvp.id}-${index}`}
                                            className="inline-block w-[320px] h-[300px] bg-white border border-[#f1e7e2] p-10 shadow-md relative group shrink-0 transition-transform duration-500 hover:scale-105"
                                        >
                                            <div className="absolute top-6 right-6 text-[#c69214] opacity-20 group-hover:opacity-100 transition-opacity">
                                                <span className="text-3xl">✦</span>
                                            </div>

                                            <div className="flex flex-col h-full justify-between items-center text-center">
                                                <div className="w-12 h-[1.5px] bg-[#A66F30] mb-6"></div>

                                                <div className="flex-1 flex items-center px-2 w-full justify-center overflow-hidden">
                                                    <p className="font-cormorant text-2xl italic text-[#39222A] leading-relaxed line-clamp-4 whitespace-normal break-words">
                                                        "{rsvp.message}"
                                                    </p>
                                                </div>

                                                <div className="mt-8 w-full">
                                                    <div className="h-[1px] w-16 bg-[#f1e7e2] mx-auto mb-4"></div>
                                                    <p className="font-sans text-[12px] font-extrabold uppercase tracking-[4px] text-[#A66F30] truncate">
                                                        {rsvp.fullName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </section>

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