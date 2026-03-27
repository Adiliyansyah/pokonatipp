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
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between w-full">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-400 hidden md:block">
          Sistem Informasi MIB — Balai Rehabilitasi BNN Tanah Merah
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifikasi */}
        <div className="relative cursor-pointer hover:opacity-70 transition p-1">
          <IoNotificationsOutline className="text-2xl text-gray-600" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* Avatar inisial */}
        <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white text-sm font-bold select-none">
          {nama.charAt(0).toUpperCase()}
        </div>

        {/* Nama + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition text-sm"
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
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
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
