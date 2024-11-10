// app/components/Carousel.js
"use client";

import React from "react";
import Slider from "react-slick";

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true, // Automatically move slides
        autoplaySpeed: 2000, // Speed of auto slide in ms
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false, // Optional: for centered slides
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    const cards = [
        { title: "JOMO KENYATTA UNIVERSITY" },
        { title: "ZETECH UNIVERSITY" },
        { title: "MOUNT KENYA UNIVERSITY" },
        { title: "CHAVAKALI HIGH SCHOOL" },
        { title: "Riara Springs Girls High School" },
        { title: "PIONEER PRIMARY SCHOOL" },
    ];

    return (
        <div className="mx-auto min-w-4xl max-w-full px-4 py-8">
            <Slider {...settings}>
                {cards.map((card, index) => (
                    <div key={index} className="p-4">
                        <div className="bg-white h-[200px] rounded-lg shadow-md shadow-gray-500 flex flex-row items-center justify-between"
                            style={{background: 'rgba(2, 3, 33, .81)'}}
                        >   <div className="flex items-center justify-center w-2/3 h-full">
                                <h2 className="text-4xl font-extrabold text-center text-gray-400">
                                    {card.title}
                                </h2>
                            </div>

                            <div className="bg-gray-700 h-1 w-1/3 h-[100%] mx-auto my-4"></div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
