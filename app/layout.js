import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
    title: 'Megumi Ramen',
    description: 'Experience the rich flavors of authentic ramen and Asian cuisine, crafted with passion and tradition.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>     
        <Navigation></Navigation>
        <AuthProvider>{children}</AuthProvider>
        {/*<footer></footer>*/}
      </body>
    </html>
  );
}
