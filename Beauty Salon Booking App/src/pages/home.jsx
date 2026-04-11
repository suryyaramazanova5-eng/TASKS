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
import opp11 from "../assets/opp11.jpg";
import opp22 from "../assets/opp22.jpg";
import opp33 from "../assets/opp33.jpg";



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
  ];

  const opp = [
    { img: opp11 },
    { img: opp22 },
    { img: opp33 }
  ]

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const avg =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
      : 0;

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const addReview = (e) => {
    e.preventDefault();
    if (!name || !text || rating === 0) return;

    const newReview = { name, text, rating };
    const updated = [newReview, ...reviews];

    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));

    setName("");
    setText("");
    setRating(0);
    setHoverRating(0);
  };

  const deleteReview = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  const startEdit = (index, text, rating) => {
    setEditIndex(index);
    setEditText(text);
    setEditRating(rating);
  };

  const saveEdit = (index) => {
    const updated = reviews.map((r, i) =>
      i === index
        ? { ...r, text: editText, rating: editRating }
        : r
    );

    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));

    setEditIndex(null);
    setEditText("");
    setEditRating(0);
  };
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="w-full overflow-hidden">

      {/* HERO */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-16 gap-6">
          <h1 className="text-7xl font-bold text-white">
            Glamora Beauty Salon
          </h1>

          <p className="text-3xl text-pink-200 italic animate-bounce">{t("title")}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/booking")}
              className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 cursor-pointer"
            >
              {t("button")}
            </button>

            <button
              onClick={() => navigate("/services")}
              className="px-8 py-3 border border-white text-white rounded-full hover:bg-white hover:text-pink-600 cursor-pointer"
            >
              {t("btn")}
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-pink-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-500">
          GLAMORA TEAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-16">
          {team.map((member, i) => (
            <div
              key={i}
              className="text-center cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={member.img}
                alt={member.name}
                className="  object-contain mx-auto shadow-lg hover:scale-105 transition duration-500"
              />

              <h3 className="mt-4 font-semibold">{member.name}</h3>
              <p className="text-pink-600">{member.role}</p>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-8   md:w-[400px] text-center relative">

              {/* close button */}
              <button
                className="absolute top-2 right-3 text-xl"
                onClick={() => setSelectedMember(null)}
              >
                <i className="fa-solid fa-x cursor-pointer"></i>
              </button>

              {/* image */}
              <img
                src={selectedMember.img}
                alt={selectedMember.name}
                className=" mx-auto"
              />

              {/* name */}
              <h2 className="text-2xl  mt-3">
                {selectedMember.name}
              </h2>

              {/* role */}
              <p className="text-pink-500">{selectedMember.role}</p>

              {/* about */}
              <p className="mt-3 text-gray-600">
                {selectedMember.about}
              </p>

              {/* social icons */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center  text-pink-400  hover:scale-110 transition duration-300">
                <i className="fa-brands fa-instagram"></i>
              </a>

            </div>
          </div>
        )}
      </div>
      {/* WHY CHOOSE US */}
      <div className="py-20 bg-pink-100 text-center">
        <h2 className="text-4xl font-bold text-pink-500 mb-10">
          Niyə Glamora?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 px-16">
          <div>
            <i className="fa-solid fa-gem text-4xl text-pink-500"></i>
            <h3 className="mt-4 font-semibold">Premium xidmət</h3>
            <p>Yüksək keyfiyyətli məhsullar</p>
          </div>

          <div>
            <i className="fa-solid fa-user-tie text-4xl text-pink-500"></i>
            <h3 className="mt-4 font-semibold">Professional heyət</h3>
            <p>Təcrübəli ustalar</p>
          </div>

          <div>
            <i className="fa-solid fa-heart text-4xl text-pink-500"></i>
            <h3 className="mt-4 font-semibold">Müştəri məmnuniyyəti</h3>
            <p>100% diqqət və qayğı</p>
          </div>
        </div>
      </div>


      {/*opp*/}

      <div>
        <h2 className="text-5xl font-light m-9 animate-pulse">Don't miss out on weekly opportunities...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16 ">
          {opp.map((item, i) => (
            <div
              key={i}
              className="relative group overflow-hidden  shadow-lg "
            >
              <img
                onClick={() => navigate("/opp")}
                src={item.img}
                alt={item.title}
                className="w-full  object-cover  transition duration-500 cursor-pointer group-hover:scale-105  "
              />


              <div className="absolute  opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() => navigate("/opp")}
            className="px-8 py-3 bg-pink-400 text-white rounded-full hover:bg-pink-600 cursor-pointer m-9"
          >
            All opportunities
            <i className="fa-solid fa-arrow-right text-xl "></i>
          </button>
        </div>

      </div>

      {/* GALLERY */}
      <div className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-500">
          {t("gallery")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-16">
          {gallery.map((item, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="p-6 bg-pink-50">
        <h1 className="text-center text-pink-500 text-[32px] font-bold mb-4">
          {t("rating")}
        </h1>

        <p className=" text-xl mb-4">
          Rəylər: {avg} / 5
        </p>

        <form onSubmit={addReview} className="flex flex-col gap-3 mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            className="border p-2 rounded"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("review")}
            className="border p-2 rounded"
          />

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer ${(hoverRating || rating) >= star
                  ? "text-yellow-400"
                  : "text-gray-400"
                  }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}>
                <i className="fa-solid fa-star"></i>
              </span>
            ))}
          </div>

          <button className="bg-pink-500 text-white py-2 rounded cursor-pointer">
            {t("submit")}
          </button>
        </form>

        {/* 🔥 BURASI DÜZƏLDİLDİ */}
        <div>
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <i className="fa-regular fa-face-smile text-4xl text-pink-400 mb-2"></i>
              <p className="text-sm text-gray-500">
                Hələki rəy yoxdur. İlk rəyi siz yazın
              </p>
            </div>
          ) : (
            reviews.map((r, idx) => (
              <div key={idx} className="border-b py-3">

                <div className="flex gap-3 items-center">
                  <h4 className="font-bold">{r.name}</h4>

                  <i
                    className="fa-solid fa-trash text-red-600 cursor-pointer"
                    onClick={() => deleteReview(idx)} />

                  <i
                    className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer"
                    onClick={() => startEdit(idx, r.text, r.rating)} />
                </div>

                <div className="flex gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => editIndex === idx && setEditRating(star)}
                      className={`cursor-pointer ${(editIndex === idx ? editRating : r.rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-400"}`} >
                      <i className="fa-solid fa-star"></i>
                    </span>
                  ))}
                </div>

                <p
                  contentEditable={editIndex === idx}
                  suppressContentEditableWarning={true}
                  onInput={(e) => setEditText(e.currentTarget.textContent)}
                  onBlur={() => editIndex === idx && saveEdit(idx)}
                  className={`outline-none ${editIndex === idx ? "bg-gray-100 px-2 rounded" : ""}`} >
                  {r.text}
                </p>

              </div>
            ))
          )}
        </div>
      </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4285485428204!2d49.830693676255315!3d40.37719367144601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0d71e9898b%3A0x2a9847f372425d29!2sIT%20Brains%20Academy-%20IT%20v%C9%99%20Proqramla%C5%9Fd%C4%B1rma%20kursu!5e0!3m2!1sen!2saz!4v1774803697274!5m2!1sen!2saz" width="100%" height="450"></iframe>
      <a
        href="https://wa.me/994515586968"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6  text-green-400 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
      </a>
    </div>

  );
}

export default Home;