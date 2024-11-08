"use client";

import React from "react";
import { AppKit, W3mAccountActivityWidget, W3mAccountView } from '@reown/appkit';
import DcnNavBar from './components/dcnnavbar';
import Particles from "react-tsparticles";
import Carousel from "./components/Carousel";
import CarouselWidget from "./components/CarouselWidget";
import HowToGetStarted from "./components/howtogetStarted";
import FAQ from "./components/FAQ";
import Footer from "./components/footer";

export default function Home() {
    return (
        <main className="p-8 min-h-screen relative"
            style={{
                background: 'linear-gradient(180deg, #020321, #140221)', // DarkBlue and SteelBlue
                zIndex: 0,
            }}
        >
            {/* DCN NAVBAR */}
            <DcnNavBar />

            {/* Carousel */}
            <Carousel />

            {/* Carousel Widget */}
            <div className="min-w-screen flex items-center justify-center">
                <CarouselWidget />
            </div>

            {/* How to Get Started */}
            <HowToGetStarted />

            {/* FAQ */}
            <FAQ />
            <div className='flex items-center justify-center my-[10rem]'>
                <div className="max-w-[80%] relative flex flex-col lg:flex-row items-center z-10 p-6 lg:p-1 bg-blue-900 rounded-3xl shadow-lg flex-1 overflow-hidden"
                    style={{ minHeight: '350px' }}
                >
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:mr-8 p-10">
                        <h2 className="text-3xl font-bold text-white mb-4">Sign up for email updates to keep up to date with the DCN</h2>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border-white border-2 text-black px-4 my-4 py-2 rounded-lg py-4 w-[80%]"
                            style={{ backgroundColor: 'transparent' }}
                        />
                        <button className="bg-white text-gray-800 px-14 py-4 rounded-lg text-xl">Sign Up</button>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center lg:mt-0 relative">
                        <img src="https://img.freepik.com/free-vector/abstract-blue-backgroud-modern-design_677411-2939.jpg" alt="DCN Email" className="h-[110%] w-[110%] shadow-lg " />
                    </div>
                
                </div>
            </div>
            {/* Footer */}
            <Footer />

        </main>
    );
}
