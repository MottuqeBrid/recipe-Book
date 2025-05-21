import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  const handleCuisineChange = (e) => {
    const value = e.target.value;
    setSelectedCuisine(value);
    if (value === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((r) => r.cuisine === value);
      setFilteredRecipes(filtered);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">All Recipes</h2>

      {/* Cuisine Filter Dropdown */}
      <div className="mb-6 text-center">
        <select
          value={selectedCuisine}
          onChange={handleCuisineChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">All Cuisines</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className=" rounded-2xl shadow-lg p-4">
            <Tooltip
              anchorSelect={`.my-anchor-element-${recipe._id}`}
              place="top"
            >
              {recipe.title}
            </Tooltip>
            <a className={`my-anchor-element-${recipe._id}`}>
              <img
                src={recipe.image || "https://via.placeholder.com/150"}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-xl"
              />
            </a>
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
