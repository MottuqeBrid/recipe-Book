import React from "react";

const PromotionalSection = () => {
  return (
    <section className="py-12 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src="https://media.istockphoto.com/id/603906484/photo/vegetable-salad.jpg?s=612x612&w=0&k=20&c=f7BnJRCqLKaj_DEQB1SB71_eRT8y1XRP52dDyYRSxuE="
            alt="Special Dish"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
            🍛 Exclusive Eid Recipe Guide!
          </h2>
          <p className="mb-6 text-sm lg:text-base">
            Celebrate with flavor! Download our exclusive Eid recipe guide —
            packed with traditional favorites and modern twists. Free for a
            limited time!
          </p>
          <a className="btn btn-primary btn-wide" href="./Easy_recipes.pdf">
            📥 Download Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;
