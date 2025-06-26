import React from "react";

const offers = [
  {
    id: 1,
    title: "🌶 Spicy Week Deal!",
    description: "Get access to 5 exclusive spicy recipes this week only!",
    badge: "Hot",
    color: "error",
  },
  {
    id: 2,
    title: "🥗 Healthy Recipes Bundle",
    description: "20% off on our premium healthy recipe collection.",
    badge: "New",
    color: "success",
  },
  {
    id: 3,
    title: "🍰 Baking Masterclass",
    description: "Join our live baking masterclass — free for first 50 users!",
    badge: "Free",
    color: "info",
  },
];

const OfferSection = () => {
  return (
    <section className="py-10 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🎉 Special Offers
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="card shadow-xl bg-base-200">
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  <div className={`badge badge-${offer.color}`}>
                    {offer.badge}
                  </div>
                </div>
                <p className="text-sm">{offer.description}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-sm btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
