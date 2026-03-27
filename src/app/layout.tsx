"use client";

import './globals.css';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Navbar from "@/app/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/";

  return (
    <html lang="id">
      <body className="bg-gray-50">
        {isAuthPage ? (
          // Halaman auth: tanpa sidebar & navbar
          <>{children}</>
        ) : (
          <>
            {/* Navbar */}
            <div
              className={`fixed top-0 right-0 z-40 transition-all duration-300 ${
                isOpen ? "left-64" : "left-20"
              }`}
            >
              <Navbar />
            </div>

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Content */}
            <main
              className={`transition-all duration-300 pt-20 pb-6 px-6 min-h-screen ${
                isOpen ? "ml-64" : "ml-20"
              }`}
            >
              {children}
            </main>
          </>
        )}

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
