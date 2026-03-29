"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ data }: { data: { bulan: string; masuk: number; keluar: number }[] }) {
  const chartData = {
    labels: data.map(item => item.bulan),
    datasets: [
      {
        label: "Masuk",
        data: data.map(item => item.masuk),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
      {
        label: "Keluar",
        data: data.map(item => item.keluar),
        backgroundColor: "#f97316",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full h-72">
      <Bar data={chartData} options={options} />
    </div>
  );
}
