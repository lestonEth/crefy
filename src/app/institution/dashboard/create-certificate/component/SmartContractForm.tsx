// components/SmartContractForm.tsx

"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/moving-border";

export default function SmartContractForm() {
    const { darkMode } = useTheme();
    const [file, setFile] = useState<File>();
    // const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (files: File[]) => {
        setFile(files[0]);
    };


    return (
        <div
            className={`flex flex-col md:flex-row p-8 rounded-lg shadow-lg max-w-5xl mx-auto
            }`}
        >
            {/* Left Section - Main Form */}
            <div className="flex-1 mr-0 md:mr-8">
                {/* Header */}
                <h1 className={`text-3xl font-bold mb-2 text-gray-300`}>First lets store our metadata on ipfs. 🥳</h1>
                <p className={`text-gray-400 mb-6`}>
                    You will need store to  the metadata on IPFS for easier retrieval {'.'}
                    <a href="#" className="text-blue-400 underline">What is a ipfs?</a>
                </p>

                {/* Logo Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Certificate image</label>
                   
                    <div className="w-full max-w-4xl mx-auto border border-dashed bg-gray-600 border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileChange} />
                    </div>

                    <p className={`text-sm mt-2 text-gray-400`}>
                        Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF
                    </p>
                </div>

                {/* Contract Name & Token Symbol */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* student field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Student Name</label>
                        <input
                            type="text"
                            placeholder="Enter Student Name"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />
                    </div>

                    {/* student  */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Distinction</label>
                        <input
                            type="text"
                            placeholder="Enter grade"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />
                    </div>

                    {/* pinita cid field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Image CID</label>
                        <input
                            type="text"
                            placeholder="ipfs://Qm..."
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />
                    </div>

                    {/* Issuer field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300"> Name of Issuer </label>
                        <input
                            type="text"
                            placeholder="Enter Issuer Name"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />
                    </div>

                    <div className='flex flex-wrap w-[100%]'>
                        {/* 3 other signers */}
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Other Signers</label>
                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />

                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />

                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600"
                        />
                    </div>

                </div>


                {/* Advanced Settings */}
                <div className={`mt-4 cursor-pointer text-blue-400 flex justify-between items-center`}>
                    <h1 className="text-lg font-semibold mb-4 text-gray-300">Advanced settings</h1>

                    {/* post minting btn to ipfs */}
                    <Button>
                        Post to IPFS
                    </Button>

                </div>
            </div>

            {/* Right Section - Sidebar */}
            <div className="mt-8 md:mt-0 md:w-80">
                <div className={`p-6 rounded-lg bg-[#1E2327] border border-gray-600`}>
                    <h2 className="text-lg font-semibold mb-4 text-gray-300">After you deploy your contract you’ll be able to:</h2>
                    <ul className={`space-y-4 text-sm text-gray-400`}>
                        <li>
                            <span className="font-semibold">Manage collection settings</span> – Edit collection details, earnings, and links.
                        </li>
                        <li>
                            <span className="font-semibold">Set up your drop</span> – Set up your mint schedule and presale stages.
                        </li>
                        <li>
                            <span className="font-semibold">Prepare designs</span> – Customize your pages and upload all assets.
                        </li>
                    </ul>
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-1 text-gray-300">Your community:</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>👀 Can’t view your drop page or items until you publish them.</li>
                            <li>✔️ Can view that you’ve deployed a contract onto the blockchain.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
