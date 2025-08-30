
import CartItem from './CartItem';
import PriceSummary from './PriceSummary';
import { Link } from 'react-router-dom';
import { useCart } from '../data/CartContext';


const Cart: React.FC = () => {

const {cart, updateQuantity, removeFromCart} = useCart()


  const handleQuantityChange = (id: string, delta: number) => updateQuantity(id, delta);
  

  const handleRemove = (id: string) => removeFromCart(id); 

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">🛒 Your BazaarBuddy Cart</h2>
      <p className="text-sm text-gray-500 mb-6">📍 Ahmedabad</p>

      <div className="space-y-4 ">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <div className="mt-8">
        <PriceSummary subtotal={subtotal} discount={50} delivery={30} />
      </div>

      <div className="mt-6 flex   items-center justify-center ">
        <Link
          to="/checkout"
          className="bg-indigo-600 text-white  px-6 py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </Link>
      
      </div>

       <p className="text-xs text-gray-400 text-center py-10 ">Secure payment • Easy returns • Local support</p>
    </div>
  );
};

export default Cart;