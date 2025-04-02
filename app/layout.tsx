import type React from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import { ParticleProvider } from "@/contexts/ParticleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Website",
  description: "Frontend Developer Portfolio",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="overflow-hidden">
      <body className={`${inter.className} overflow-hidden`}>
        <ParticleProvider>
          <Navbar />
          <Sidebar />
          <MobileMenu />
          {children}
        </ParticleProvider>
      </body>
    </html>
  );
}
