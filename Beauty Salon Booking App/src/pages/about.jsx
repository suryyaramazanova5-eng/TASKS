import React from "react";
import about from "../assets/about.jpg";

function About() {
  return (
    <div className="flex flex-col text-white">

      <div
        className="relative w-full h-[400px] bg-center"
        style={{ backgroundImage: `url(${about})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h1 className="relative text-2xl sm:text-4xl md:text-7xl text-white text-center mb-6 mt-20 font-light tracking-[0.3em] uppercase px-4">
          Glamora brendi adı altında qarşınızdayıq.
        </h1>
      </div>

      {/* DESCRIPTION (DİZAYN EYNİ) */}
      <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-12 text-balance px-4 mt-6">

        Glamora gözəllik salonu, müştərilərinə yüksək keyfiyyətli və yenilikçi gözəllik xidmətləri göstərən bir gözəllik salonudur.

        <div className="border border-pink-500 border-2 m-4 animate-pulse"></div>

        Təcrübəli salon kosmetoloqları müştərilərinin ehtiyaclarını başa düşmək və onlara daha yaxşı həllər təklif etmək üçün təlim keçmiş və təcrübəlidirlər.

        <div className="border border-pink-500 border-2 m-4 animate-pulse"></div>

        Glamora gözəllik salonu tərəfindən təklif olunan xidmətlərə üz, dəri, qol və ayaq baxımı, bədən baxımı, saç kəsmə və rəngləmə, makiyaj, qaş və kirpik baxımı, lazer epilyasiya və bir çox digər xidmətlər daxildir.

      </p>

      {/* CARDS (EYNİ DİZAYN) */}
      <div className="grid md:grid-cols-3 gap-6 px-4">

        <div className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-3">Missiyamız</h2>
          <p className="text-gray-400">
            Müştərilər üçün ən rahat və sürətli rezervasiya sistemini təqdim etmək.
          </p>
        </div>

        <div className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-3">Vizyonumuz</h2>
          <p className="text-gray-400">
            Texnologiya ilə xidmət sektorunu birləşdirərək lider platforma olmaq.
          </p>
        </div>

        <div className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold mb-3">Dəyərlərimiz</h2>
          <p className="text-gray-400">
            Keyfiyyət, etibar və müştəri məmnuniyyəti bizim üçün önəmlidir.
          </p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-16">
        2026 Bütün hüquqlar qorunur
      </div>

    </div>
  );
}

export default About;