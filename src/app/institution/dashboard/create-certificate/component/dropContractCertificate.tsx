"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { FileUpload } from "@/components/ui/file-upload";
import { Home, Cloud, NetworkCheck } from "@mui/icons-material"; // Importing MUI icons
import * as XLSX from "xlsx"; // Import the xlsx library

export default function DropContractCertificate() {
    const [activeTab, setActiveTab] = useState<"manual" | "upload">("manual");
    const [file, setFile] = useState<File>();
    const [singleWalletAddress, setSingleWalletAddress] = useState<string>("");
    const [addresses, setAddresses] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uid, setUid] = useState("");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ message: string, type: string } | null>(null);

    const handleFileChange = (files: File[]) => {
        setFile(files[0]);
    };

    const uploadFile = async () => {
        try {
            if (!file) {
                alert("No file selected");
                return;
            }

            setUploading(true);
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const ipfsUrl = await uploadRequest.json();
            const ipfsHash = ipfsUrl.split('/ipfs/')[1];
            const ipfsFormat = `ipfs://${ipfsHash}`;
            setUid(ipfsFormat);
            setUploading(false);
            setMessage({
                message: "File uploaded successfully",
                type: "success"
            });
        } catch (e) {
            console.log(e);
            setUploading(false);
            setMessage({
                message: "Trouble uploading file",
                type: "error"
            });
        }
    };

    const parseAddressesFromFile = async (file: File) => {
        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: Array<Record<string, string>> = XLSX.utils.sheet_to_json(worksheet);
            const parsedAddresses = jsonData.map((row) => row["WalletAddress"]).filter(Boolean);
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

    const handleDeployCertificateNFT = async () => {
        try {
            // Check if MetaMask is installed
            if (!(window as any).ethereum) {
                setErrorMessage("MetaMask is not installed. Please install it to proceed.");
                return;
            }
    
            // Request account access and setup ethers provider
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            await provider.send("eth_requestAccounts", []);
    
            // Get the signer (connected wallet)
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            console.log("Connected wallet address:", walletAddress);
    
            // Your NFT contract details
            const contractAddress = "0xB5E8d0eE8C54b04fbaEb04BE83680cad949B701F"; // Replace with your NFT contract address
            const contractABI = [
                // Replace with your contract's actual ABI
                "function safeMint(address to, string memory tokenURI) public",
            ];
    
            // Create a contract instance
            const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
    
            // Call the minting function
            const tokenURI = uid; // Use the IPFS CID as the token URI
            const txResponse = await nftContract.safeMint(walletAddress, tokenURI);
            console.log("Minting transaction sent. Awaiting confirmation...", txResponse);
    
            // Wait for the transaction to be mined
            const receipt = await txResponse.wait();
            console.log("NFT minted successfully!", receipt);
    
            setMessage({
                message: "NFT successfully minted and deployed.",
                type: "success",
            });
        } catch (error) {
            console.error("Error deploying Certificate NFT:", error);
            setErrorMessage("Failed to mint Certificate NFT. Please check your wallet or network settings.");
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

                    <div className="flex flex-row justify-end">
                        <button
                            onClick={uploadFile}
                            className="mt-2 px-3 py-1 text-white rounded-md hover:bg-gray-600 flex items-center justify-center border border-gray-600 relative"
                        >
                            {uploading && (
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-300 mr-2"></span>
                            )}
                            {uploading ? "Uploading..." : "Upload to IPFS"}
                            {!uploading && (
                                <span className="pointer-indicator animate-bounce absolute -left-0 top-1/2 w-full transform -translate-x-1 text-gray-300"
                                    style={{
                                        right: '200px',
                                    }}
                                >
                                    ⬅️ Upload cert image first
                                </span>
                            )}
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-300">Image CID</label>
                        <input
                            type="text"
                            placeholder="ipfs://Qm..."
                            value={uid}
                            disabled
                            className="w-full my-2 p-2 rounded focus:outline-none bg-[#1E2327] border border-gray-600 text-gray-300"
                        />
                    </div>
                </div>

                <div className="w-1/2">
                    <h1 className="text-lg font-bold text-gray-300 uppercase">Let's deploy your Certificate NFT</h1>
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

                    {activeTab === "manual" && (
                        <div>
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
                            <h3 className="text-sm text-gray-300 my-3">Upload an Excel file with wallet addresses</h3>
                            <div className="w-[400px] max-w-4xl mx-auto border border-dotted bg-[#1E2327] border-neutral-600 dark:border-neutral-600 rounded-lg">
                                <FileUpload onChange={handleFileChange} />
                            </div>
                        </div>
                    )}

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

                    <h3 className="text-sm text-gray-300 my-3">Select the network you want to deploy your Certificate NFT on</h3>
                    <div className="flex flex-row gap-2 mt-4">
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Home sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            Abitrium
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <Cloud sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            Base
                        </button>
                        <button className="network-square border border-gray-600 flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4">
                            <NetworkCheck sx={{ fontSize: 40 }} className="text-gray-300 mb-2" />
                            <w3m-network-button />
                        </button>
                    </div>
                    <br />
                    <button
                        className="px-4 py-2 min-w-[400px] text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded"
                        onClick={handleDeployCertificateNFT}
                    >
                        Deploy Certificate NFT
                    </button>
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}
