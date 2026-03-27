"use client";

import Link from "next/link";

import { FaBars } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { RxPeople } from "react-icons/rx";
import { LuBuilding2 } from "react-icons/lu";
import { BsPersonGear } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
    <aside
      className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-900 w-8 h-8 rounded flex items-center justify-center"
        >
          <FaBars />
          </button>
        </div>
        
        {/* Konten sidebar */}
        <ul className="text-white px-2 py-2  space-y-0">
          {isOpen && (
            <li className="text-center italic font-bold text-2xl">BNN</li>
  
          )}
          
          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors ">
            <Link href="/overview" className="flex items-center w-full">
            <CiGrid41 className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Overview
            </span>
            </Link>
          </li>

          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors">
            <Link href="/rehabilitasi" className="flex items-center w-full">
            <RxPeople className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Rehabilitasi Klien
            </span>
            </Link>
          </li>

          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors">
            <Link href="/kapasitas" className="flex items-center w-full">
            <LuBuilding2 className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Kapasitas & Hunian
            </span>
            </Link>
          </li>

          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors">
            <Link href="/sdm" className="flex items-center w-full">
            <BsPersonGear className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              SDM
            </span>
            </Link>
          </li>
          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors">
            <Link href="/keuangan" className="flex items-center w-full">
            <MdAttachMoney className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Keuangan
            </span>
            </Link>
          </li>

          <li className="flex items-center hover:bg-orange-300 p-3 rounded transition-colors">
            <Link href="/kepuasan" className="flex items-center w-full">
            <FaRegStar className="mr-2" />
            <span className={`transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Kepuasan Layanan
            </span>
            </Link>
          </li>
        </ul>
        </aside>
      
            {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      </>
    );
  }