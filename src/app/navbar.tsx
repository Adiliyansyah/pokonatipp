"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between w-full">
      {/* Left side - bisa ditambahkan judul halaman atau search */}
      <div className="flex items-center gap-4">
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifikasi */}
        <div className="relative cursor-pointer hover:opacity-70 transition">
          <IoNotificationsOutline className="text-2xl text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar */}
        <div className="relative w-10 h-10">
          <Image
            src="/profile.jpg"
            alt="profile"
            fill
            className="rounded-full object-cover cursor-pointer hover:opacity-80 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </div>

        {/* Nama dengan Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition"
          >
            Admin
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // Navigate to profile
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // Navigate to settings
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Logout Icon - Opsional, bisa dihapus jika sudah ada di dropdown */}
        <button onClick={handleLogout} className="hover:scale-110 transition">
          <LogOut className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </nav>
  );
}