"use client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale, 
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    plugins,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function HorizontalBArChart() {
    const data = {
        labels: ["Makanan", "Transportasi", "Hiburan", "Lainnya"],
        datasets: [
            {
                label: "Pengeluaran",
                data: [400, 250, 200, 150],
                backgroundColor: "#34d399",
                borderRadius: 8,
            },
        ],
    };

const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
    },
};

return (
    <div className="w-[500px] mx-auto">
        <Bar data={data} options={options} />
    </div>
);
}