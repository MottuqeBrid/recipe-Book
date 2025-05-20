import React from "react";

const MyRecipesUpdateModal = ({
  handleUpdate,
  editingRecipe,
  newIngredient,
  setNewIngredient,
  handleRemoveIngredient,
  handleAddIngredient,
  ingredientList,
  setEditingRecipe,
  handleCategoryChange,
  selectedCategories,
}) => {
  return (
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
                  <label key={cat} className="label cursor-pointer space-x-2">
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
  );
};

export default MyRecipesUpdateModal;
