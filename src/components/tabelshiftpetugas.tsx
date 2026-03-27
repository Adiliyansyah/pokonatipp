"use client";

const data = [
  {
    no: 1,
    jumlah: 21,
    keterangan: "PAGI (07.30 - 17.00)",
  },
  {
    no: 2,
    jumlah: 21,
    keterangan: "MALAM (17.00 - 07.30)",
  },
];

export default function TabelShiftPetugas() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[80px_120px_1fr] bg-green-400 px-6 py-4 font-semibold text-white text-sm">
          <div>No</div>
          <div>Jumlah</div>
          <div>Keterangan</div>
        </div>

        {data.map((item) => (
          <div
            key={item.no}
            className="grid grid-cols-[80px_120px_1fr] px-6 py-4 items-center hover:bg-green-50 transition text-sm border-t border-gray-100"
          >
            <div>{item.no}</div>
            <div className="font-semibold text-green-700">{item.jumlah}</div>
            <div>{item.keterangan}</div>
          </div>
        ))}

        <div className="px-6 py-3 bg-gray-50 border-t text-sm font-semibold text-gray-700">
          Total Shift: <span className="text-green-600">42 Slot / Hari</span>
        </div>
      </div>
    </div>
  );
}
