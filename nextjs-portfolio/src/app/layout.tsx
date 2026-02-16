import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deepak Pandey - Full-Stack Developer & Portfolio",
  description: "Full-stack developer specializing in React, Next.js, and Node.js. Computer Science Engineering student at Chandigarh University. Portfolio showcasing projects in web development, identity verification, and more.",
  keywords: [
    "Deepak Pandey",
    "portfolio",
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js",
    "TypeScript",
    "Chandigarh University",
    "web development",
    "software engineer",
    "JavaScript",
    "frontend developer",
    "backend developer",
    "full-stack web development",
    "MERN stack",
    "web application developer",
    "React portfolio",
    "developer portfolio",
  ],
  authors: [{ name: "Deepak Pandey", url: "https://848deepak.vercel.app" }],
  creator: "Deepak Pandey",
  publisher: "Deepak Pandey",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://848deepak.vercel.app"),
  alternates: {
    canonical: "https://848deepak.vercel.app",
    languages: {
      "en-US": "https://848deepak.vercel.app",
    },
  },
  openGraph: {
    title: "Deepak Pandey - Full-Stack Developer & Portfolio",
    description: "Explore my portfolio showcasing full-stack web development projects, skills, and experience in React, Next.js, Node.js, and modern web technologies.",
    url: "https://848deepak.vercel.app",
    type: "website",
    locale: "en_US",
    siteName: "Deepak Pandey Portfolio",
    countryName: "India",
    images: [
      {
        url: "https://848deepak.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Deepak Pandey - Full-Stack Developer",
        type: "image/jpeg",
        secureUrl: "https://848deepak.vercel.app/og-image.jpg",
      },
      {
        url: "https://848deepak.vercel.app/og-image-square.jpg",
        width: 400,
        height: 400,
        alt: "Deepak Pandey - Full-Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Pandey - Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and Node.js. View my portfolio and projects.",
    images: ["https://848deepak.vercel.app/og-image.jpg"],
    creator: "@deepakpandey",
    site: "@deepakpandey",
  },
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "Deepak Pandey Portfolio",
  },
  verification: {
    google: "lAIPGrL7EvzW4N4fplcqbG_t_EeIF8Tb1VfzxzK9oP0",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
  currentSection,
}: Readonly<{
  children: React.ReactNode;
  currentSection?: string;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Deepak Pandey" />
        <meta name="application-name" content="Deepak Pandey Portfolio" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Full-stack developer specializing in React, Next.js, and Node.js. Computer Science Engineering student at Chandigarh University. Portfolio showcasing projects in web development." />
        <meta name="author" content="Deepak Pandey" />
        <meta name="creator" content="Deepak Pandey" />
        <meta name="publisher" content="Deepak Pandey" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="copyright" content="Deepak Pandey" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://848deepak.vercel.app" />
        
        {/* Alternate Links */}
        <link rel="alternate" hrefLang="en-US" href="https://848deepak.vercel.app" />
        
        {/* Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Structured Data */}
        <JsonLd />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`} style={{ colorScheme: 'dark' }} suppressHydrationWarning>
        <Header currentSection={currentSection} />
        <main className="pt-16 sm:pt-18 lg:pt-20 pb-8">
        {children}
        </main>
        <Footer backgroundColor="bg-black" />
      </body>
    </html>
  );
}
