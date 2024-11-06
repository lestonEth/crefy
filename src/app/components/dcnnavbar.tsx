"use client";
import React from "react";

export default function dcnNavBar() {
    return (
        <nav 
            className="flex justify-between items-center p-4 rounded-md mb-8"
            style={{
                backgroundColor: '#090c2c',
                background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0) 30%), 
                             radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, rgba(255, 255, 255, 0) 20%), 
                             radial-gradient(circle, rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 15%)`,
                backgroundSize: '50px 50px',  // Size of the bubble pattern
                backgroundPosition: '0 0, 25px 25px, 50px 50px', // Offset the bubbles for a scattered effect
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <h1 className="text-2xl font-bold text-white mr-4">DCN</h1>
            <ul className="flex space-x-6">
                <li><a href="#about" className="text-white-700 hover:text-blue-400">About</a></li>
                <li><a href="#lean" className="text-white-700 hover:text-blue-400">Lean</a></li>
                <li><a href="#develop" className="text-white-700 hover:text-blue-400">Develop</a></li>
                <li><a href="#market" className="text-white-700 hover:text-blue-400">Contact</a></li>
            </ul>
            <div className="flex justify-center space-x-4 mt-6 ml-4">
                <appkit-button />
            </div>
        </nav>
    );
}
