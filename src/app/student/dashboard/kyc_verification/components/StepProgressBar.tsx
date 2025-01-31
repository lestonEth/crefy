"use client";

import React from "react";

interface StepProgressBarProps {
    step: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ step }) => {
    return (
        <div className="flex flex-col items-center w-full mb-6">
            {/* Step Progress Bar */}
            <div className="flex justify-between w-full max-w-lg mb-4">
                {/* Step 1: Upload Image */}
                <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-500" : "text-gray-500"}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step >= 1 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500"
                    }`}>
                        1
                    </div>
                    <p className="mt-2 text-sm">Upload Image</p>
                </div>

                {/* Line between steps */}
                <div className={`w-16 h-1 self-center ${
                    step >= 2 ? "bg-blue-500" : "bg-gray-500"
                }`} />

                {/* Step 2: Extracting Data */}
                <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-500" : "text-gray-500"}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step >= 2 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500"
                    }`}>
                        2
                    </div>
                    <p className="mt-2 text-sm">Extracting Data</p>
                </div>

                {/* Line between steps */}
                <div className={`w-16 h-1 self-center ${
                    step >= 3 ? "bg-blue-500" : "bg-gray-500"
                }`} />

                {/* Step 3: KYC Complete */}
                <div className={`flex flex-col items-center ${step === 3 ? "text-blue-500" : "text-gray-500"}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                        step === 3 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500"
                    }`}>
                        3
                    </div>
                    <p className="mt-2 text-sm">KYC Complete</p>
                </div>
            </div>
        </div>
    );
};

export default StepProgressBar;
