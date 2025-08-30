import React, { useState } from "react";
import CategorySection from "./CategorySection";
import ProductsSection from "./ProductsSection";
import CategoryProducts from "./CategoryProducts";
import { products } from "../data/data"; // JSON import
import { Product } from "../data/data";

const AyurvedicHome: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return (
      <CategoryProducts
        category={selectedCategory}
        products={products}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div>
      <CategorySection onCategoryClick={setSelectedCategory} />
      <ProductsSection products={products.slice(0,12)} />
    </div>
  );
};

export default AyurvedicHome;
