import { useEffect, useState } from "react";
// import useAuth from "../../providers/useAuth";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";

const MyRecipes = () => {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const res = await fetch(`http://localhost:5000/recipes/${user.email}`);
      const data = await res.json();
      setMyRecipes(data);
    };

    if (user?.email) fetchMyRecipes();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/recipes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMyRecipes(myRecipes.filter((r) => r._id !== id));
      toast.success("Recipe deleted successfully.");
    } else {
      toast.error("Failed to delete recipe.");
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredientList([...ingredientList, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    const updated = [...ingredientList];
    updated.splice(index, 1);
    setIngredientList(updated);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedRecipe = {
      image: form.image.value,
      title: form.title.value,
      ingredients: ingredientList,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: parseInt(form.prepTime.value),
      categories: selectedCategories,
    };

    const res = await fetch(
      `http://localhost:5000/recipes/${editingRecipe._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      }
    );

    if (res.ok) {
      toast.success("Recipe updated successfully.");
      setEditingRecipe(null);
      setMyRecipes(
        myRecipes.map((r) =>
          r._id === editingRecipe._id ? { ...r, ...updatedRecipe } : r
        )
      );
      setIngredientList([]);
      setSelectedCategories([]);
    } else {
      toast.error("Update failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myRecipes.map((recipe) => (
          <div key={recipe._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
              <p>
                <strong>Preparation Time:</strong> {recipe.prepTime} mins
              </p>
              <p>
                <strong>Categories:</strong> {recipe.categories.join(", ")}
              </p>
              <p>
                <strong>Likes:</strong> {recipe.likeCount}
              </p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => {
                    setEditingRecipe(recipe);
                    setIngredientList(recipe.ingredients);
                    setSelectedCategories(recipe.categories);
                  }}
                  className="btn btn-info btn-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingRecipe && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Recipe</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="image"
                defaultValue={editingRecipe.image}
                className="input input-bordered w-full"
              />
              <input
                name="title"
                defaultValue={editingRecipe.title}
                className="input input-bordered w-full"
              />
              <div>
                <label className="block font-medium mb-1">Ingredients</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    type="text"
                    className="input input-bordered w-full"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="btn btn-secondary"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-1">
                  {ingredientList.map((ing, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span>{ing}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(i)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <textarea
                name="instructions"
                defaultValue={editingRecipe.instructions}
                className="textarea textarea-bordered w-full"
              />
              <div>
                <label className="block mb-1 font-medium">Cuisine Type</label>
                <select
                  defaultValue={editingRecipe.cuisine}
                  name="cuisine"
                  className="select select-bordered w-full"
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
                defaultValue={editingRecipe.prepTime}
                type="number"
                className="input input-bordered w-full"
              />
              <div>
                <label className="block font-medium mb-1">Categories</label>
                <div className="flex flex-wrap gap-3">
                  {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="label cursor-pointer space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={cat}
                          checked={selectedCategories.includes(cat)}
                          onChange={handleCategoryChange}
                          className="checkbox checkbox-sm"
                        />
                        <span className="label-text">{cat}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
