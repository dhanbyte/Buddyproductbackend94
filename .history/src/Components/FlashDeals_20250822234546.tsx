import { useEffect, useState } from "react";

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
    <section className="relative bg-gradient-to-br from-yellow-50 via-orange-100 to-orange-300 py-6 px-2 text-center min-h-screen flex flex-col items-center justify-start">
      {/* Sale badge */}
      <span className="mb-3 inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-1 rounded-full text-base font-semibold shadow animate-pulse">
        🔥 SALE IS LIVE!
      </span>

      {/* Title & Timer */}
      <h2 className="text-xl font-bold text-orange-700 drop-shadow mb-2">
        Big Savings on Flash Deals
      </h2>
      <div className="mb-4 flex items-center justify-center space-x-1 bg-white/70 shadow rounded-lg px-4 py-2 text-base font-bold text-orange-700 tracking-widest">
        <div>
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="ml-1 text-xs font-medium">HRS</span>
        </div>
        <span>:</span>
        <div>
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="ml-1 text-xs font-medium">MIN</span>
        </div>
        <span>:</span>
        <div>
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="ml-1 text-xs font-medium">SEC</span>
        </div>
      </div>

      {/* Horizontal scroll on mobile */}
      <div className="w-full max-w-md md:max-w-4xl overflow-x-auto flex flex-row space-x-3 py-2 px-1">
        {categories.map(category => (
          <div
            key={category.key}
            className="min-w-[120px] bg-white rounded-lg shadow p-3 flex flex-col items-center justify-center border hover:scale-105 transition-transform"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <h3 className="text-base font-bold text-teal-700 mb-1">{category.label}</h3>
            <button
              onClick={() => handleCategoryClick(category)}
              className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow mt-1"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
