// Import necessary components
import { AppKit, W3mAccountActivityWidget } from '@reown/appkit';
import Connect from '@/components/Connect';

export default function Home() {
    return (
        <main className="p-8 min-h-screen bg-gray-100"
            style={{background: '#090c2c'}}
        >
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center p-4 rounded-md mb-8">
                <h1 className="text-2xl font-bold text-white-800">DCN</h1>
                <ul className="flex space-x-6">
                    <li><a href="#about" className="text-white-700 hover:text-blue-400">About</a></li>
                    <li><a href="#lean" className="text-white-700 hover:text-blue-400">Lean</a></li>
                    <li><a href="#develop" className="text-white-700 hover:text-blue-400">Develop</a></li>
                    <li><a href="#market" className="text-white-700 hover:text-blue-400">Contact</a></li>
                </ul>
              
                <div className="flex justify-center space-x-4 mt-6">
                    <Connect /> 
                </div>
            </nav>
        </main>
    );
}
