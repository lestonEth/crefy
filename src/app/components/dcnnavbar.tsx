"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";  // For navigation in Next.js
import { useAppKitAccount } from "@reown/appkit/react";

export default function DcnNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const { address, isConnected, caipAddress, status } = useAppKitAccount()

    // Mock function to handle wallet connection
    const connectWallet = async () => {
        // Logic for wallet connection
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    // Mock function to handle wallet disconnection
    const disconnectWallet = () => {
        // Logic for wallet disconnection
        console.log("Wallet disconnected");
        setDropdownOpen(false);  // Close dropdown after disconnecting
    };

    // Function to handle dashboard selection
    const handleDashboardClick = async (dashboard: any) => {
        await connectWallet();
        router.push(`/${dashboard}/dashboard`);
    };

    return (
        <nav
            className="flex justify-between items-center p-4 rounded-md mb-8 py-10 px-10"
            style={{
                backgroundColor: '#090c2c',
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0) 30%), 
                             radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0) 20%), 
                             radial-gradient(circle, rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 15%)`,
                backgroundSize: '50px 50px',
                backgroundPosition: '0 0, 25px 25px, 50px 50px',
                position: 'relative',
            }}
        >
            <h1 className="text-2xl font-extrabold text-white mr-4">
                <a href="/" className="text-white-700 hover:text-blue-400 text-5xl">DCN</a>
            </h1>
            <ul className="flex space-x-6 border-1 border-white py-2 px-4 rounded-xl"
                style={{ background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)' }}
            >
                <li><a href="#about" className="text-white-700 hover:text-blue-400 text-xl">About</a></li>
                <li><a href="#lean" className="text-white-700 hover:text-blue-400 text-xl">Lean</a></li>
                <li><a href="#develop" className="text-white-700 hover:text-blue-400 text-xl">Develop</a></li>
                <li><a href="#market" className="text-white-700 hover:text-blue-400 text-xl">Contact</a></li>
                <li><a href="whitepaper" className="text-white-700 hover:text-blue-400 text-xl">Whitepaper</a></li>
            </ul>

            {!isConnected ? (
                <appkit-button />
            ) : (
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center text-xl px-8 py-2 text-white-700 hover:text-blue-400 bg-blue-800 rounded-md focus:outline-none"
                        style={{ background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)' }}
                    >
                        Dashboards
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 min-w-[290px] rounded-md shadow-lg z-10"
                            style={{
                                background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                zIndex: 1000,
                            }}
                        >
                            <ul className="py-1 px-3 text-white">
                                <li>
                                    <button
                                        onClick={() => handleDashboardClick('student')}
                                        className="block px-4 py-4 my-2 text-xl font-bold hover:bg-gray-200 hover:bg-opacity-20 rounded-md w-full text-left"
                                    >
                                        Student Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleDashboardClick('institution')}
                                        className="block px-4 py-4 my-2 text-xl font-bold hover:bg-gray-200 hover:bg-opacity-20 rounded-md w-full text-left"
                                    >
                                        Institution Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleDashboardClick('issuer')}
                                        className="block px-4 py-4 my-2 text-xl font-bold hover:bg-gray-200 hover:bg-opacity-20 rounded-md w-full text-left"
                                    >
                                        Issuer Dashboard
                                    </button>
                                </li>
                            </ul>
                            <hr className="border-gray-500 my-2" />
                            {/* Disconnect Wallet Button */}
                            <button
                                onClick={disconnectWallet}
                                className="block w-full px-4 py-2 text-lg font-semibold text-red-500 hover:text-red-700 bg-transparent hover:bg-opacity-20 rounded-md"
                            >
                                <w3m-button />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
