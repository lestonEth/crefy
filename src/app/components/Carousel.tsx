"use client";

export default function Carousel() {
    return (
        <div className="min-h-screen flex flex-col p-8">
            {/* Carousel Section */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 bg-gray-900 rounded-3xl shadow-lg">
                
                {/* Text Section */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left lg:mr-8">
                    <h1 className="text-4xl lg:text-7xl font-extrabold text-white leading-tight mb-6 lg:mb-8">
                        Step Into Your Digital Future With DCN
                    </h1>
                    <p className="text-lg lg:text-2xl text-gray-300 mb-8">
                        A decentralized network for managing credentials and certificates.
                    </p>

                    <div className="flex space-x-10 align-end">
                        <button className="bg-blue-800 hover:bg-blue-700 text-white text-lg font-semibold px-5 py-2 rounded-md transition duration-300 ease-in-out shadow-md">
                            Get Started
                        </button>

                        {/* read document link */}
                        <a href="#read" className="text-blue-800 text-lg font-semibold hover:underline">
                            Read Documentation
                        </a>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                {/* shadow color white */}
                    <img src="/images/hero.png" alt="DCN Hero" className="w-64 h-64 lg:w-96 lg:h-96 rounded-full shadow-lg border-4 border-gray-900" />
                </div>
            </div>
        </div>
    );
}
