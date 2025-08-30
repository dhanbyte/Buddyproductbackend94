import React from "react";
import { Product } from "../data/types"; // या data.js के ऊपर टाइप define करें

interface Props {
  products: Product[];
}

const ProductsSection: React.FC<Props> = ({ products }) => (
  <div className="py-6 px-2">
    <h2 className="text-lg font-bold text-teal-800 mb-2">Popular Products</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {products.map(prod => (
        <div key={prod.id} className="bg-white shadow rounded p-2 flex flex-col items-center">
          <img src={prod.image.startsWith("http") ? prod.image : process.env.PUBLIC_URL + prod.image} alt={prod.name} className="w-16 h-16 mb-1 object-contain rounded" />
          <div className="text-xs font-semibold text-gray-700 line-clamp-1">{prod.name}</div>
          <div className="font-bold text-teal-700 text-xs">₹{prod.price}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductsSection;
