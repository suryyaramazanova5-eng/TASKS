import { useState, useEffect } from "react";

export default function RSVP() {
  const [guestCount, setGuestCount] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [allRSVPs, setAllRSVPs] = useState([]);

  // LocalStorage-dən məlumatları gətiririk
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
    setAllRSVPs(data);
  }, []);

  const handleSaveToLocal = (e) => {
    e.preventDefault();

    // Boş buraxılmaması gərəkən sahələrin yoxlanılması
    if (!fullName.trim() || !phone.trim()) {
      alert("Zəhmət olmasa Ad, Soyad və Telefon sahələrini doldurun.");
      return;
    }

    const newRSVP = {
      id: Date.now(),
      fullName,
      phone,
      guestCount,
      message,
      date: new Date().toLocaleString(),
    };

    const updatedRSVPs = [newRSVP, ...allRSVPs];
    localStorage.setItem("wedding_rsvps", JSON.stringify(updatedRSVPs));
    setAllRSVPs(updatedRSVPs);
    setIsSent(true);

    // Formu sıfırlayırıq
    setFullName("");
    setPhone("");
    setMessage("");
    setGuestCount(1);
  };

  return (
    <section className="bg-[#fdfaf7] py-24 px-4 min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">

        <p className="font-sans text-[#A66F30] tracking-[5px] uppercase text-[10px] md:text-xs mb-4">R.S.V.P</p>
        <p className="text-[#E996A4] font-pinyon text-4xl italic">Şərəfimiz olar</p>
        <h1 className="text-5xl md:text-8xl text-[#39222A] font-cormorant font-light">İştirakınızı təsdiqləyin</h1>
        <p className="text-[#6D555D] text-xl font-cormorant italic max-w-xl mx-auto mb-10">Bu xüsusi anı bizimlə bölüşəcəyinizi bildirin</p>
        
        <div className="flex items-center justify-center gap-6 my-8 w-64 md:w-80 mx-auto px-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#A66F30]"></div>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#A66F30]"></div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#A66F30]"></div>
        </div>

        {/* Əgər mesaj göndərilibsə uğur bildirişi göstərilir */}
        {isSent ? (
          <div className="max-w-2xl mx-auto border border-[#f3ece6] p-8 md:p-14 bg-white shadow-sm">
            <h2 className="text-2xl text-[#39222A] font-cormorant mb-4">Təşəkkür edirik!</h2>
            <p className="text-[#6D555D] font-cormorant italic text-lg">Cavabınız uğurla qeydə alındı. Sizi aramızda görməyə şad olarıq!</p>
            <button 
              onClick={() => setIsSent(false)}
              className="mt-6 text-[11px] tracking-[3px] text-[#b8860b] underline uppercase"
            >
              Yeni cavab göndər
            </button>
          </div>
        ) : (
          /* Form teqi əlavə edildi və onSubmit-ə funksiya bağlandı */
          <form onSubmit={handleSaveToLocal} className="relative max-w-2xl mx-auto border border-[#f3ece6] p-8 md:p-14">

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
                    type="button" /* Form daxilində submit etməməsi üçün vacibdir */
                    key={num}
                    onClick={() => setGuestCount(num)}
                    className={`w-13 h-13 border text-lg transition-all ${
                      guestCount === num
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
              className="w-full bg-[#b8860b] hover:bg-[#9d7205] text-white py-4 tracking-[5px] transition-all"
            >
              ♡ CAVABI GÖNDƏR
            </button>
          </form>
        )}

      </div>

      <style jsx>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            animation: marquee 15s linear infinite;
        }
      `}</style>
    </section>
  );
}