import GeoOfferBanner from "./GeoOfferBanner";
import {products} from "../data/data"
import { useCart } from "../data/CartContext";
import { Link } from "react-router-dom";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DealsNearby() {

  const {addToCart} = useCart();
  return (
    <section className="py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Deals near Ahmedabad</h2>
        <button className="text-sm text-teal-600 underline hover:text-teal-800">
          Change
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
  <div key={product.id} className="bg-white rounded shadow p-3">
    <Link to={`/product/${product.id}`} className="cursor-pointer block">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-base font-semibold mt-1">{product.name}</h3>
      <p className="text-xs text-gray-500">by {product.seller}</p>
    </Link>
    <div className="flex justify-between items-center mt-2">
      <span className="text-green-600 font-bold text-sm">
        ₹{product.price}
      </span>
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
  Add
</button>
    </div>
  </div>
))}
      </div>
      {/*Add-on Components*/}
      <GeoOfferBanner />
    </section>
  );
}
