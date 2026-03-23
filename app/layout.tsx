import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TransitionProvider from "./components/TransitionProvider";
import BoltBackground from "./components/BoltBackground";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peter Sidlauskas",
  description: "Director/Editor/Developer/Designer - NYC",

  openGraph: {
    title: "Peter Sidlauskas",
    description: "Director/Editor/Developer/Designer - NYC",
    url: "https://pjsid.com",
    siteName: "Peter Sidlauskas",
    images: [
      {
        url: "https://pjsid.com/og-image.jpg", // 👈 THIS IS THE IMPORTANT PART
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
       <TransitionProvider>{children}</TransitionProvider> 
      </body>
    </html>
  );
}
