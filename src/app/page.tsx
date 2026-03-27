"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative flex h-screen items-center overflow-hidden bg-white w-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Konten Utama*/}
      <div className={`fixed flex-col w-screen items-center max-w-full top-0 left-0 right-0 h-full bg-white z-0 transition-all duration-300 ${isSidebarOpen ? "md:ml-40" : "md:ml-10"} overflow-y-auto`}>
      

        </div>
      </div>
    );
  }