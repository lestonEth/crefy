"use client";

import {
    Dashboard,
    People,
    Assignment,
    AccountBalanceWallet,
    Storefront,
    ImportExport,
    WorkOutline,
    Settings,
    ExitToApp,
    Brightness4,
    Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";

const NavLinks = [
    { name: "Dashboard", href: "/student/dashboard", icon: <Dashboard /> },
    { name: "Transactions", href: "/student/dashboard/transactions", icon: <Assignment /> },
];

const walletLinks = [
    { name: "Wallet Account", href: "/student/dashboard/wallet", icon: <AccountBalanceWallet /> },
    { name: "NFT Market", href: "/student/dashboard/create-certificate", icon: <Storefront /> },
    { name: "Import NFT", href: "/student/dashboard/nft-collection", icon: <ImportExport /> },
    { name: "Opportunities", href: "/student/dashboard/opportunities", icon: <WorkOutline /> },
];

const additionalLinks = [
    { name: "Settings", href: "/student/dashboard/settings", icon: <Settings /> },
    { name: "Disconnect Wallet", href: "#", icon: <ExitToApp /> },
];

export default function Sidebar() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex flex-col min-w-[320px] pl-10 min-h-[100vh] relative rounded-xl ${darkMode ? 'dark:bg-slate-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className="flex justify-between items-center py-[40px]">
                <h1 className="text-xl font-extrabold">DCN</h1>
            </div>
            
            {/* Overview Section */}
            <div className="flex flex-col gap-4 mt-4">
                <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>OVERVIEW</h2>
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
                <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>WALLETS</h2>
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
                <h2 className={`text-2xl font-extrabold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>TOOLBOX</h2>
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
            <div className="mt-auto flex flex-col justify-center absolute left-0 bottom-0 py-3 w-full">
                <w3m-network-button />
            </div>
        </div>
    );
}
