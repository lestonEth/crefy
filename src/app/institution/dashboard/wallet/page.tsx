"use client";
import React, { useState } from "react";
import { ethers } from "ethers";
import abi from "@/app/api/abi.js";

const CONTRACT_ADDRESS = "your_contract_address_here";

const IssueCredential = () => {
    const [studentAddress, setStudentAddress] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [error, setError] = useState("");

    const handleIssueCredential = async () => {
        try {
            // Request access to the user's Ethereum account
            if (typeof window !== 'undefined' && !window.ethereum) {
                throw new Error("MetaMask is not installed!");
            }

            const provider = new ethers.JsonRpcProvider(process.env.LISK_SEPOLIA_NODE_URL ?? "");
            const signer = provider.getSigner();

            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

            // Call the issueCredential function
            const tx = await contract.issueCredential(studentAddress, tokenURI);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();

            // Transaction successful
            setTransactionHash(receipt.transactionHash);
            setError("");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Issue Credential</h1>
            <input
                type="text"
                placeholder="Student Address"
                value={studentAddress}
                onChange={(e) => setStudentAddress(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Token URI"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
            />
            <br />
            <button onClick={handleIssueCredential}>Issue Credential</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default IssueCredential;
