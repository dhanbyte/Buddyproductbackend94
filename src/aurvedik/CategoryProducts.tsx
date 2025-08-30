import React from "react";
import { Product } from "../data/types";

interface Props {
  category: string;
  products: Product[];
  onBack: () => void;
}

const CategoryProducts: React.FC<Props> = ({ category, products, onBack }) => {
  const filtered = products.filter(p => p.category === category);
  return (
    <div className="px-2 py-4">
      <button onClick={onBack} className="mb-4 text-teal-600 text-xs">&larr; Back</button>
      <h2 className="text-lg font-semibold text-teal-700 mb-2">{category.replaceAll("-", " ")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map(prod => (
          <div key={prod.id} className="bg-white shadow rounded p-2 flex flex-col items-center">
            <img src={prod.image.startsWith("http") ? prod.image : process.env.PUBLIC_URL + prod.image} alt={prod.name} className="w-14 h-14 mb-1 object-contain rounded" />
            <div className="text-xs font-semibold text-gray-700 line-clamp-1">{prod.name}</div>
            <div className="font-bold text-teal-700 text-xs">₹{prod.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
