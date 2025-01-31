import { useState } from "react";
import Tesseract from "tesseract.js";

const IDExtractor: React.FC<{ formData: any; setFormData: any, setSteps: any }> = ({ formData, setFormData, setSteps }) => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [extractedData, setExtractedData] = useState<{
        firstName: string;
        middleName: string;
        lastName: string;
        idNumber: string;
    } | null>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            await processImage(file);
        }
    };

    const processImage = async (file: File) => {
        setLoading(true);
        try {
            const { data } = await Tesseract.recognize(file, "eng", {
                logger: (m) => console.log(m),
            });

            const extractedText = data.text;
            console.log("OCR Output:", extractedText);

            const parsedData = parseIDText(extractedText);
            setExtractedData(parsedData);

            // Send extracted data to OpenAI for verification
            await sendToOpenAI(extractedText);
        } catch (error) {
            console.error("OCR Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const parseIDText = (text: string) => {
        const namePattern = /(?:Name|Full Name):?\s*([A-Z]+)\s+([A-Z]+)?\s*([A-Z]+)?/i;
        const idPattern = /(?:ID|National ID|ID No|ID Number):?\s*(\d{6,12})/i;

        const nameMatch = text.match(namePattern);
        const idMatch = text.match(idPattern);

        return {
            firstName: nameMatch?.[1] || "Not Found",
            middleName: nameMatch?.[2] || "Not Found",
            lastName: nameMatch?.[3] || "Not Found",
            idNumber: idMatch?.[1] || "Not Found",
        };
    };

    const sendToOpenAI = async (data: any) => {
        console.log("Sending to OpenAI:", data);
        try {
            const response = await fetch("/api/extract-id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: data}),
            });
            const result = await response.json();
            setFormData((prev: any) => ({
                ...prev,
                first_name: result.firstName,
                middle_name: result.middleName,
                last_name: result.lastName,
                id_number: result.idNumber,
            }));
            setExtractedData(result);
            setSteps(2);    
        } catch (error) {
            console.error("Error sending to OpenAI:", error);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2 text-gray-200">Upload National ID</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

            {image && <img src={image} alt="ID Preview" className="w-64 mb-4 rounded-lg" />}

            {loading && <p className="text-gray-500">Processing image... Please wait.</p>}

            {extractedData && (
                <div className="p-4 border rounded-md text-gray-300">
                    <h3 className="text-lg font-bold mb-2">Extracted Information:</h3>
                    <p><strong>First Name:</strong> {extractedData.firstName}</p>
                    <p><strong>Middle Name:</strong> {extractedData.middleName}</p>
                    <p><strong>Last Name:</strong> {extractedData.lastName}</p>
                    <p><strong>ID Number:</strong> {extractedData.idNumber}</p>
                </div>
            )}
        </div>
    );
};

export default IDExtractor;