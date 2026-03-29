"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [nama, setNama] = useState("Admin");
  const [role, setRole] = useState("");

  useEffect(() => {
    setNama(localStorage.getItem("nama") || "Admin");
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("nama");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 px-6 py-3 flex items-center justify-between w-full">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500 hidden md:block font-medium">
          Manajemen Informasi Biomedis — Balai Rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <div className="relative cursor-pointer hover:opacity-80 transition-all p-2 hover:bg-gray-100 rounded-lg">
          <IoNotificationsOutline className="text-2xl text-gray-700" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </div>

        {/* Avatar inisial */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center text-white text-sm font-bold select-none shadow-md">
          {nama.charAt(0).toUpperCase()}
        </div>

        {/* Nama + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 text-gray-700 font-semibold cursor-pointer hover:text-gray-900 transition text-sm"
          >
            <span className="max-w-[120px] truncate">{nama}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-100 backdrop-blur-sm">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{nama}</p>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User size={14} /> Profil
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={14} /> Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
