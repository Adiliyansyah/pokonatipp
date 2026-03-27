"use client";

const data = [
  {
    no: 1,
    jumlah: 21,
    keterangan: "PAGI (07.30-17.00) MALAM (17.00-07.30)",
  },
];

export default function TableModern() {
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          
          {/* Header */}
          <div className="grid grid-cols-[200px_200px_200px] bg-green-300 px-6 py-4 font-semibold text-gray-700">
            <div>No</div>
            <div>Jumlah</div>
            <div>Keterangan</div>
          </div>

          {/* Data */}
          {data.map((item) => (
            <div
              key={item.no}
              className="grid grid-cols-[200px_200px_00px] px-6 py-4 items-center hover:bg-green-50 transition"
            >
              <div>{item.no}</div>
              <div className="truncate">{item.jumlah}</div>
              <div>{item.keterangan}</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}