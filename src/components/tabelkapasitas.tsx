"use client";
import { kapasitasData } from "@/app/data/overview2.js";

const data = kapasitasData.map((item) => ({
  ...item,
  persen: item.kapasitas > 0 ? `${Math.round((item.terisi / item.kapasitas) * 100)}%` : "0%",
}));

const total = {
  kapasitas: data.reduce((a, b) => a + b.kapasitas, 0),
  terisi: data.reduce((a, b) => a + b.terisi, 0),
  kosong: data.reduce((a, b) => a + b.kosong, 0),
};

export default function TabelKapasitas() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[50px_300px_120px_120px_120px_120px] bg-blue-500 px-6 py-4 font-semibold text-white text-sm">
          <div>No</div>
          <div>Fase Rehabilitasi</div>
          <div className="text-center">Kapasitas</div>
          <div className="text-center">Terisi</div>
          <div className="text-center">Kosong</div>
          <div className="text-center">% Hunian</div>
        </div>

        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[50px_300px_120px_120px_120px_120px] px-6 py-4 items-center border-t hover:bg-blue-50 transition text-sm"
          >
            <div>{item.no}</div>
            <div>{item.fase}</div>
            <div className="text-center">{item.kapasitas}</div>
            <div className="text-center">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{item.terisi}</span>
            </div>
            <div className="text-center">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">{item.kosong}</span>
            </div>
            <div className="text-center font-semibold text-gray-700">{item.persen}</div>
          </div>
        ))}

        {/* Total */}
        <div className="grid grid-cols-[50px_300px_120px_120px_120px_120px] px-6 py-3 bg-gray-100 font-bold text-sm border-t-2">
          <div></div>
          <div>Total</div>
          <div className="text-center">{total.kapasitas}</div>
          <div className="text-center text-blue-700">{total.terisi}</div>
          <div className="text-center text-yellow-700">{total.kosong}</div>
          <div className="text-center">
            {Math.round((total.terisi / total.kapasitas) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
