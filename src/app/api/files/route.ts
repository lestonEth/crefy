import { NextResponse, NextRequest } from "next/server";
import { pinata } from "@/utils/config"

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get("file") as unknown as File;
        const uploadData = await pinata.upload.file(file)
        const url = await pinata.gateways.convert(uploadData.IpfsHash)
        return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const ipfsUrl = request.nextUrl.searchParams.get("ipfsUrl")
    if (!ipfsUrl) {
        return NextResponse.json({ error: "Missing ipfsUrl parameter" }, { status: 400 });
    }
    const { data } = await pinata.gateways.get(ipfsUrl)
    console.log(data)
    return NextResponse.json(data, { status: 200 });
}