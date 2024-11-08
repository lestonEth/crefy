// Container with children

// components imports
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "@/context/ThemeContext";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    const { darkMode } = useTheme();
    
    return (
        <div className={`flex flex-row items-center py-2 px-2 h-screen gap-10 ${darkMode ? "bg-gray-700" : "bg-gray-200"} `}>
            <Sidebar />

            <div className='w-full h-full rounded-xl overflow-y-scroll'>    
                <Topbar />
                {children}
            </div>
        </div>
    );
}