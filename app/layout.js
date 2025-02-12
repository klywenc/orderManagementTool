import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import AuthProvider from "@/components/providers/AuthProvider";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/app/contexts/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
    title: 'Megumi Ramen',
    description: 'Poznaj bogate smaki autentycznego ramenu i kuchni azjatyckiej, tworzonej z pasją i tradycją.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <AuthProvider>
                    <CartProvider>
                        <Navigation />
                        <ToastContainer />
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                    </CartProvider>
                </AuthProvider>
                <Footer />
            </body>
        </html>
    );
}