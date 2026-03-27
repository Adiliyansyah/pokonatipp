"use client";

import './globals.css';
import { useState } from "react";
import { Toaster } from "sonner";
import Navbar from "@/app/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="id">
      <body className="bg-white">
        {/* Navbar - Pindahkan ke dalam div dengan margin */}
        <div className={`fixed top-0 right-0 z-40 transition-all duration-300 ${
          isOpen ? "left-64" : "left-20"
        }`}>
          <Navbar />
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Content */}
        <main className={`transition-all duration-300 p-6 mt-16 ${
          isOpen ? "ml-64" : "ml-20"
        }`}>
          {children}
        </main>

        {/* Toaster */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}