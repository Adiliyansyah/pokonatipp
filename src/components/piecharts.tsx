"use client";

import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const data = {
    labels: ["Makanan", "Transportasi", "Hiburan", "Lainnya"],
    datasets: [
        {
        label: "Pengeluaran",
        data: [40, 25, 20, 15],
        backgroundColor: [
            "#facc15",
            "#60a5fa",
            "#4ade80",
            "#f472b6",
        ],
        borderWidth: 1,
        },
    ],
    };

return (
    <div className="w-96 mx-auto">
        <Pie data={data} />
    </div>
    );
}