// components/SmartContractForm.tsx

"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function SmartContractForm() {
    const { darkMode, toggleTheme } = useTheme();
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        setUploading(true);

        // Prepare the file data to be uploaded
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://api.pinata.cloud/v3/files", {
                method: "POST",
                headers: {
                    "pinata_api_key": process.env.PINATA_API_KEY!,
                    Authorization: `Bearer ${process.env.PINATA_JWT!}`,
                    "pinata_secret_api_key": process.env.PINATA_API_SECRET!,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.IpfsHash) {
                // Construct the URL for the uploaded file
                setUrl(`https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`);
                setUploading(false);
            } else {
                alert("Error uploading file to IPFS.");
                setUploading(false);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
            setUploading(false);
        }
    };


    return (
        <div
            className={`flex flex-col md:flex-row p-8 rounded-lg shadow-lg max-w-5xl mx-auto
            }`}
        >
            {/* Left Section - Main Form */}
            <div className="flex-1 mr-0 md:mr-8">
                {/* Header */}
                <h1 className={`text-3xl font-bold mb-2 ${darkMode && 'text-white'}`}>First lets store our metadata on ipfs. 🥳</h1>
                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
                    You will need store to  the metadata on IPFS for easier retrieval {'.'}
                    <a href="#" className="text-blue-400 underline">What is a ipfs?</a>
                </p>

                {/* Logo Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Certificate image</label>
                    <div
                        className={`flex items-center justify-center w-full h-36 border rounded-lg cursor-pointer bg-clip-content ${darkMode ? "border-gray-600" : "border-gray-300"
                            }`}
                    >
                        <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                            Drag and drop or click to upload
                        </span>
                    </div>

                    <input type="file" onChange={handleFileChange} />
                    <button disabled={uploading} onClick={uploadFile}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm mt-2`}>
                        Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF
                    </p>
                </div>

                {/* Contract Name & Token Symbol */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* student field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Student Name</label>
                        <input
                            type="text"
                            placeholder="Enter Student Name"
                            className={`w-full p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />
                    </div>

                    {/* student  */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Distinction</label>
                        <input
                            type="text"
                            placeholder="Enter grade"
                            className={`w-full p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />
                    </div>

                    {/* pinita cid field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Image CID</label>
                        <input
                            type="text"
                            placeholder="ipfs://Qm..."
                            className={`w-full p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />
                    </div>

                    {/* Issuer field */}
                    <div>
                        <label className="block text-sm font-semibold mb-1"> Name of Issuer </label>
                        <input
                            type="text"
                            placeholder="Enter Issuer Name"
                            className={`w-full p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />
                    </div>

                    <div className='flex flex-col'>
                        {/* 3 other signers */}
                        <label className="block text-sm font-semibold mb-1">Other Signers</label>
                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className={`w-full my-2 p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className={`w-full my-2 p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}
                        />

                        <input
                            type="text"
                            placeholder="Enter Signers"
                            className={`w-full my-2 p-2 rounded border focus:outline-none ${darkMode ? "bg-gray-800 border-gray-600 focus:border-blue-400" : "bg-gray-100 border-gray-300 focus:border-blue-500"
                                }`}

                        />
                    </div>

                </div>

                {/* Blockchain Selection
                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Blockchain</label>
                    <div className="flex gap-4">
                        {["Ethereum", "Base"].map((blockchain) => (
                            <button
                                key={blockchain}
                                onClick={() => handleBlockchainSelect(blockchain)}
                                className={`flex-1 p-4 rounded-lg border text-center ${
                                    selectedBlockchain === blockchain
                                        ? darkMode
                                            ? "border-blue-400 bg-gray-800"
                                            : "border-blue-500 bg-gray-100"
                                        : darkMode
                                        ? "border-gray-600"
                                        : "border-gray-300"
                                }`}
                            >
                                <div className="font-bold">{blockchain}</div>
                                <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                                    {blockchain === "Ethereum" && "Estimated cost to deploy contract: $10.20"}
                                    {blockchain === "Base" && "Estimated cost to deploy contract: $0.01"}
                                </div>
                            </button>
                        ))}

                        <button
                            className={`flex-1 p-4 rounded-lg border text-center dark:bg-gray-800 `}
                        >
                            <w3m-network-button />
                        </button>

                    </div>
                </div> */}

                {/* Advanced Settings */}
                <div className={`mt-4 cursor-pointer ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                    Advanced settings
                </div>
            </div>

            {/* Right Section - Sidebar */}
            <div className="mt-8 md:mt-0 md:w-80">
                <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                    <h2 className="text-lg font-semibold mb-4">After you deploy your contract you’ll be able to:</h2>
                    <ul className={`space-y-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
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
                        <h3 className="text-sm font-semibold mb-1">Your community:</h3>
                        <ul className="space-y-2">
                            <li>👀 Can’t view your drop page or items until you publish them.</li>
                            <li>✔️ Can view that you’ve deployed a contract onto the blockchain.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
