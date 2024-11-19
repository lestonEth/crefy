    import React from "react";

    interface NFTCardProps {
        title: string;
        description: string;
        imageUrl: string;
        tokenId: string;
        transactionHash: string;
        transactionReceipt: {
            to: string;
            from: string;
            hash: string;
            blockNumber: number;
            gasUsed: bigint;
            gasPrice: bigint;
            status: number;
        };
    }

    const NFTCard: React.FC<NFTCardProps> = ({
        title,
        description,
        imageUrl,
        tokenId,
        transactionHash,
        transactionReceipt,
    }) => {
        return (
            <div className="border border-gray-600 rounded-lg bg-[#1E2327] p-6 text-gray-300 w-96 space-y-4 flex w-[100%] gap-10">
                {/* Image Section */}
                <div className="relative w-full h-48 bg-gray-600 rounded-lg overflow-hidden w-1/4">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={imageUrl}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <span className="text-sm text-gray-400">No Image Available</span>
                        </div>
                    )}
                </div>

                <div className="w-3/4">
                    <div className="flex">
                        <div>
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="text-sm text-gray-400">{description}</p>
                        </div>
                    {/* Token ID & Transaction Hash */}
                    <div className="space-y-1">
                        <p className="text-sm">
                            <span className="font-semibold">Token ID:</span> {tokenId}
                        </p>
                        <p className="text-sm break-words">
                            <span className="font-semibold">Transaction Hash:</span>{" "}
                            <a
                                href={`https://etherscan.io/tx/${transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {transactionHash}
                            </a>
                        </p>
                    </div>
                    </div>
                    {/* Transaction Receipt */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold">Transaction Receipt</h3>
                        <p className="text-sm">
                            <span className="font-semibold">To:</span> {transactionReceipt.to}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">From:</span> {transactionReceipt.from}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Block Number:</span>{" "}
                            {transactionReceipt.blockNumber}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Gas Used:</span>{" "}
                            {transactionReceipt.gasUsed.toString()}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Gas Price:</span>{" "}
                            {transactionReceipt.gasPrice.toString()} wei
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Status:</span>{" "}
                            {transactionReceipt.status === 1 ? "Success" : "Failed"}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    export default NFTCard;
