"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Home, Cloud, NetworkCheck } from "@mui/icons-material"; // Importing MUI icons
import * as XLSX from "xlsx"; // Import the xlsx library


export default function DropContractCertificate() {
    const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual"); // State for active tab
    const [file, setFile] = useState<File>();
    const [singleWalletAddress, setSingleWalletAddress] = useState<string>("");
    const [addresses, setAddresses] = useState<string[]>([]);

    const handleFileChange = (files: File[]) => {
        setFile(files[0]);
        parseAddressesFromFile(files[0]); // Parse addresses from the uploaded file
    };

    const parseAddressesFromFile = async (file: File) => {
        try {
            // Read the file as binary string
            const data = await file.arrayBuffer();

            // Parse the workbook
            const workbook = XLSX.read(data, { type: "array" });

            // Assuming the first sheet contains the addresses
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert the sheet data to JSON
            const jsonData: Array<Record<string, string>> = XLSX.utils.sheet_to_json(worksheet);

            // Extract wallet addresses from the parsed JSON
            const parsedAddresses = jsonData.map((row) => row["WalletAddress"]).filter(Boolean);

            // Update the state with the parsed addresses
            setAddresses(parsedAddresses);
        } catch (error) {
            console.error("Error parsing Excel file:", error);
        }
    };

    const handleAddSingleAddress = () => {
        if (singleWalletAddress.trim() !== "") {
            setAddresses((prev) => [...prev, singleWalletAddress.trim()]);
            setSingleWalletAddress("");
        }
    };

    return (
        <div className="w-full h-[calc(100%-100px)]">
            <h1 className="text-lg font-bold text-gray-300 uppercase">Let's create a smart contract for your Certificate NFT.</h1>
            <div className="w-full h-[100%] flex flex-1 gap-10">
                <div className="w-1/2">
                    <h3 className="text-sm text-gray-300 my-3">Drop your smart contract JSON file here</h3>
                    <div className="w-full max-w-4xl mx-auto border border-dashed bg-gray-800 border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileChange} />
                    </div>
                </div>

                <div className="w-1/2">
                    <h1 className="text-lg font-bold text-gray-300 uppercase">Let's deploy your Certificate NFT</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-600 mb-4">
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "manual"
                                    ? "text-white border-b-2 border-blue-600"
                                    : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("manual")}
                        >
                            Manual Input
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === "upload"
                                    ? "text-white border-b-2 border-blue-600"
                                    : "text-gray-400"
                                }`}
                            onClick={() => setActiveTab("upload")}
                        >
                            Upload File
                        </button>
                    </div>

                    {/* Conditional Content Based on Tab */}
                    {activeTab === "manual" && (
                        <div>
                            {/* Manual Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-300">Add Student Wallet Address</label>
                                <input
                                    type="text"
                                    value={singleWalletAddress}
                                    onChange={(e) => setSingleWalletAddress(e.target.value)}
                                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded w-2/3 border border-gray-600"
                                />

                                <div className="flex justify-end w-2/3"> 
                                    <button
                                        className="px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-green-700 rounded text-right border border-gray-600"
                                        onClick={handleAddSingleAddress}
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "upload" && (
                        <div>
                            {/* File Upload */}
                            <h3 className="text-sm text-gray-300 my-3">Upload an Excel file with wallet addresses</h3>
                            <div className="w-[400px] max-w-4xl mx-auto border border-dotted bg-[#1E2327] border-neutral-600 dark:border-neutral-600 rounded-lg">
                                <FileUpload onChange={handleFileChange} />
                            </div>
                        </div>
                    )}

                    {/* Display List of Addresses */}
                    {addresses.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-sm text-gray-300">Addresses:</h3>
                            <ul className="text-gray-300 text-sm mt-2">
                                {addresses.map((address, index) => (
                                    <li key={index} className="my-1">
                                        {address}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Select Network */}
                    <h3 className="text-sm text-gray-300 my-3">Select the network you want to deploy your Certificate NFT on</h3>
                    <div className="flex flex-row gap-2 mt-4">
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Home sx={{ fontSize: 40 }} className="text-gray-300 mb-2" /> {/* Abitrium Icon */}
                            Abitrium
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Cloud sx={{ fontSize: 40 }} className="text-gray-300 mb-2" /> {/* Base Icon */}
                            Base
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <NetworkCheck sx={{ fontSize: 40 }} className="text-gray-300 mb-2" /> {/* Others Icon */}
                            <w3m-network-button />
                        </button>
                    </div>
                    <br />

                    <button className="px-4 py-2 min-w-[400px] text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded">
                        Deploy Certificate NFT
                    </button>
                </div>
            </div>
        </div>
    );
}
