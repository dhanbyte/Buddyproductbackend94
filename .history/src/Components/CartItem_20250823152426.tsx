import React from 'react';
import { toast } from "react-toastify";

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    image: string;
  };
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex  sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />

      <div className="flex-1 text-left">
        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">
          Sold by <span className="text-indigo-600 font-medium">{item.seller}</span>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onQuantityChange(item.id, -1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            −
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-right max-[321px]:-ml-2 ">
        <p className="text-lg font-bold text-green-600 max-[321px]:mr-2">₹{item.price * item.quantity}</p>
       <button
  className="mt-2 text-red-500 hover:text-red-700 text-xl max-[321px]:mr-2 max-[321px]:mt-18"
  onClick={() => {
    onRemove(item.id);
    toast.error(`${item.name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }}
>
  ❌
</button>
      </div>
    </div>
  );
};

export default CartItem;