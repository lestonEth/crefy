"use client";

import {
    Dashboard,
    Assignment,
    AccountBalanceWallet,
    Storefront,
    ImportExport,
    WorkOutline,
    Settings,
    ExitToApp,
    ExpandMore,
    ExpandLess,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const NavLinks = [
    { name: "Dashboard", href: "/student/dashboard", icon: <Dashboard /> },
    { name: "Transactions", href: "/student/dashboard/transactions", icon: <Assignment /> },
];

const walletLinks = [
    { name: "Wallet Account", href: "/student/dashboard/wallet", icon: <AccountBalanceWallet /> },
    { name: "KYC Verification", href: "/student/dashboard/kyc_verification", icon: <ImportExport /> },
    { name: "Opportunities", href: "/student/dashboard/opportunities", icon: <WorkOutline /> },
    { name: "NFT Market", href: "/student/dashboard/nftmarket", icon: <Storefront /> },
];

const additionalLinks = [
    { name: "Settings", href: "/student/dashboard/settings", icon: <Settings /> },
    { name: "Disconnect Wallet", href: "#", icon: <ExitToApp /> },
];

export default function Sidebar() {
    const { darkMode } = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const [showOverview, setShowOverview] = useState(true);
    const [showWallet, setShowWallet] = useState(true);
    const [showAdditional, setShowAdditional] = useState(true);

    return (
        <div
            className={`flex flex-col ${
                collapsed ? "w-[80px]" : "w-[320px]"
            } min-h-[98vh] relative rounded-xl transition-all duration-300`}
            style={{ background: "#110a29" }}
        >
            {/* Collapse Button */}
            <div
                className="absolute top-4 right-[-15px] bg-[#0d499b] p-1 rounded-full cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <ChevronRight className="text-white" /> : <ChevronLeft className="text-white" />}
            </div>

            {/* Logo Section */}
            <div className="flex justify-between items-center py-[40px] px-4">
                <h1>
                    {!collapsed && (
                        <a className="text-xl font-extrabold text-white" href={"/"}>
                            Crefy
                        </a>
                    )}
                </h1>
            </div>

            {/* Overview Section */}
            <div className="flex flex-col mt-4 px-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowOverview(!showOverview)}
                >
                    <h2
                        className={`text-md font-extrabold ${
                            darkMode ? "text-gray-100" : "text-gray-400"
                        } ${collapsed ? "hidden" : ""}`}
                    >
                        Overview
                    </h2>
                    {showOverview ? <ExpandLess className="text-white" /> : <ExpandMore className="text-white" />}
                </div>
                {showOverview &&
                    NavLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-4 py-1 hover:text-blue-400 text-sm ${
                                darkMode ? "text-white" : "text-white"
                            }`}
                        >
                            <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">
                                {link.icon}
                            </div>
                            {!collapsed && link.name}
                        </a>
                    ))}
            </div>

            {/* Wallet Section */}
            <div className="flex flex-col mt-4 px-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowWallet(!showWallet)}
                >
                    <h2
                        className={`text-md font-extrabold ${
                            darkMode ? "text-gray-100" : "text-gray-400"
                        } ${collapsed ? "hidden" : ""}`}
                    >
                        Wallet
                    </h2>
                    {showWallet ? <ExpandLess className="text-white" /> : <ExpandMore className="text-white" />}
                </div>
                {showWallet &&
                    walletLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-4 py-1 hover:text-blue-400 text-sm ${
                                darkMode ? "text-white" : "text-white"
                            }`}
                        >
                            <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">
                                {link.icon}
                            </div>
                            {!collapsed && link.name}
                        </a>
                    ))}
            </div>

            {/* Additional Section */}
            <div className="flex flex-col mt-4 px-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setShowAdditional(!showAdditional)}
                >
                    <h2
                        className={`text-md font-extrabold ${
                            darkMode ? "text-gray-100" : "text-gray-400"
                        } ${collapsed ? "hidden" : ""}`}
                    >
                        Settings
                    </h2>
                    {showAdditional ? <ExpandLess className="text-white" /> : <ExpandMore className="text-white" />}
                </div>
                {showAdditional &&
                    additionalLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-4 py-1 hover:text-blue-400 text-sm ${
                                darkMode ? "text-white" : "text-white"
                            }`}
                        >
                            <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">
                                {link.icon}
                            </div>
                            {!collapsed && link.name}
                        </a>
                    ))}
            </div>

            {/* Connected Wallet Icon at the Bottom */}
            <div className={`mt-auto flex flex-col justify-center my-[10%] w-full px-4 ${collapsed ? "hidden" : ""}`}>
                <div
                    className="w-[250px] my-3 h-[150px] rounded-2xl shadow-md flex flex-col justify-center px-6"
                    style={{
                        backgroundImage:
                            "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/sidenav-card-background.00019e46.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <p className="text-white font-extrabold">Need help?</p>
                    <p className="text-gray-300">Please check our docs</p>
                    <a
                        className="rounded-lg font-bold my-2 px-6 py-1"
                        style={{
                            background: "#4d00af",
                        }}
                        href={"/student/dashboard/documentation"}
                    >
                        Documentation
                    </a>
                </div>
            </div>
        </div>
    );
}
