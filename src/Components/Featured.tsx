import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Images for each bundle (add multiple for transitions)
const bundleImages = {
  Monsoon: [
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80",
  ],
  Ethnic: [
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?fit=crop&w=600&q=80",
  ],
  Tech: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519121789515-cbe9d0b522de?fit=crop&w=600&q=80",
  ],
  Kids: [
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a37a8?fit=crop&w=600&q=80",
  ]
};

// Bundle config
const bundles = [
  {
    name: "Monsoon Essentials",
    route: "/ayurvedic",
    key: "Monsoon",
  },
  {
    name: "Ethnic Kitchen Set",
    route: "/fashion",
    key: "Ethnic",
  },
  {
    name: "Smart Home Gadgets",
    route: "/tech",
    key: "Tech",
  },
  {
    name: "Children’s Activity Pack",
    route: "/kids",
    key: "Kids",
  },
];

export default function Featured() {
  // For animation: keep index for each bundle
  const [imgIdx, setImgIdx] = useState(Array(bundles.length).fill(0));

  useEffect(() => {
    // Change background images every 3 seconds
    const interval = setInterval(() => {
      setImgIdx(prev =>
        prev.map((idx, i) => {
          const key = bundles[i].key as keyof typeof bundleImages;
          return (idx + 1) % bundleImages[key].length;
        })
      );
    }, 3250); // adjust timing here
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Featured Bundles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bundles.map((bundle, i) => {
          const images = bundleImages[bundle.key as keyof typeof bundleImages];
          const bgUrl = images[imgIdx[i]];

          return (
            <Link
              to={bundle.route}
              key={bundle.name}
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition relative cursor-pointer"
              style={{
                minHeight: "250px",
                backgroundImage: `url('${bgUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 0.7s cubic-bezier(.4,0,.2,1)",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow">{bundle.name}</h3>
                <button className="inline-block bg-teal-500 hover:bg-teal-600 px-4 py-1 rounded text-white font-semibold mt-1">
                  Shop Now
                </button>
              </div>
              {/* Optional: animated shimmer effect on hover */}
              <div className="absolute inset-0 group-hover:bg-gradient-to-t from-teal-500/10 via-transparent to-transparent transition opacity-80"></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
