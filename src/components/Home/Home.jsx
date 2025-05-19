// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Banner from "../Banner/Banner";
import RecipeCard from "../RecipeCard/RecipeCard";

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recipes/top") // Replace with actual backend endpoint
      .then((res) => res.json())
      .then((data) => setTopRecipes(data));
  }, []);

  return (
    <>
      <Banner />

      {/* Top Recipes */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Recipes</h2>
        <div className="grid md:grid-cols-3 gap-6">
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
    </>
  );
};

export default Home;
