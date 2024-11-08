"use client";

export default function HowToGetStarted() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 ">
            <h1 className="text-4xl lg:text-5xl text-center font-extrabold text-white leading-tight mb-8">
                How to Get Started
            </h1>

            <h2 className="text-xl font-semibold text-gray-500 mb-20">
                Follow these steps to get started with DCN.
            </h2>

            {/* Grid with centered square items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-64 h-64 flex flex-col items-center justify-center rounded-lg p-4 text-center hover:scale-105" style={{ backgroundColor: '#040b33' }}>
                        <h2 className="text-2xl font-bold text-white mb-2">Step {index + 1}</h2>
                        <p className="text-gray-300">
                            Create an account on the DCN platform.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
