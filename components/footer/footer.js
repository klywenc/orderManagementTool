import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="dark:bg-gray-100 bg-white border-gray-200 text-gray-900 text-center p-6 border-t mt-auto" style={{boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
                <div className="flex flex-col items-center">
                    <h2 className="px-2 py-4 text-2xl font-extrabold text-orange-700">Megumi Ramen</h2>
                    <p className="text-sm mt-2">© 2025 Megumi Ramen. Wszelkie prawa zastrzeżone.</p>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold">Szybkie linki</h2>
                    <nav className="mt-2 flex flex-col space-y-2">
                        <Link href="/menu" className="hover:underline">Menu</Link>
                        <Link href="/" className="hover:underline">Strona główna</Link>
                    </nav>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold">Follow Us</h2>
                    <div className="flex flex-col space-y-3 mt-2">
                        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <div
                                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2">
                                <FaFacebook size={24}/>
                                Facebook
                            </div>
                        </Link>
                        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <div
                                className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-2">
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
