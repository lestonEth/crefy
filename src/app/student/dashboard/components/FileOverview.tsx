"use client"

// cert icon from mui
import { Assignment } from "@mui/icons-material";

export default function FileOverview() {
    return (
        <div className="bg-gradient-to-t from-[#12132D]/10 via-[#0A0B1E]/5 to-transparent p-4 rounded-2xl w-[100%] min-h-[450px]">
            <div className="flex gap-5 items-center">
                <Assignment />
                <h3 className="text-lg font-bold text-gray-700">Certificate Collection</h3>
            </div>
        </div>
    )
}
