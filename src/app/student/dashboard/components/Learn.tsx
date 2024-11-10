"use client";
import { Typography, Box } from "@mui/material";

// Sample data for DCN documentation
const docSections = [
    { title: "Introduction", description: "Learn the basics of the Decentralized Certificate Network (DCN)." },
    { title: "How It Works", description: "Understand the secure and transparent mechanisms behind DCN." },
    { title: "Use Cases", description: "Discover applications of DCN across various industries." },
    { title: "Getting Started", description: "Get started with DCN and issuing certificates." },
    { title: "Security & Privacy", description: "Explore how DCN ensures security and privacy." },
    { title: "FAQ", description: "Find answers to common questions about DCN." },
];

export default function Learn() {
    return (
        <Box
            className="bg-[#12132D] p-6 rounded-xl overflow-y-auto"
            style={{
                height: "80vh", // Set height to make it scrollable within the dashboard
            }}
        >
            <Typography variant="h5" color="white" gutterBottom>
                Learn About DCN
            </Typography>

            {docSections.map((section, index) => (
                <Box key={index} my={4}>
                    <Typography variant="h6" color="white" fontWeight="bold" mb={1}>
                        {section.title}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {section.description}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
