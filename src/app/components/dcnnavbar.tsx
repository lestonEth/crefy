// app/components/DcnNavBar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

interface DropdownItemProps {
    onClick: () => void;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
    <Link 
        href={href} 
        className="text-white-700 hover:text-blue-400 text-xl"
    >
        {children}
    </Link>
);

const DropdownItem = ({ onClick, children }: DropdownItemProps) => (
    <li>
        <button
            onClick={onClick}
            className="block px-4 py-4 my-2 text-xl font-bold hover:bg-gray-200 hover:bg-opacity-20 rounded-md w-full text-left text-white"
        >
            {children}
        </button>
    </li>
);

export default function DcnNavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { address, isConnected, caipAddress, status } = useAppKitAccount();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDashboardClick = async (dashboard: string) => {
        setDropdownOpen(false);
        router.push(`/${dashboard}/dashboard`);
    };

    const navItems = [
        { href: "#about", label: "About" },
        { href: "/whitepaper", label: "Whitepaper" },
        { href: "#learn", label: "Learn" },
        { href: "#develop", label: "Develop" },
        { href: "#market", label: "Join Us" }
    ];

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
            {/* Logo */}
            <h1 className="text-2xl font-extrabold text-white mr-4">
                <Link href="/" className="text-white-700 hover:text-blue-400 text-5xl">
                    DCN
                </Link>
            </h1>

            {/* Navigation Links */}
            <ul 
                className="flex space-x-6 border-1 border-white py-2 px-4 rounded-xl"
                style={{ background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)' }}
            >
                {navItems.map((item) => (
                    <li key={item.href}>
                        <NavLink href={item.href}>{item.label}</NavLink>
                    </li>
                ))}
            </ul>

            {/* Wallet Connection / Dashboard */}
            {!isConnected ? (
                // @ts-ignore - Custom web component
                <appkit-button />
            ) : (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center text-xl px-8 py-2 text-white-700 hover:text-blue-400 rounded-md focus:outline-none"
                        style={{ background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)' }}
                    >
                        Dashboards
                        <svg
                            className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 min-w-[290px] rounded-md shadow-lg z-10"
                            style={{
                                background: 'linear-gradient(135deg, rgba(9,28,36,1) 0%, rgba(40,54,76,1) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <ul className="py-1 px-3 text-white">
                                <DropdownItem onClick={() => handleDashboardClick('student')}>
                                    Student Dashboard
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDashboardClick('institution')}>
                                    Institution Dashboard
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDashboardClick('issuer')}>
                                    Issuer Dashboard
                                </DropdownItem>
                            </ul>
                            <hr className="border-gray-500 my-2" />
                            <div className="p-2">
                                {/* @ts-ignore - Custom web component */}
                                <w3m-button />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}