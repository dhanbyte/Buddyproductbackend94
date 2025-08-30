import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../data/CartContext';
import { useAuth } from '@clerk/clerk-react';
import { FiPlus, FiMinus, FiStar, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useUserContext } from '../data/UserContext';
import { ProductAPI, ReviewAPI } from '../lib/api';
import { ENDPOINTS, getApiUrl, replacePathParams } from '../lib/api-endpoints';

// --- Type Definitions ---
interface Product {
  _id: string; name: string; brand: string; category: string; description: string;
  image: string; extraImages?: string[];
  price: { original: number; discounted?: number; };
  quantity: number;
  specifications: { [key: string]: string };
}
interface Review {
  _id: string; user: { name: string }; rating: number; comment: string; createdAt: string;
}

const ProductsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { getToken, isSignedIn } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useUserContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const isLiked = product ? isInWishlist(product._id) : false;

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductAPI.getProductById(id as string);
        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) { 
        console.error(error); 
        toast.error('Failed to load product details');
      }
    };
    const fetchReviews = async () => {
      try {
        const data = await ReviewAPI.getProductReviews(id as string);
        setReviews(data);
      } catch (error) { 
        console.error(error); 
      }
    };
    if (id) {
      fetchProduct();
      fetchReviews();
    }
  }, [id]);

  // --- Event Handlers ---
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, id: product._id, price: product.price.original, quantity });
      toast.success(`${product.name} (x${quantity}) added to cart!`);
    }
  };

  const handleLikeClick = () => {
    if (!isSignedIn || !product) {
      toast.error('Please sign in to manage your wishlist.');
      return;
    }
    if (isLiked) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) { toast.error('Please log in to submit a review.'); return; }
    const token = await getToken();
    try {
        const savedReview = await ReviewAPI.addReview({
          productId: id as string,
          rating: newReview.rating,
          comment: newReview.comment
        }, token as string);
        
        setReviews([savedReview, ...reviews]);
        setNewReview({ rating: 5, comment: '' });
        toast.success('Thank you for your review!');
    } catch (error) { 
      console.error(error); 
      toast.error('You have already reviewed this product or there was an error submitting your review.'); 
    }
  };

  if (!product) return <div className="text-center py-20">Loading product...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-4 border mb-4">
            <img src={selectedImage} alt={product.name} className="w-full h-96 object-contain" />
          </div>
          <div className="flex gap-4 justify-center">
            {[product.image, ...(product.extraImages || [])].map((img, idx) => (
              <img key={idx} src={img} alt={`thumbnail ${idx}`} onClick={() => setSelectedImage(img)} className={`h-20 w-20 object-cover rounded-md border-2 cursor-pointer ${selectedImage === img ? 'border-teal-500' : 'border-transparent'}`} />
            ))}
          </div>
        </div>

        {/* Product Info & Actions */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500 mt-2">by {product.brand}</p>
          <p className="text-3xl text-teal-600 font-bold my-4">₹{product.price.original}</p>
          <div className="flex items-center space-x-4 my-6">
            <div className="flex items-center border rounded-md"> 
              <button onClick={() => handleQuantityChange(-1)} className="p-3"><FiMinus/></button>
              <span className="px-4 font-semibold text-lg">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="p-3"><FiPlus/></button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors">Add to Cart</button>
            <button onClick={handleLikeClick} className="p-3 border-2 rounded-lg"><FiHeart className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} /></button>
          </div>
        </div>
      </div>

      {/* Tabs for Description & Reviews */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Description</button>
            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'reviews' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Reviews ({reviews.length})</button>
          </nav>
        </div>
        <div className="mt-8">
          {activeTab === 'description' && <p className="text-gray-600 leading-relaxed">{product.description}</p>}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
              {isSignedIn && (
                <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h4 className="text-lg font-semibold mb-2">Write a Review</h4>
                  <textarea value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} className="w-full p-2 border rounded-md" placeholder="Share your thoughts..." required></textarea>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center"><span>Rating: </span><input type="number" min="1" max="5" value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})} className="w-16 p-2 border rounded-md ml-2"/></div>
                    <button type="submit" className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-black">Submit</button>
                  </div>
                </form>
              )}
              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map(r => (
                  <div key={r._id} className="border-b pb-4"><div className="flex items-center mb-1"><strong className="mr-2">{r.user.name}</strong><div className="flex text-yellow-400">{Array(r.rating).fill(0).map((_,i)=><FiStar key={i}/>)}</div></div><p className="text-gray-600">{r.comment}</p></div>
                )) : <p>No reviews yet. Be the first to write one!</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsPage;
