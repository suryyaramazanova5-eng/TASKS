import { useState, useEffect } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyusRUqYp5nQ0URzihZRSXsAwbzYXVS9UGID6B31ByHS9nAFbPgWD3kFy-9-TXhRbUu/exec";

export default function RSVP() {
  const [guestCount, setGuestCount] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [allRSVPs, setAllRSVPs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Google Sheets-dən xoş sözləri gətiririk
  const loadRSVPs = async () => {
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setAllRSVPs(data.reverse());
      }
    } catch (error) {
      console.error("RSVP-lər yüklənmədi:", error);
    }
  };

  useEffect(() => {
    loadRSVPs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      alert("Zəhmət olmasa Ad, Soyad və Telefon sahələrini doldurun.");
      return;
    }

    setLoading(true);

    const newRSVP = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      guestCount,
      message: message.trim(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(newRSVP),
      });

      // Ekranda dərhal göstəririk
      setAllRSVPs((prev) => [
        {
          ...newRSVP,
          date: new Date().toLocaleString(),
        },
        ...prev,
      ]);

      setIsSent(true);

      setFullName("");
      setPhone("");
      setMessage("");
      setGuestCount(1);

      // Google Sheets-ə yazılması üçün bir az gözləyirik
      setTimeout(() => {
        loadRSVPs();
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Cavab göndərilərkən xəta baş verdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#fdfaf7] py-24 px-4 min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">

        <p className="font-sans text-[#A66F30] tracking-[5px] uppercase text-[10px] md:text-xs mb-4">
          R.S.V.P
        </p>

        <p className="text-[#E996A4] font-pinyon text-4xl italic">
          Şərəfimiz olar
        </p>

        <h1 className="text-5xl md:text-8xl text-[#39222A] font-cormorant font-light">
          İştirakınızı təsdiqləyin
        </h1>

        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-10">
          Bu xüsusi anı bizimlə bölüşəcəyinizi bildirin
        </p>

        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>

          <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>

          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
        </div>

        {/* Uğur mesajı */}
        {isSent ? (
          <div className="max-w-2xl mx-auto border border-[#f3ece6] p-8 md:p-14 bg-white shadow-sm">
            <h2 className="text-2xl text-[#39222A] font-cormorant mb-4">
              Təşəkkür edirik!
            </h2>

            <p className="text-[#6D555D] font-cormorant italic text-lg">
              Cavabınız uğurla qeydə alındı. Sizi aramızda görməyə şad olarıq!
            </p>

            <button
              onClick={() => setIsSent(false)}
              className="mt-6 text-[11px] tracking-[3px] text-[#b8860b] underline uppercase"
            >
              Yeni cavab göndər
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            className="relative max-w-2xl mx-auto border border-[#f3ece6] p-8 md:p-14"
          >

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">

              <div>
                <label className="block text-[11px] tracking-[6px] text-[#6e5d5d] mb-3">
                  AD VƏ SOYAD
                </label>

                <input
                  type="text"
                  placeholder="Adınızı daxil edin"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#eee] px-5 py-4 outline-none bg-white text-[#5a4a4a] focus:border-[#c69214]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-[6px] text-[#6e5d5d] mb-3">
                  TELEFON
                </label>

                <input
                  type="text"
                  placeholder="+994 XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#eee] px-5 py-4 outline-none bg-white text-[#5a4a4a] focus:border-[#c69214]"
                  required
                />
              </div>

            </div>

            {/* Guest Count */}
            <div className="mb-10">

              <label className="block text-[11px] tracking-[6px] text-[#6e5d5d] mb-5">
                QONAQ SAYI
              </label>

              <div className="flex gap-3 justify-center md:justify-start">

                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setGuestCount(num)}
                    className={`w-13 h-13 border text-lg transition-all ${guestCount === num
                        ? "bg-[#b8860b] text-white border-[#b8860b]"
                        : "bg-white text-[#5e4a4a] border-[#ececec]"
                      }`}
                  >
                    {num}
                  </button>
                ))}

              </div>
            </div>

            {/* Message */}
            <div className="mb-10">

              <label className="block text-[11px] tracking-[6px] text-[#6e5d5d] mb-3">
                ÜRƏK SÖZÜ (İSTƏYƏ BAĞLI)
              </label>

              <textarea
                rows="4"
                placeholder="Bizə xoş arzularınızı yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-[#eee] px-5 py-4 outline-none resize-none text-[#5e4a4a] focus:border-[#c69214]"
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b8860b] hover:bg-[#9d7205] disabled:opacity-60 text-white py-4 tracking-[5px] transition-all cursor-pointer"
            >
              {"♡ CAVABI GÖNDƏR"}
            </button>

          </form>
        )}

        

        <section className="mt-9 text-center overflow-hidden">
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="font-sans text-[#A66F30] tracking-[4px] uppercase text-xs mb-6">
              Guest book
            </h2>
            <p className="text-[#E996A4] font-pinyon mb-6 text-4xl">Sizdən bizə</p>
            <p className="text-[#39222A] font-cormorant text-5xl md:text-7xl mb-6">
              Ürək sözləri
            </p>
            <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-10">
              Sevdiklərimizdən bizə yazılan zərif sətirlər
            </p>

            <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
            </div>

            <div className="mt-20 border-y border-[#f1e7e2] bg-white/30 py-16 relative overflow-hidden">
              {(() => {
                const validMessages = allRSVPs.filter(
                  (r) => r.message && r.message.trim() !== ""
                );

                if (validMessages.length === 0) {
                  return (
                    <div className="w-full flex items-center justify-center py-16">
                      <p className="font-cormorant italic text-[#6D555D]/60 text-3xl text-center tracking-wide">
                        İlk xoş arzunu bizimlə bölüş...
                      </p>
                    </div>
                  );
                }

                const repeatedMessages =
                  validMessages.length < 5
                    ? [
                      ...validMessages,
                      ...validMessages,
                      ...validMessages,
                      ...validMessages,
                    ]
                    : [...validMessages, ...validMessages];

                return (
                  <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
                    {repeatedMessages.map((rsvp, index) => (
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
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* --- Soldan Sağa Animasiya Stili --- */}
          <style jsx>{`
    @keyframes marquee {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
  `}</style>
        </section>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>

    </section>
  );
}