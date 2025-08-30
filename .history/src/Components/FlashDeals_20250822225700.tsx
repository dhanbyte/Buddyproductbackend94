
import  { useEffect, useState } from "react";

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

  return (
    <section className="bg-gradient-to-r from-yellow-100 to-orange-200 py-8 px-4 text-center">
      <h2 className="text-2xl md:text-4xl font-bold text-orange-700 mb-4">BIG SAVINGS ON FLASH DEALS</h2>
      <div className="flex justify-center space-x-4 text-lg font-semibold text-orange-800">
        <span>{String(timeLeft.hours).padStart(2, "0")} HRS</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")} MIN</span>
        <span>{String(timeLeft.seconds).padStart(2, "0")} SEC</span>
      </div>
      <button className="mt-6 bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition">Start Your Bazaar Journey</button>
    </section>
  );
}