import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-white border-gray-200 dark:bg-gray-200 text-gray-900 text-center p-6 border-t mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
                <div className="flex flex-col items-center">
                    <p className="text-sm mt-2">© 2025 Megumi Ramen. All rights reserved.</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold">Quick Links</h2>
                    <nav className="mt-2 flex flex-col space-y-2">
                        <Link href="/menu" className="hover:underline">Menu</Link>
                        <Link href="/" className="hover:underline">Main Page</Link>
                    </nav>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="space-y-20 mt-2">

                        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <div className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                                <FaFacebook size={24}/>
                                Facebook
                            </div>
                        </Link>
                        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <div className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-2">
                                <FaInstagram size={24}/>
                                Instagram
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
