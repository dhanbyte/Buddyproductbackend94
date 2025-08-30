import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-toastify";
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (_jsxs("div", { className: "flex  sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white", children: [_jsx("img", { src: item.image, alt: item.name, className: "w-24 h-24 object-cover rounded-md" }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("h4", { className: "text-lg font-semibold text-gray-800", children: item.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Sold by ", _jsx("span", { className: "text-indigo-600 font-medium", children: item.seller })] }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("button", { onClick: () => onQuantityChange(item.id, -1), className: "px-2 py-1 bg-gray-200 rounded hover:bg-gray-300", children: "\u2212" }), _jsx("span", { className: "px-3", children: item.quantity }), _jsx("button", { onClick: () => onQuantityChange(item.id, 1), className: "px-2 py-1 bg-gray-200 rounded hover:bg-gray-300", children: "+" })] })] }), _jsxs("div", { className: "text-right max-[321px]:-ml-2 ", children: [_jsxs("p", { className: "text-lg font-bold text-green-600 max-[321px]:mr-2", children: ["\u20B9", item.price * item.quantity] }), _jsx("button", { className: "mt-2 text-red-500 hover:text-red-700 text-xl max-[321px]:mr-2 max-[321px]:mt-18", onClick: () => {
                            onRemove(item.id);
                            toast.error(`${item.name} removed from cart`, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "colored",
                            });
                        }, children: "\u274C" })] })] }));
};
export default CartItem;
