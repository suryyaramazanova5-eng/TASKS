import React, { useState } from "react"
import contact from "../assets/contactimg.jpg"
import { Bounce, toast, ToastContainer } from "react-toastify"
import faqs from "../data/faqs"
import { useTranslation } from "react-i18next"

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [openIndex, setOpenIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !message) {
      toast.error("Xanaları doldurun", {
        position:"top-center"
      })
      return
    }

    setTimeout(() => {
      const oldMessages =
        JSON.parse(localStorage.getItem("messages")) || []

      const newMessages = [...oldMessages, { name, email, message }]
      localStorage.setItem("messages", JSON.stringify(newMessages))

      setName("")
      setEmail("")
      setMessage("")

      toast.success("Mesaj uğurla göndərildi!", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      })
    })
  }

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        style={{ backgroundImage: `url(${contact})` }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        theme="colored"
        transition={Bounce}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start px-4">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-[120px] w-full max-w-md ml-10 bg-white/10 backdrop-blur-md p-8 rounded-xl space-y-5" >
          <h2 className="text-2xl font-bold text-blue-400 text-center">
            {t("msg")}
          </h2>

          <input
            type="text"
            placeholder={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded border border-white bg-transparent text-white placeholder-white" />

          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-white bg-transparent text-white placeholder-white"/>

          <textarea
            rows="4"
            placeholder={t("mesg")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded border border-white bg-transparent text-white placeholder-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-400 text-white py-3 rounded-full hover:bg-blue-600 active:scale-95 transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {t("send")}
          </button>
        </form>

        {/* FAQ */}
        <div className="mt-10 ml-10 w-full max-w-md text-white">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-3 border-b border-white/30 pb-2" >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left font-semibold cursor-pointer">
                {t(faq.question)}
              </button>

              {openIndex === index && (
                <p className="text-sm mt-2 text-white/80">
                  {t(faq.answer)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SOCIAL */}
      <div className="fixed bottom-4 right-4 flex gap-4  z-50">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-blue-500 hover:scale-110 transition duration-300">
          <i className="fa-brands fa-instagram"></i>
        </a>

        <a
          href="https://t.me"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-blue-500 hover:scale-110 transition duration-300" >
          <i className="fa-brands fa-telegram"></i>
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-blue-500 hover:scale-110 transition duration-300" >
          <i className="fa-brands fa-facebook"></i>


        </a>
      </div>
    </div>
  )
}

export default Contact