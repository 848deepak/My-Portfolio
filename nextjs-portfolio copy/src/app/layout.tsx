import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deepak Pandey - Portfolio",
  description: "Full-stack developer and Computer Science Engineering student at Chandigarh University",
  keywords: ["portfolio", "developer", "full-stack", "react", "next.js", "typescript"],
  authors: [{ name: "Deepak Pandey" }],
  creator: "Deepak Pandey",
  openGraph: {
    title: "Deepak Pandey - Portfolio",
    description: "Full-stack developer and Computer Science Engineering student",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        <main className="pt-16 pb-8">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
