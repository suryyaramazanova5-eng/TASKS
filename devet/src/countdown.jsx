import { useEffect, useState } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-09-04T18:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      {/* Kartın hündürlüyünü h-[220px] və md:h-[280px] ilə artırdım */}
      <div className="bg-white w-full h-[220px] md:h-[280px] flex flex-col items-center justify-center shadow-md border border-[#E996A4]/20 rounded-sm hover:shadow-lg transition-shadow duration-500 relative">
        {/* Üst dekorativ xətt */}
        <div className="absolute top-4 w-12 h-[1px] bg-[#A66F30]/20"></div>

        <h2 className="text-5xl md:text-7xl text-[#39222A] font-fraunces font-light leading-none">
          {value.toString().padStart(2, '0')}
        </h2>

        <div className="w-10 h-[1px] bg-[#A66F30] my-6 opacity-40"></div>

        <p className="font-sans text-[#A66F30] tracking-[3px] text-[11px] md:text-xs uppercase font-medium">
          {label}
        </p>

        {/* Alt dekorativ xətt */}
                            <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30] mt-18"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fdfaf7] py-24 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <p className="font-sans text-[#A66F30] tracking-[5px] uppercase text-[10px] md:text-xs mb-6">
          COUNTDOWN
        </p>

        <p className="text-[#E996A4] font-pinyon mb-4 text-4xl italic">
          Gözəl anımıza
        </p>

        <h1 className="text-5xl md:text-8xl text-[#39222A] font-cormorant mb-12 font-light">
          Birlikdə sayırıq
        </h1>
        
        <p className="font-cormorant text-[#6D555D] text-lg md:text-xl italic m-6 tracking-wide opacity-80">
          Bu xüsusi günə qədər qalan vaxt
        </p>
        <div className="flex items-center justify-center gap-4 mb-12 w-full max-w-xs mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          <TimeUnit value={timeLeft.days} label="GÜN" />
          <TimeUnit value={timeLeft.hours} label="SAAT" />
          <TimeUnit value={timeLeft.minutes} label="DƏQİQƏ" />
          <TimeUnit value={timeLeft.seconds} label="SANİYƏ" />
        </div>

      </div>
    </div>
  );
}