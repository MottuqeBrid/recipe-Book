import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment:
      "Absolutely loved the mango lassi recipe! So fresh and easy to follow.",
  },
  {
    id: 2,
    name: "Sadia Rahman",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 4,
    comment:
      "The chicken biryani was flavorful, but I added a bit more spice. Great base recipe!",
  },
  {
    id: 3,
    name: "Carlos Mendez",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    comment: "Perfect pancake recipe. My kids loved it for breakfast!",
  },
  {
    id: 4,
    name: "Lina Chowdhury",
    avatar: "https://i.pravatar.cc/150?img=21",
    rating: 5,
    comment:
      "The vegetable curry was so comforting and rich. Will be making this again soon!",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-10 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          🍽 What People Say
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="card shadow-xl bg-base-200">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.avatar} alt={review.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="text-warning text-sm">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-sm">“{review.comment}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
