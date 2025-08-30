export interface Category {
  name: string;
  slug: string;
  image: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // This should match a Category slug
  price: number;
  image: string;
  description: string;
}