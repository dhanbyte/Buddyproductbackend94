{filteredBundles.map((bundle) => (
  <div
    key={bundle.id}
    className={`bg-white rounded-xl overflow-hidden shadow-lg border-l-4 transition-transform duration-300 hover:scale-105 flex flex-col h-full cursor-pointer ${getCategoryColor(bundle.category)}`}
    style={{ borderLeftWidth: "7px" }}
    onClick={() => {
      addToCart(bundle);
      // If you use react-toastify:
      window.toast && window.toast.success && window.toast.success(`${bundle.name} added to cart!`);
      // Or if you import toast from 'react-toastify':
      // toast.success(`${bundle.name} added to cart!`);
    }}
    tabIndex={0} // for keyboard accessibility
    onKeyPress={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        addToCart(bundle);
        window.toast && window.toast.success && window.toast.success(`${bundle.name} added to cart!`);
      }
    }}
    aria-label={`Add ${bundle.name} to cart`}
    role="button"
  >
    {/* ...rest of the card content... */}
    <div className="relative h-32 sm:h-40 overflow-hidden">
      <img
        src={bundle.image}
        alt={bundle.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      {bundle.discount && (
        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
          {bundle.discount}% OFF
        </div>
      )}
      <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[0.7rem] font-bold shadow ${getCategoryColor(bundle.category)}`}>
        {bundle.category.charAt(0).toUpperCase() + bundle.category.slice(1)}
      </div>
    </div>
    <div className="flex flex-col p-3 flex-1">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">{bundle.name}</h3>
      <div className="flex items-center mb-1">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(bundle.rating ?? 0) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
        {bundle.rating && (
          <span className="text-gray-600 text-xs ml-1">{bundle.rating}</span>
        )}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-base sm:text-lg font-bold text-gray-900">₹{bundle.price.toFixed(2)}</span>
          {bundle.discount && (
            <span className="text-gray-500 text-xs line-through ml-1">
              ₹{(bundle.price / (1 - bundle.discount/100)).toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <button
        className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-semibold py-2 px-4 transition-colors"
        tabIndex={-1} // Prevents double-activation
        aria-hidden="true"
      >
        Add to Cart
      </button>
    </div>
  </div>
))}
