import { NextResponse, NextRequest } from "next/server";
const ethers = require("ethers")
const abi = require('.credentials.json')

const url = process.env.LISK_SEPOLIA_NODE_URL
const provider = new ethers.JsonRpcProvider(url)

const privateKey = "po3jeihgcdvwabjnk"
const signer = new ethers.wallet(privateKey, provider)

const reciever = "0xB5E8d0eE8C54b04fbaEb04BE83680cad949B701F"

async function sendTx(to: any) {
    const tx =  await signer.sendTransaction({
        to: to,
        value: ethers.parseEther("0.01")
    });

    console.log(tx);
}

import 

// Replace the contractAddress' value with the desired contract.
const contractAddress = "0x087066B1cd32c7F760F9EB3dcB015c9BA0BD5d76"
// read-only    
const contract = new ethers.Contract(contractAddress, abi, provider);
const abi = [

];

async function getHello() {
    const value = await contract.message("0x3C46A11471f285E36EE8d089473ce98269D1b081");
    console.log(value.toString());
}

getHello();