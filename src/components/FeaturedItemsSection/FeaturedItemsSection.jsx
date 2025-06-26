import React from "react";

const features = [
  {
    id: 1,
    icon: "🍳",
    title: "Chef's Special",
    description: "Hand-picked recipes curated by our expert chefs every week.",
  },
  {
    id: 2,
    icon: "📦",
    title: "Meal Kits",
    description: "Get ingredients delivered to your door with easy-to-follow recipes.",
  },
  {
    id: 3,
    icon: "🎥",
    title: "Video Tutorials",
    description: "Step-by-step video guides to help you master new dishes.",
  },
  {
    id: 4,
    icon: "📖",
    title: "Recipe Collections",
    description: "Access curated collections like Eid Specials, Keto Picks & more.",
  },
];

const FeaturedItemsSection = () => {
  return (
    <section className="py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">⭐ Featured Services</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div key={item.id} className="card bg-base-200 shadow-md text-center p-6">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItemsSection;
