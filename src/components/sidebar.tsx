"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { RxPeople } from "react-icons/rx";
import { LuBuilding2 } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { FaRegStar, FaIdCard } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const navItems = [
  { href: "/overview", label: "Overview", icon: <CiGrid41 size={20} /> },
  { href: "/rehabilitasi", label: "Rehabilitasi Klien", icon: <RxPeople size={20} /> },
  { href: "/biodata", label: "Biodata Klien", icon: <FaIdCard size={18} /> },
  { href: "/kapasitas", label: "Kapasitas & Hunian", icon: <LuBuilding2 size={20} /> },
  { href: "/sdm", label: "SDM", icon: <BsPersonGear size={20} /> },
  { href: "/keuangan", label: "Keuangan", icon: <MdAttachMoney size={20} /> },
  { href: "/kepuasan", label: "Kepuasan Layanan", icon: <FaRegStar size={18} /> },
  { href: "/tambahpasien", label: "Tambah Pasien", icon: <FaIdCard size={18} /> },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-linear-to-b from-slate-900 to-blue-900 text-white transition-all duration-300 z-50 flex flex-col shadow-2xl ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center px-4 py-4 border-b border-blue-800 ${isOpen ? "justify-between" : "justify-center"}`}>
          {isOpen && (
            <div>
              <p className="font-bold text-lg leading-tight">BNN</p>
              <p className="text-xs text-blue-300 leading-tight">Tanah Merah</p>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-blue-800 transition"
            title="Toggle sidebar"
          >
            <FaBars size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-linear-to-r from-orange-400 to-orange-500 text-white shadow-lg scale-105"
                    : "text-blue-200 hover:bg-blue-800/50 hover:text-white"
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="px-4 py-3 border-t border-blue-800">
            <p className="text-xs text-blue-400">Manajemen Informasi Biomedis v1.0 — Prototipe</p>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
