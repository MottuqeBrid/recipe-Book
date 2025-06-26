import { useEffect, useState } from "react";
import { Link } from "react-router";
import Banner from "../Banner/Banner";
import RecipeCard from "../RecipeCard/RecipeCard";
import ReviewSection from "../ReviewSection/ReviewSection";
import OfferSection from "../OfferSection/OfferSection";
import PromotionalSection from "../PromotionalSection/PromotionalSection";
import FeaturedItemsSection from "../FeaturedItemsSection/FeaturedItemsSection";

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/top`)
      .then((res) => res.json())
      .then((data) => setTopRecipes(data));
  }, []);

  return (
    <>
      <Banner topRecipes={topRecipes} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Recipes</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-6">
          {topRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/recipes">
            <button className="btn btn-primary">See All Recipes</button>
          </Link>
        </div>
      </div>
      <OfferSection />
      <FeaturedItemsSection />
      <PromotionalSection />
      <ReviewSection />
    </>
  );
};

export default Home;
