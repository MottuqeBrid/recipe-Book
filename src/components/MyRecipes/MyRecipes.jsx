import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";
import MyRecipesCard from "./MyRecipesCard";
import MyRecipesUpdateModal from "./MyRecipesUpdateModal";
import NoRecipes from "./NoRecipes";

const MyRecipes = () => {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/email/${user.email}`
      );
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

    const res = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
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
      `${import.meta.env.VITE_API_URL}/recipes/${editingRecipe._id}`,
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
      {myRecipes.length === 0 && <NoRecipes />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myRecipes.length > 0 &&
          myRecipes.map((recipe) => (
            <MyRecipesCard
              key={recipe._id}
              setEditingRecipe={setEditingRecipe}
              setIngredientList={setIngredientList}
              setSelectedCategories={setSelectedCategories}
              handleDelete={handleDelete}
              recipe={recipe}
            />
          ))}
      </div>

      {/* Update Modal */}
      {editingRecipe && (
        <MyRecipesUpdateModal
          handleUpdate={handleUpdate}
          editingRecipe={editingRecipe}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleAddIngredient={handleAddIngredient}
          ingredientList={ingredientList}
          setEditingRecipe={setEditingRecipe}
          handleCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />
      )}
    </div>
  );
};

export default MyRecipes;
