import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import useAuth from "../../providers/useAuth";
import useAuth from "./../../providers/useAuth";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRecipe(data);
        setLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    fetch(`http://localhost:5000/recipes/${id}/like`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setRecipe({ ...recipe, likeCount: recipe.likeCount + 1 });
          Swal.fire("Liked!", "You liked this recipe.", "success");
        }
      });
  };

  if (loading)
    return <div className="text-center py-20 text-lg">Loading...</div>;
  if (!recipe)
    return <div className="text-center py-20 text-lg">Recipe not found.</div>;

  const {
    image,
    title,
    cuisine,
    ingredients,
    instructions,
    preparationTime,
    categories,
    likeCount,
    addedBy,
    userEmail,
  } = recipe;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={title}
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />
        <div className="flex-1 space-y-3">
          <p>
            <strong>Cuisine:</strong> {cuisine}
          </p>
          <p>
            <strong>Prep Time:</strong> {preparationTime} min
          </p>
          <p>
            <strong>Categories:</strong> {categories?.join(", ")}
          </p>
          <p>
            <strong>{likeCount}</strong> people interested in this recipe
          </p>
          <p>
            <strong>Added by:</strong> {addedBy?.name || "Anonymous"}
          </p>
          <button
            disabled={user?.email == userEmail || !user}
            onClick={handleLike}
            className="btn btn-success btn-sm mt-4"
          >
            ❤️ Like
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc list-inside mt-2">
          {ingredients?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6">Instructions</h2>
        <p className="mt-2 whitespace-pre-line">{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
