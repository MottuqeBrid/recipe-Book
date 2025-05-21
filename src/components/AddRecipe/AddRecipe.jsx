// src/pages/AddRecipe.jsx
import { useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../providers/useAuth";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    // const ingredients = form.ingredients.value;
    const instructions = form.instructions.value;
    const cuisine = form.cuisine.value;
    const prepTime = parseInt(form.prepTime.value);
    const categories = Array.from(
      form.querySelectorAll("input[name=categories]:checked")
    ).map((el) => el.value);

    const recipeData = {
      image,
      title,
      ingredients,
      instructions,
      cuisine,
      prepTime,
      categories,
      likeCount: 0,
      addedBy: user.displayName,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (res.ok) {
        toast.success("Recipe added successfully!");
        navigate("/recipes");
      } else {
        toast.error("Failed to add recipe.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Recipe</h2>
      <form
        onSubmit={handleAddRecipe}
        className="space-y-5  p-6 shadow-md rounded-xl"
      >
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />

        {/* INGREDIENTS SECTION */}
        <div>
          <label className="block mb-1 font-medium">Ingredients</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              className="input input-bordered flex-grow"
              placeholder="Add one ingredient"
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleAddIngredient}
              disabled={!ingredientInput.trim()}
            >
              Add
            </button>
          </div>

          {/* Show ingredients */}
          <ul className="mt-3 list-disc list-inside space-y-1">
            {ingredients.map((ing, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{ing}</span>
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => handleRemoveIngredient(idx)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/*  */}

        <textarea
          name="instructions"
          placeholder="Instructions"
          className="textarea textarea-bordered w-full"
          required
        />

        <div>
          <label className="block mb-1 font-medium">Cuisine Type</label>
          <select
            name="cuisine"
            className="select select-bordered w-full"
            required
          >
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        <input
          name="prepTime"
          type="number"
          placeholder="Preparation Time (minutes)"
          className="input input-bordered w-full"
          required
        />

        <div>
          <label className="block mb-1 font-medium">Categories</label>
          <div className="flex flex-wrap gap-3">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
              (category) => (
                <label
                  key={category}
                  className="label cursor-pointer space-x-2"
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text">{category}</span>
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
