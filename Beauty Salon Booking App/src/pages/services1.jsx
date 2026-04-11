import React from 'react'
import services1 from "../assets/services1.jpg";




function Services1() {

    return (
        <div className='flex flex-col'>
            <div
                className="relative w-full h-[300px] bg-center bg-cover"
                style={{ backgroundImage: `url(${services1})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] uppercase italic">
                        Services
                    </h1>

                </div>
            </div>

            
        </div>
    )
}

export default Services1
