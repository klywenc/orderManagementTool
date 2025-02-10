import "./globals.css";

export const metadata = {
    title: 'Megumi Ramen',
    description: 'Experience the rich flavors of authentic ramen and Asian cuisine, crafted with passion and tradition.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/*<nav></nav>*/}
        {children}
        {/*<footer></footer>*/}
      </body>
    </html>
  );
}
