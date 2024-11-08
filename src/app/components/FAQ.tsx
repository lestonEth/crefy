"use client";
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 text-white rounded-lg my-2 cursor-pointer transition-transform transform hover:scale-105 border-2 border-blue-900"
            style={{ maxWidth: "500px", minWidth: "500px", minHeight: "60px" }}
        >
            <div className="flex items-center justify-between space-x-2">
                <h3 className="text-lg">{question}</h3>
                <div className="text-2xl font-bold">{isOpen ? "▲" : "▼"}</div>
            </div>
            {isOpen && (
                <p className="text-sm text-blue-200 mt-2">{answer}</p>
            )}
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "What is a Decentralized Certificate Network?",
            answer: "A Decentralized Certificate Network utilizes blockchain technology to provide secure, verifiable, and tamper-proof digital certificates without the need for a central authority."
        },
        {
            question: "How does a Decentralized Certificate Network work?",
            answer: "The network records certificates on a blockchain, ensuring that certificates are immutable and easily accessible. Verification is done through blockchain nodes, providing decentralized validation."
        },
        {
            question: "What are the benefits of a Decentralized Certificate Network?",
            answer: "It ensures security, transparency, and authenticity. Users and organizations can verify certificates independently, reducing fraud and increasing trust in credentials."
        },
        {
            question: "How do I issue a certificate on a Decentralized Certificate Network?",
            answer: "To issue a certificate, an organization would create a certificate with the relevant details and store it on the blockchain. The certificate is then permanently available for verification."
        }
    ];

    return (
        <div className="max-w-full mx-auto p-6 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-center text-blue-200 mb-6">The Web 3.0 leverages AI, Machine Learning, and blockchain technology. It is expected to achieve real-world communication.</p>
            {faqs.map((faq, index) => (
                <div key={index} className='flex items-center justify-start space-x-10 p-4 text-white rounded-lg my-2 cursor-pointer transition-transform transform hover:scale-105'>
                    {/* circular div */}
                    <div className="bg-blue-600 rounded-full flex items-center justify-center"
                        style={{ width: "40px", height: "40px" }}
                    >
                        <span>{index + 1}</span>
                    </div>
                    {/* horizontal line */}
                    <div className="bg-blue-600 faq_line" style={{ width: "300px", height: '1px'}}></div>

                    <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                </div>
            ))}
        </div>
    );
};

export default FAQ;
