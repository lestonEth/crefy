"use client";
import Container from "../components/Container";
import { IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";
import { ContentCopy } from "@mui/icons-material";
import { useAppKitAccount } from "@reown/appkit/react";


export default function Dashboard () {
    const { caipAddress, address, isConnected, status } = useAppKitAccount();

    // function to trim the address
    const trimAddress = (address: any) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    return (
        <Container>
            <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-700">Welcome to DCN Dashboard</h3>
            </div>

            <div className="mt-5 flex justify-between items-center h-[100%] border-2 min-w-[95%]">
                {/* first col */}
                <div className="w-3/4 flex flex-col p-4 min-h-[100%]">

                    <div className="flex justify-between w-[100%] gap-4">
                        {/* profile card */}
                        <div className="bg-white shadow-xl item-end w-1/3 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <div>
                                    <div className="h-[130px] w-[130px] rounded-xl">
                                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" className="h-full w-full object-cover rounded-xl" />
                                    </div>

                                    {/* wallet address if connected with copy mui icon */}
                                    <div className="flex items-center mt-4">
                                        <span className="text-gray-800">
                                            {isConnected ? trimAddress(address) : "Connecting Wallet..."}
                                        </span>
                                        <IconButton className="text-gray-800">
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </div>
                                </div>

                                {/* share link mui icon */}
                                <IconButton className="text-gray-800">
                                    <Share fontSize="small" />
                                </IconButton>
                            </div>

                            <div className="mt-4 flex flex-row items-center w-[100%]">
                                <div className="flex flex-col w-1/3 ml-4">
                                    <h3 className="text-lg font-bold text-gray-800">NFTs</h3>
                                    <h2 className="text-2xl font-bold text-black">03</h2>
                                </div>

                                <div className="flex flex-col text-center w-1/3 px-3 border-r-2 border-l-2">
                                    <h3 className="text-lg font-bold text-gray-800">Collections</h3>
                                    <h2 className="text-2xl font-bold text-black">03</h2>
                                </div>

                                <div className="flex flex-col w-1/3 px-3">
                                    <h3 className="text-lg font-bold text-gray-800">Holding</h3>
                                    <h2 className="text-2xl font-bold text-black">03</h2>
                                </div>
                            </div>
                        </div>

                        {/* wallet analysis */}
                        <div className="bg-white shadow-xl item-end min-h-[100%] w-2/3 p-4 rounded-lg">
                            <h3 className="text-lg font-extrabold text-gray-800">Cert Analysis</h3>
                        </div>
                    </div>

                    <div className="flex justify-between w-[100%] gap-4 my-3">
                        {/* profile card */}
                        <div className="bg-white shadow-xl item-end w-1/3 h-[200px] p-4 rounded-lg">
                            <h3 className="text-lg font-extrabold text-gray-800">Cert Analysis</h3>
                        </div>

                        {/* wallet analysis */}
                        <div className="bg-white shadow-xl item-end min-h-[100%] w-2/3 p-4 rounded-lg">
                            <h3 className="text-lg font-extrabold text-gray-800">Quick Actions</h3>
                        </div>
                    </div>

                    {/* wallet analysis */}
                    <div className="bg-white shadow-xl item-end min-h-[400px] w-[100%] p-4 rounded-lg">
                        <h3 className="text-lg font-extrabold text-gray-800">Collection</h3>
                    </div>
                            
                </div>

                {/* second col */}
                <div className="w-1/4 flex flex-col p-4 min-h-[100%] mt-6">
                    <div className="bg-white shadow-xl item-end h-[60%] min-h-[550px] w-[100%] p-4 rounded-lg">
                        <h3 className="text-lg font-extrabold text-gray-800">Contracts Oppenings</h3>
                    </div>

                    <div className="bg-white shadow-xl item-end h-[60%] min-h-[400px] mt-4 w-[100%] p-4 rounded-lg">
                        <h3 className="text-lg font-extrabold text-gray-800">Top Creators</h3>
                    </div>
                </div>

            </div>
                
        </Container>
    )
}