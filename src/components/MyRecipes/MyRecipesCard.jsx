import { Tooltip } from "react-tooltip";

const MyRecipesCard = ({
  recipe,
  setEditingRecipe,
  setIngredientList,
  setSelectedCategories,
  handleDelete,
}) => {
  return (
    <div key={recipe._id} className="card bg-base-100 shadow-xl rounded-2xl">
      <Tooltip anchorSelect={`.my-anchor-element-${recipe._id}`} place="top">
        {recipe.title}
      </Tooltip>
      <a className={`my-anchor-element-${recipe._id}`}>
        <figure>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-48 w-full object-cover "
          />
        </figure>
      </a>
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
  );
};

export default MyRecipesCard;
