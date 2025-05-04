import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatBot from "@/components/home/chat-bot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// NOTE: Azo Sans font configuration is commented out until the font files are available
// To use Azo Sans, you'll need to:
// 1. Purchase and download the font files
// 2. Place them in the public/fonts directory
// 3. Uncomment and update the configuration below
/*
const azoSans = localFont({
  src: [
    {
      path: '../public/fonts/AzoSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/AzoSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/AzoSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-azo-sans',
  display: 'swap'
});
*/

export const metadata: Metadata = {
  title: "Summit Expeditions | Professional Mountain Guides",
  description:
    "Professional mountain guides offering summit expeditions and skiing services worldwide. From luxury to basic trips, we have options for all experience levels.",
  keywords:
    "mountain expeditions, summit guides, mountain climbing, skiing, hiking, trekking, professional guides",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter`}>
        <ChatBot />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
