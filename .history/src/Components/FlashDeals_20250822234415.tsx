import { useEffect, useState } from "react";

// Emoji icons added for demo, can use any SVG or Icon library
const categories = [
  { key: "tech", label: "Tech Products", icon: "💻" },
  { key: "kapde", label: "Kapde", icon: "👚" },
  { key: "ayurvedic", label: "Ayurvedic Products", icon: "🌿" },
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
    <section className="relative bg-gradient-to-br from-yellow-50 via-orange-100 to-orange-300 py-10 px-4 md:px-8 text-center min-h-screen flex flex-col items-center justify-start">
      {/* Sale badge */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <span className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg animate-pulse">
          🔥 SALE IS LIVE!
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-20 text-4xl md:text-5xl font-extrabold text-orange-700 drop-shadow mb-6">
        Big Savings on Flash Deals
      </h2>
      {/* Timer Box */}
      <div className="mb-10 flex items-center justify-center space-x-2 bg-white/80 shadow-lg rounded-xl px-8 py-5 text-2xl font-bold text-orange-700 tracking-widest">
        <div>
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="ml-2 text-sm font-medium">HRS</span>
        </div>
        <span className="mx-1">:</span>
        <div>
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="ml-2 text-sm font-medium">MIN</span>
        </div>
        <span className="mx-1">:</span>
        <div>
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="ml-2 text-sm font-medium">SEC</span>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {categories.map(category => (
          <div
            key={category.key}
            className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-orange-100 hover:border-orange-400"
          >
            <span className="text-5xl mb-4">{category.icon}</span>
            <h3 className="text-2xl font-bold text-teal-700 mb-2">{category.label}</h3>
            <button
              onClick={() => handleCategoryClick(category)}
              className="mt-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-2 rounded-full text-lg font-medium shadow hover:from-teal-600 hover:to-teal-800 transition"
            >
              VIEW DEALS
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
