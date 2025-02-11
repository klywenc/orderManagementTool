import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import AuthProvider from "@/components/providers/AuthProvider";
import Footer from "@/components/footer/footer";

export const metadata = {
    title: 'Megumi Ramen',
    description: 'Experience the rich flavors of authentic ramen and Asian cuisine, crafted with passion and tradition.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation></Navigation>
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
