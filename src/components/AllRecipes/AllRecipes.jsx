import { useEffect, useState } from "react";
import { Link } from "react-router";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   CardActions,
//   Button,
// } from "@material-tailwind/react";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/recipes") // adjust URL as needed
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">All Recipes</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white rounded-2xl shadow-lg p-4">
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-1">{recipe.title}</h3>
              <p className="text-sm">Cuisine: {recipe.cuisine || "Others"}</p>
              <p className="text-sm">Prep Time: {recipe.prepTime} mins</p>
              <p className="text-sm">Likes: {recipe.likeCount}</p>
            </div>
            <div className="mt-4 text-right">
              <Link to={`/recipes/${recipe._id}`}>
                <button className="btn btn-sm btn-primary">See Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
