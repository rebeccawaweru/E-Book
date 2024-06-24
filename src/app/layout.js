import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kill Your Enemies by Abel Marite",
  description: "Published and now available. Make your purchase today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
