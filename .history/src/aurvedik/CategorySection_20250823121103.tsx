import React from "react";

export interface Category {
  key: string;
  name: string;
  img: string;
}

interface Props {
  onCategoryClick: (catKey: string) => void;
}

const categories: Category[] = [
  { key: "Healthy-Juice", name: "Healthy Juice", img: "/Images/juice-category.jpg" },
  { key: "Ayurvedic-Medicine", name: "Ayurvedic Medicine", img: "/Images/ayurvedic-category.jpg" },
  { key: "Homeopathic-Medicines", name: "Homeopathic Medicines", img: "/Images/homeopathy-category.jpg" },
  { key: "Churna", name: "Churna", img: "/Images/churna-category.jpg" },
  { key: "Pooja-Items", name: "Pooja Items", img: "/Images/pooja-category.jpg" },
  { key: "Daily-Needs", name: "Daily Needs", img: "/Images/dailyneeds-category.jpg" }
];

const CategorySection: React.FC<Props> = ({ onCategoryClick }) => (
  <div className="py-6 px-2">
    <h2 className="text-lg font-bold text-teal-800 mb-4">Shop by Category</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
      {categories.map(cat => (
        <button
          key={cat.key}
          className="bg-white rounded shadow flex flex-col items-center hover:ring-2 hover:ring-teal-400 p-2 transition focus:outline-none"
          onClick={() => onCategoryClick(cat.key)}
        >
          <img src={cat.img} alt={cat.name} className="w-14 h-14 object-cover rounded mb-1" />
          <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
        </button>
      ))}
    </div>
  </div>
);

export default CategorySection;
