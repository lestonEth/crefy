"use client";

import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { ethers } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
import axios from "axios";

interface FormData {
    first_name: string;
    last_name: string;
    middle_name: string;
    id_number: string;
    id: string;
    id_type: string;
    country_code: string;
    citizenship: string;
}

const KycVerification: React.FC = () => {
    const { address } = useAppKitAccount();
    const [formData, setFormData] = useState<FormData>({
        first_name: "",
        last_name: "",
        middle_name: "",
        id_number: "",
        id: "", // The id will be updated with the address value
        id_type: "NATIONAL_ID",
        country_code: "KE",
        citizenship: "Kenyan",
    });

    useEffect(() => {
        if (address) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                id: address, // Automatically populate the id field with the address
            }));
        }
    }, [address]);

    const [responseMessage, setResponseMessage] = useState<string>("");
    const [crefyName, setCrefyName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);  // New loading state
    const [accessToken, setAccessToken] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchAccessToken = async () => {  
        setResponseMessage("Fetching access token...");
        try {
            const response = await axios.post("https://kub.terrasofthq.com/api/auth/access-token", {
                email: "mulinyafadhil@gmail.com",
                password: "0723943883.Com"
            });
            console.log("Access token:", response);
            if (response.status === 200 && response.data.data.access_token) {
                const token = response.data.data.access_token;
                console.log("Access token:", response.data.data.access_token);

                // Optionally store in sessionStorage for later use
                sessionStorage.setItem("terraAccessToken", token);
    
                setResponseMessage("Access token retrieved successfully!");
                return token;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error: any) {
            console.error("Error fetching access token:", error);
            console.log(error.response);
            
            setResponseMessage(
                error.response?.data?.message || "Failed to retrieve access token. Please try again."
            );
            
            return null;  // Ensures the function returns a value
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResponseMessage("Fetching access token...");
    
        try {
            const token = await fetchAccessToken();  // First fetch the access token
            if (!token) {
                setResponseMessage("Failed to fetch access token. Please try again.");
                setIsLoading(false);
                return;
            }
    
            setResponseMessage("Submitting verification request...");
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, (formData as any)[key]);
            });
            console.log("Form data to send:", Object.fromEntries(formDataToSend.entries()));
            const response = await axios.post(
                "https://kub.terrasofthq.com/api/identity/enhanced-verification",
                Object.fromEntries(formDataToSend.entries()),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
    
            const result = response.data;
            setResponseMessage(result.message || result.data?.msg);
    
            if (result.status === 200) {
                const uniqueName = `${formData.first_name.toLowerCase()}${formData.last_name.toLowerCase()}.cnf.eth`;
                setCrefyName(uniqueName);
                await signTransaction(uniqueName);
            }
        } catch (error) {
            setResponseMessage("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    

    const signTransaction = async (uniqueName: string) => {
        if (!window.ethereum) {
            alert("No crypto wallet found. Please install MetaMask.");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        
        const transaction = {
            to: address,
            value: ethers.parseEther("0.01"),
            data: ethers.encodeBytes32String(uniqueName),
        };

        try {
            const txResponse = await signer.sendTransaction(transaction);
            await txResponse.wait();
            setResponseMessage("Transaction signed successfully!");
        } catch (error) {
            setResponseMessage("Transaction signing failed.");
        }
    };

    return (
        <Container>
            <div className="min-h-full my-6 bg-[#0A0B1E] p-8 rounded-3xl border border-gray-700 shadow-lg">
                <h2 className="text-3xl mb-6 font-bold text-center text-white">KYC Verification</h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            name="first_name" 
                            placeholder="First Name" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="text" 
                            name="last_name" 
                            placeholder="Last Name" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            name="middle_name" 
                            placeholder="Middle Name" 
                            onChange={handleChange} 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="text" 
                            name="id_number" 
                            placeholder="ID Number" 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            name="id" 
                            value={formData.id} // Set id as the address, it will not be editable
                            readOnly
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl cursor-not-allowed"
                        />
                        <input 
                            type="text" 
                            name="id_type" 
                            value={formData.id_type} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            name="country_code" 
                            value={formData.country_code} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                            type="text" 
                            name="citizenship" 
                            value={formData.citizenship} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-4 bg-[#1F1F1F] text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-xl transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLoading ? (
                            <span className="flex justify-center items-center">
                                <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2" />
                                Verifying...
                            </span>
                        ) : (
                            "Verify"
                        )}
                    </button>
                </form>
                {responseMessage && <p className="mt-4 text-lg text-center font-semibold text-green-400">{responseMessage}</p>}
                {crefyName && <p className="mt-2 text-lg text-center font-semibold text-yellow-400">Crefy Name: {crefyName}</p>}
            </div>
        </Container>
    );
};

export default KycVerification;
