import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";

export const config = {
    api: {
        bodyParser: false, // Required for file uploads
    },
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();
        console.log(text)

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }
        console.log("Received text:", text);

        // ✅ Send text to OpenAI for sorting
        const response = await openai.chat.completions.create({
            model: "gpt-4o", // Supports text processing
            messages: [
                {
                    role: "user",
                    content: `Extract and sort the following text into structured data with fields: first_name, middle_name, last_name, and id_number. Input text: "${text}". Response format:
                        "first_name": "<first_name>",
                        "middle_name": "<middle_name>",
                        "last_name": "<last_name>",
                        "id_number": "<id_number>"`,
                },
            ],
        });

        // Extract structured data from OpenAI response
        const extractedText = response.choices[0]?.message?.content || "";
        console.log("Response:", extractedText);

        // Parse the extracted text
        const parsedData = {
            firstName: extractedText.match(/"first_name":\s*"(\w+)"/i)?.[1] || "Not Found",
            middleName: extractedText.match(/"middle_name":\s*"(\w+)"/i)?.[1] || "Not Found",
            lastName: extractedText.match(/"last_name":\s*"(\w+)"/i)?.[1] || "Not Found",
            idNumber: extractedText.match(/"id_number":\s*"(\d+)"/i)?.[1] || "Not Found",
        };

        return NextResponse.json(parsedData, { status: 200 });
    } catch (error: any) {
        console.error("Error processing text:", error.response);
        return NextResponse.json(
            { error: error.message || "Failed to process text" },
            { status: 500 }
        );
    }
}
