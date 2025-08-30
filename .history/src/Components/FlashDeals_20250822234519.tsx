import { useEffect, useState } from "react";

const categories = [
  { key: "tech", label: "Tech Products", icon: "📱" },
  { key: "kapde", label: "Fashion", icon: "👕" },
  { key: "ayurvedic", label: "Ayurvedic", icon: "🌿" },
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (category) => {
    alert(`Opening deals for ${category.label}`);
  };

  return (
    <section className="relative py-12 px-4 text-center bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-orange-600 rounded-full -translate-x-12 -translate-y-12 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-600 rounded-full translate-x-16 translate-y-16 opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with live badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-3 flex items-center animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            SALE IS LIVE!
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            FLASH DEALS
          </h2>
          <p className="text-white text-lg max-w-2xl mb-6">
            Limited time offers on our most popular categories. Hurry before they're gone!
          </p>
        </div>

        {/* Timer */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-10 inline-flex">
          <div className="flex space-x-6 text-white font-bold">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl bg-white/30 rounded-lg px-4 py-2 w-20">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-sm mt-2">HOURS</span>
            </div>
            <span className="text-3xl md:text-4xl self-center">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl bg-white/30 rounded-lg px-4 py-2 w-20">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-sm mt-2">MINUTES</span>
            </div>
            <span className="text-3xl md:text-4xl self-center">:</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl bg-white/30 rounded-lg px-4 py-2 w-20">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-sm mt-2">SECONDS</span>
            </div>
          </div>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {categories.map(category => (
            <div
              key={category.key}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{category.label}</h3>
              <p className="text-gray-600 mb-5 text-sm">Up to 70% off on selected items</p>
              <button
                onClick={() => handleCategoryClick(category)}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors w-full"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors transform hover:-translate-y-1">
          Explore All Deals
        </button>
      </div>
    </section>
  );
}