"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data antrean per poli
const initialQueueData = [
  { name: "Poli Umum", queue: 12, color: "#3B82F6" },
  { name: "Poli Gigi", queue: 8, color: "#10B981" },
  { name: "Poli Anak", queue: 15, color: "#F59E0B" },
  { name: "Poli Kandungan", queue: 5, color: "#EF4444" },
  { name: "Poli Mata", queue: 9, color: "#8B5CF6" },
];

export default function Home() {
  const [queueData, setQueueData] = useState(initialQueueData);

  // Fungsi untuk update jumlah antrean
  const updateQueue = (index: number, newValue: number) => {
    const updated = [...queueData];
    updated[index].queue = Math.max(0, newValue);
    setQueueData(updated);
  };

  return (
    <div className="bg-gray-50 p-3">
      <div className="max-w-6xl mx-auto">
        {/* Tabel dengan Bar Chart Menyamping */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {queueData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                        {item.queue} orang
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-[200px]">
                        <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                100,
                                (item.queue / 20) * 100
                              )}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}