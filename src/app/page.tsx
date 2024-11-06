"use client";

import React from "react";
import { AppKit, W3mAccountActivityWidget } from '@reown/appkit';
import Connect from '@/components/Connect';
import DcnNavBar from './components/dcnnavbar';
import Particles from "react-tsparticles";
import Carousel from "./components/Carousel";

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

            {/* Connect */}
        </main>
    );
}
