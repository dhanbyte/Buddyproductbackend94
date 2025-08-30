import { useEffect, useState } from "react";

const categories = [
  { key: "tech", label: "Tech Products" },
  { key: "kapde", label: "Kapde" },
  { key: "ayurvedic", label: "Ayurvedic Products" },
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

  // For demo purpose: Button will only alert, in a real app you would navigate
  const handleCategoryClick = (category) => {
    alert(`Opening deals for ${category.label}`);
  };

  return (
    <section className="bg-gradient-to-r from-yellow-100 to-orange-200 py-8 px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-bold text-orange-700 mb-4">
        BIG SAVINGS ON FLASH DEALS
      </h2>
      <div className="flex justify-center space-x-4 text-lg font-semibold text-orange-800 mb-8">
        <span>{String(timeLeft.hours).padStart(2, "0")} HRS</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")} MIN</span>
        <span>{String(timeLeft.seconds).padStart(2, "0")} SEC</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {categories.map(category => (
          <div
            key={category.key}
            className="bg-white rounded shadow p-6 flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-teal-700 mb-3">{category.label}</h3>
            <button
              onClick={() => handleCategoryClick(category)}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition"
            >
              View Deals
            </button>
          </div>
        ))}
      </div>

      <button className="mt-2 bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition">
        Start Your Bazaar Journey
      </button>
    </section>
  );
}
