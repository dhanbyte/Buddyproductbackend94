import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ...bundleImages & bundles (unchanged)...

export default function Featured() {
  const [imgIdx, setImgIdx] = useState(Array(bundles.length).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIdx(prev =>
        prev.map((idx, i) => {
          const key = bundles[i].key;
          return (idx + 1) % bundleImages[key].length;
        })
      );
    }, 3250);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 px-2 sm:px-4 max-w-5xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-5 text-center">Featured Bundles</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {bundles.map((bundle, i) => {
          const images = bundleImages[bundle.key];
          const bgUrl = images[imgIdx[i]];

          return (
            <Link
              to={bundle.route}
              key={bundle.name}
              className="group rounded-xl overflow-hidden shadow bg-white relative flex flex-col aspect-[4/5] cursor-pointer border border-gray-50 hover:border-teal-400 transition-all"
              style={{
                backgroundImage: `url('${bgUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              aria-label={bundle.name}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none transition-all" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col items-start z-10">
                <h3 className="text-base sm:text-lg font-semibold text-white drop-shadow-sm mb-1">
                  {bundle.name}
                </h3>
                <button
                  className="bg-teal-500 hover:bg-teal-600 transition px-3 py-1 rounded text-white text-xs sm:text-sm font-medium"
                  tabIndex={-1}
                  type="button"
                  aria-hidden
                >
                  Shop Now
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
