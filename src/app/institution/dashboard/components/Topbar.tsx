"use client";

import { Brightness4, Brightness7, Notifications, AccountBalanceWallet, Search } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function Topbar() {
    const { darkMode, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className={`flex flex-row items-center justify-between w-full h-16 px-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} shadow-md rounded-xl`}>
            
            {/* Left Section: Dashboard Title */}
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            {/* Center Section: Search Bar */}
            <div className="flex flex-1 justify-center">
                <div className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center px-3 py-1 w-1/2`}>
                    <Search className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>
            </div>

            {/* Right Section: Icons and Buttons */}
            <div className="flex items-center space-x-4">
                
                {/* Notification Icon */}
                <button className="relative">
                    <Notifications className="text-2xl" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                </button>
                
                {/* Account Balance Button */}
                <button className="flex items-center px-3 py-1 rounded-lg bg-blue-500 text-white">
                    <AccountBalanceWallet className="mr-2" />
                    <span className="text-sm font-semibold">Account</span>
                </button>
                
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className="text-2xl">
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </button>
            </div>
        </div>
    );
}
