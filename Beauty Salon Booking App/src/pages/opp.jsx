import React from "react";
import opp11 from "../assets/opp11.jpg";
import opp22 from "../assets/opp22.jpg";
import opp33 from "../assets/opp33.jpg";
import opp44 from "../assets/opp44.jpg";
import design from "../assets/design.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
                        category: "Service",
                    },
                ],
            },
        });
    };

    return (
        <div className="flex flex-col gap-3 px-3">

            {/* HEADER */}
            <div
                className="relative w-full h-[300px] sm:h-[400px] bg-center bg-cover"
                style={{ backgroundImage: `url(${design})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <h1 className="text-2xl sm:text-5xl relative text-white text-center mt-24 sm:mt-30 font-light tracking-[0.3em] uppercase italic">
                    The new standard of beauty
                </h1>
            </div>

            <h3 className="text-base sm:text-xl m-4 sm:m-8 text-center sm:text-left">
                {t("23")}
            </h3>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-3">

                <div onClick={() => goBooking("Hair Cut", "100AZN")} className="cursor-pointer">
                    <img src={opp11} className="w-full h-[240px] sm:h-full object-cover rounded-lg" />
                    <p className="text-center text-lg sm:text-xl font-bold ">1.Hair Magic Offer</p>
                </div>

                <div onClick={() => goBooking("Glow up deal", "110AZN")} className="cursor-pointer">
                    <img src={opp22} className="w-full h-[240px] sm:h-full object-cover rounded-lg" />
                    <p className="text-center text-lg sm:text-xl font-bold">2.Glow Up Deal</p>
                </div>

                <div onClick={() => goBooking("Limited Glow Offers", "145AZN")} className="cursor-pointer">
                    <img src={opp33} className="w-full h-[240px] sm:h-full object-cover rounded-lg" />
                    <p className="text-center text-lg sm:text-xl font-bold">3.Limited Glow Offers</p>
                </div>

                <div onClick={() => goBooking("Glamora specials", "119AZN")} className="cursor-pointer">
                    <img src={opp44} className="w-full h-[240px] sm:h-full object-cover rounded-lg" />
                    <p className="text-center text-lg sm:text-xl font-bold">4.Glamora Specials</p>
                </div>

            </div>
        </div>
    );
}

export default Opp;