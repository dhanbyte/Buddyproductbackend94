import { useState } from "react";

const sampleProducts = [
  { name: "Steel Masala Box", price: 199 },
  { name: "Silicone Scrubber", price: 99 },
  { name: "Prayer Beads", price: 149 },
];

export default function BundleBuilder() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const total = selected.reduce((sum, i) => sum + sampleProducts[i].price, 0);

  return (
    <div className="mt-10 px-4 py-6 bg-white rounded shadow">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
        Build Your Bundle
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sampleProducts.map((p, i) => (
          <div
            key={i}
            onClick={() => toggleSelect(i)}
            className={`border rounded p-3 cursor-pointer ${
              selected.includes(i) ? "border-teal-500 bg-teal-50" : "border-gray-300"
            }`}
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm sm:text-base font-medium">Total: ₹{total}</p>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm sm:text-base">
          Checkout
        </button>
      </div>
    </div>
  );
}