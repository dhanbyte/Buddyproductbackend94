/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast,  } from "react-toastify";
const ProductDetailPage = () => {
  const {addToCart} = useCart()
  const { id } = useParams();
  const product = products.find((p) => p.id === String(id));

  if (!product) {
    return <div className="p-6 text-red-600">Product not found</div>;
  }

  const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <div className="mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <div>
        <img
          src={selectedImage}
          alt="Selected product"
          className="w-full md:h-auto h-100 rounded-lg shadow-md transition duration-300"
        />

        {/* Thumbnails */}
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {[product.image, ...(product.extraImages || [])].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`h-20 w-20 object-cover rounded border cursor-pointer transition 
                ${selectedImage === img ? "ring-2 ring-blue-500" : "hover:scale-105"}`}
            />
          ))}
        </div>
      </div>

      {/* Right: Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-sm text-gray-500">
          Sold by:{" "}
          <span className="font-medium text-blue-600">{product.brand}</span>
        </p>
        <p className="text-2xl text-green-600 font-semibold">₹{product.price}</p>

       <button
  onClick={() => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }}
  className="bg-teal-500 text-white px-2 py-1 text-sm rounded hover:bg-teal-600"
>
  Add to Cart
</button>

        {/* Product Info */}
        <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
          <p>
            <strong>Material:</strong> {product.material}
          </p>
          <p>
            <strong>Size:</strong> {product.size}
          </p>
          
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
