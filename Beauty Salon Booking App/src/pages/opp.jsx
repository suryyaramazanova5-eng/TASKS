import React from 'react'
import opp11 from "../assets/opp11.jpg";
import opp22 from "../assets/opp22.jpg";
import opp33 from "../assets/opp33.jpg";
import opp44 from "../assets/opp44.jpg";


import design from "../assets/design.jpg";


function Opp() {
    const opp = [
        { img: opp11 },
        { img: opp22 },
        { img: opp33 },
        { img: opp44 },


    ]
    return (
        <div className="flex flex-col gap-3 px-3">
            <div
                className="relative w-full h-[400px]  bg-center"
                style={{ backgroundImage: `url(${design})` }}

            >
                <div className="absolute inset-0 bg-black/50"></div>
                <h1 className='text-5xl relative text-white text-center mt-30 animate-bounce font-light tracking-[0.3em] uppercase italic'>Gözəlliyin yeni standartı</h1>

            </div>


            <h3 className='text-xl m-8'>*Həftəlik fürsətlər həftənin yalnız 1-ci gününə aiddir</h3>
            <div className="grid grid-cols-2 gap-4 px-3">
                {opp.map((item, i) => (
                    <div key={i} className=" shadow-md rounded-lg">
                        <img
                            src={item.img}
                            alt="opp"
                            className="w-full h-full "
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Opp
