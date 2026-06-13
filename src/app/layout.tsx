import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dark Side | Premium Developer Portfolio",
  description: "A premium 3D portfolio inspired by Pink Floyd's The Dark Side of the Moon, built with Next.js 15, React Three Fiber, GSAP, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white selection:bg-rainbow-red/30 selection:text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

