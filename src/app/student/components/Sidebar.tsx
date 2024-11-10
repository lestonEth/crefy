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
    { name: "My Portfolio", href: "/student/dashboard/portfolio", icon: <ImportExport /> },
    { name: "Opportunities", href: "/student/dashboard/opportunities", icon: <WorkOutline /> },
];

const additionalLinks = [
    { name: "Settings", href: "/student/dashboard/settings", icon: <Settings /> },
    { name: "Disconnect Wallet", href: "#", icon: <ExitToApp /> },
];

export default function Sidebar() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex flex-col min-w-[320px] pl-10 min-h-[95vh] relative rounded-xl`}
            style={{background: "#110a29"}}
        >
            <div className="flex justify-between items-center py-[40px]">
                <a className="text-xl font-extrabold"
                    href={"/"}
                >DCN</a>
            </div>
            
            {/* Overview Section */}
            <div className="flex flex-col gap-4 mt-4">
                <h2 className={`text-lg font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-400'}`}>OVERVIEW</h2>
                {NavLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-4 py-1 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-white'}`}
                    >
                        <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">{link.icon}</div>
                        {link.name}
                    </a>
                ))}
            </div>

            {/* wallet Section */}
            <div className="flex flex-col gap-4 mt-4">
                <h2 className={`text-lg font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-400'}`}>WALLETS</h2>
                {walletLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-4 py-1 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-white'}`}
                    >
                        <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">{link.icon}</div>
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Additional Section */}
            <div className="flex flex-col gap-4 mt-4">
                <h2 className={`text-lg font-extrabold ${darkMode ? 'text-gray-100' : 'text-gray-400'}`}>SETTINGS</h2>
                {additionalLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-4 py-1 hover:text-blue-400 text-md ${darkMode ? 'text-white' : 'text-white'}`}
                    >
                        <div className="w-[30px] h-[30px] flex justify-center items-center rounded-lg bg-[#0d499b]">{link.icon}</div>
                        {link.name}
                    </a>
                ))}
            </div>


            {/* Connected Wallet Icon at the Bottom */}
            <div className="mt-auto flex flex-col justify-center absolute left-0 bottom-0 py-3 px-9 w-full">
                <div className="w-[250px] my-3 h-[150px] rounded-2xl shadow-md flex flex-col justify-center px-6"
                    style={{
                        backgroundImage: "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/sidenav-card-background.00019e46.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <p className="text-white font-extrabold">Need help?</p>
                    <p className="text-gray-300">Please check our docs</p>
                    <a className="rounded-lg font-bold my-2 px-6 py-1"
                        style={{
                            background: "#4d00af",
                        }}
                        href={"/student/dashboard/documentation"}
                    >Documentation</a>
                </div>
                <w3m-network-button />
            </div>
        </div>
    );
}
