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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function BarChart() {
    const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
        {
        label: "Penjualan",
        data: [100, 200, 150, 250],
        backgroundColor: "#60a5fa",
        },
    ],
    };

    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        position: "top" as const,
        },
    },
    };

return (
    <div className="w-full h-[400px]">
        <Bar data={data} options={options} />
    </div>
    );
}