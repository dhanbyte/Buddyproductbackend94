mport { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const categories = [
    { key: "tech", label: "Tech Products", icon: "📱", discount: "Up to 60% OFF" },
    { key: "fashion", label: "Fashion", icon: "👗", discount: "Up to 70% OFF" },
    { key: "ayurvedic", label: "Ayurvedic", icon: "🌿", discount: "Up to 50% OFF" },
];
export default function FlashDeals() {
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 18 });
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0)
                    seconds--;
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
                else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const handleCategoryClick = (category) => {
        navigate(`/deals/${category.key}`);
    };
    return (_jsxs("section", { className: "relative py-10 px-4 text-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNGRjgwMDAiIHN0cm9rZS13aWR0aD0iMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMTUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIvPjwvZz48L3N2Zz4=')]" }), _jsxs("div", { className: "max-w-6xl mx-auto relative z-10", children: [_jsxs("div", { className: "flex flex-col items-center justify-center mb-6", children: [_jsxs("span", { className: "bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-3 flex items-center shadow-md", children: [_jsx("span", { className: "w-2 h-2 bg-white rounded-full mr-2 animate-pulse" }), "LIVE NOW"] }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-800 mb-3", children: "Flash Deals" }), _jsx("p", { className: "text-gray-600 text-sm md:text-base max-w-2xl mb-2", children: "Limited time offers on our most popular categories" })] }), _jsxs("div", { className: "bg-white rounded-xl p-4 mb-8 mx-auto max-w-md shadow-md border border-orange-100", children: [_jsx("p", { className: "text-gray-600 text-sm mb-2", children: "Deals end in:" }), _jsxs("div", { className: "flex justify-center space-x-3 md:space-x-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-2xl md:text-3xl font-bold bg-gray-100 text-orange-600 rounded-lg px-3 py-2 w-14 md:w-16", children: String(timeLeft.hours).padStart(2, "0") }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: "HRS" })] }), _jsx("span", { className: "text-2xl md:text-3xl font-bold text-orange-500 self-center", children: ":" }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-2xl md:text-3xl font-bold bg-gray-100 text-orange-600 rounded-lg px-3 py-2 w-14 md:w-16", children: String(timeLeft.minutes).padStart(2, "0") }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: "MINS" })] }), _jsx("span", { className: "text-2xl md:text-3xl font-bold text-orange-500 self-center", children: ":" }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-2xl md:text-3xl font-bold bg-gray-100 text-orange-600 rounded-lg px-3 py-2 w-14 md:w-16", children: String(timeLeft.seconds).padStart(2, "0") }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: "SECS" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mx-auto max-w-5xl", children: categories.map(category => (_jsxs("div", { className: "bg-white rounded-xl shadow-md p-5 flex flex-col items-center transform transition-all duration-300 hover:shadow-lg", children: [_jsx("div", { className: "text-4xl mb-3", children: category.icon }), _jsx("h3", { className: "text-lg font-bold text-gray-800 mb-2 text-center", children: category.label }), _jsx("p", { className: "text-orange-600 font-semibold text-sm mb-4 text-center", children: category.discount }), _jsx(Link, { to: `/${category.key}`, state: { category }, className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-colors w-full text-sm text-center", children: "Shop Now" })] }, category.key))) }), _jsx("button", { className: "bg-white border border-orange-400 text-orange-600 px-8 py-3 rounded-lg font-medium shadow-sm hover:bg-orange-50 transition-colors", children: "View All Deals" })] })] }));
}
