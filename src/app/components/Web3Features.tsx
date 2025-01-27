"use client";
import { useEffect, useState } from "react";

const Web3Features = () => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.5 } // 50% of the element must be in view
        );

        const element = document.getElementById("web3-features");
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    return (
        <div
            id="web3-features"
            className={`flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-black text-white opacity-0 transition-opacity duration-700 ${
                inView ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Left Section - Heading */}
            <div className="flex flex-col">
                <h1 className="text-9xl font-bold">
                    Redefine <span className="text-blue-400">Digital Identity</span>
                </h1>
                <h1 className="text-6xl font-bold">with Crefy</h1>
                <div className="flex space-x-2 mt-4">
                    <span className="text-blue-400 animate-pulse">*</span>
                    <span className="text-blue-400 animate-pulse delay-200">*</span>
                    <span className="text-blue-400 animate-pulse delay-400">*</span>
                </div>
            </div>

            {/* Right Section - Description */}
            <div className="flex flex-col items-center lg:items-end text-sm max-w-md mt-10 lg:mt-0">
                <p className="text-gray-400 text-right text-lg">
                    Crefy revolutionizes digital identity by creating a secure, decentralized identity system for individuals and organizations. Our platform ensures privacy, transparency, and accessibility, empowering users to own and control their digital presence.
                </p>
                <p className="text-gray-400 text-right mt-4 text-lg">
                    With features like secure document verification, cross-border identity validation, and seamless integration with financial systems, Crefy eliminates barriers and creates a unified, trust-based digital ecosystem. Unlock your potential with the power of self-sovereign identity.
                </p>
                {/* Identity Icon */}
                <div className="mt-6">
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="h-6 w-6 rounded-full border-2 border-gray-400"></div>
                            <div className="absolute bottom-0 right-0 transform translate-y-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="gray"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM17.657 15.657A8.962 8.962 0 0012 14c-2.208 0-4.208.72-5.657 1.657M15 17h.01M9 17h.01"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Web3Features;
