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
    <section className="min-h-screen bg-gradient-to-br from-[#ffe5c4] via-[#fff5e5] to-[#fcd9c1] px-4 py-8 flex flex-col items-center">
      <div className="mb-4">
        <span className="inline-block bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-2 rounded-full text-sm sm:text-base font-bold shadow-sm tracking-wider animate-pulse">
          SALE IS LIVE!
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#d17600] drop-shadow mt-2 mb-7">Big Savings on Flash Deals</h2>

      {/* Timer box */}
      <div className="mb-7 flex items-center justify-center space-x-1 rounded-2xl px-6 py-3 bg-white/90 shadow border border-orange-200 text-xl sm:text-2xl font-bold text-[#ec9000]">
        <span>{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="mx-1 text-base font-bold">:</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="mx-1 text-base font-bold">:</span>
        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
      </div>

      {/* Category cards */}
      <div className="w-full flex overflow-x-auto gap-5 scrollbar-hide pb-4 px-2">
        {categories.map(category => (
          <div
            key={category.key}
            className="bg-white rounded-xl shadow-lg border border-orange-100 min-w-[160px] max-w-[200px] flex-shrink-0 flex flex-col items-center px-4 py-6 hover:scale-105 transition-transform"
          >
            <span className="text-4xl mb-3">{category.icon}</span>
            <h3 className="text-base sm:text-lg font-semibold text-[#009688] mb-2">{category.label}</h3>
            <button
              onClick={() => handleCategoryClick(category)}
              className="bg-gradient-to-r from-[#009688] to-[#26a481] text-white px-3 py-1 rounded-full text-xs shadow font-semibold hover:from-[#016162] hover:to-[#039574] transition"
            >
              View Deals
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
