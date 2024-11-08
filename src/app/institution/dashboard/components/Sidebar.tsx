"use client";

import {
    Dashboard,
    People,
    Assignment,
    Wallet,
    Create,
    Settings,
    Notifications,
    ExitToApp,
    Brightness4,
    Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";

const NavLinks = [
    { name: "Dashboard", href: "/institution/dashboard", icon: <Dashboard /> },
    { name: "Admins", href: "/institution/dashboard/admins", icon: <People /> },
    { name: "Transactions", href: "/institution/dashboard/transactions", icon: <Assignment /> },
];

const walletLinks = [
    { name: "Wallet Account", href: "/institution/dashboard/wallet", icon: <Wallet /> },
    { name: "Create Certificate", href: "/institution/dashboard/create-certificate", icon: <Create /> },
    { name: "NFT Collection", href: "/institution/dashboard/nft-collection", icon: <Create /> },
];

const additionalLinks = [
    { name: "Settings", href: "/institution/dashboard/settings", icon: <Settings /> },
    { name: "Notifications", href: "/institution/dashboard/notifications", icon: <Notifications /> },
    { name: "Disconnect Wallet", href: "#", icon: <ExitToApp /> },
];

export default function Sidebar() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex flex-col min-w-[320px] pl-10 min-h-[100vh] rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex justify-between items-center py-[40px]">
                <h1 className="text-xl font-extrabold">DCN</h1>
            </div>
            
            {/* Overview Section */}
            <div className="flex flex-col gap-4 mt-4">
                <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-gray-500' : 'text-gray-700'}`}>Overview</h2>
                {NavLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-2 py-3 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-black'}`}
                    >
                        {link.icon}
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Wallet Section */}
            <div className="flex flex-col gap-4 mt-10">
                <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-gray-500' : 'text-gray-700'}`}>Wallets</h2>
                {walletLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-2 py-3 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-black'}`}
                    >
                        {link.icon}
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Additional Section */}
            <div className="flex flex-col gap-4 mt-10">
                {additionalLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-2 py-3 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-black'}`}
                    >
                        {link.icon}
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Connected Wallet Icon at the Bottom */}
            <div className="mt-auto mb-10 flex justify-center">
                <w3m-network-button />
            </div>
        </div>
    );
}
