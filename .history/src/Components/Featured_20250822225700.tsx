
const bundles = [
  { name: "Monsoon Essentials", image: "/Images/BundleGadget.jpg" },
  { name: "Ethnic Kitchen Set", image: "/Images/BundleGadget.jpg" },
  { name: "Smart Home Gadgets", image: "/Images/BundleGadget.jpg" },
  { name: "Children’s Activity Pack", image: "/Images/BundleGadget.jpg" },
];

export default function Featured() {
  return (
    <section className="py-8 px-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Featured Bundles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {bundles.map((bundle, i) => (
          <div key={i} className="bg-white rounded shadow hover:shadow-lg transition">
            <img src={bundle.image} alt={bundle.name} className="w-full h-40 object-cover rounded-t" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{bundle.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}