"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: ["Pria", "Wanita"],
    datasets: [
      {
        label: "Distribusi Gender",
        data: [192, 55],
        backgroundColor: ["#3b82f6", "#ec4899"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="w-72 mx-auto">
      <Pie data={data} />
    </div>
  );
}
