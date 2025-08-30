import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  extraImages: string[];
  material: string;
  size: string;
  description: string;
}

const NeemToothpastePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product: Product = {
    id: "14",
    name: "Neem Toothpaste",
    brand: "Oral Care Ayurveda",
    category: "Daily-Needs",
    quantity: 1,
    price: 149,
    image: "/Images/neem-toothpaste.jpg",
    extraImages: [
      "/Images/neem-toothpaste1.jpg",
      "/Images/neem-toothpaste2.jpg",
      "/Images/neem-toothpaste3.jpg"
    ],
    material: "Neem Extract",
    size: "100g",
    description: "Ayurvedic toothpaste with neem for dental health"
  };

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{product.name} - {product.brand}</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-4 text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-blue-600">{product.brand}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="h-80 w-full relative">
                <Image
                  src={selectedImage === 0 ? product.image : product.extraImages[selectedImage - 1]}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto py-2">
              <div 
                className={`h-20 w-20 relative cursor-pointer border-2 rounded-lg ${selectedImage === 0 ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => setSelectedImage(0)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              {product.extraImages.map((img, index) => (
                <div 
                  key={index}
                  className={`h-20 w-20 relative cursor-pointer border-2 rounded-lg ${selectedImage === index + 1 ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">Brand: <span className="font-semibold text-blue-600">{product.brand}</span></p>
              
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(4.5)</span>
              </div>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
                <p className="text-gray-500 text-sm">Inclusive of all taxes</p>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li className="mb-1">Material: {product.material}</li>
                  <li className="mb-1">Size: {product.size}</li>
                  <li className="mb-1">Category: {product.category}</li>
                </ul>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-1 text-gray-600 hover:text-blue-600"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-l border-r border-gray-300">{quantity}</span>
                  <button 
                    className="px-3 py-1 text-gray-600 hover:text-blue-600"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 Oral Care Ayurveda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NeemToothpastePage;