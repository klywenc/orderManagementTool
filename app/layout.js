import "./globals.css";
import Navigation from "@/components/navigation/navigation";

export const metadata = {
    title: 'Megumi Ramen',
    description: 'Experience the rich flavors of authentic ramen and Asian cuisine, crafted with passion and tradition.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation></Navigation>
        {children}
        {/*<footer></footer>*/}
      </body>
    </html>
  );
}
