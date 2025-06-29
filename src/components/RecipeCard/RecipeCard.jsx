import { Link } from "react-router";
import { Tooltip } from "react-tooltip";

const RecipeCard = ({ recipe }) => {
  const { _id, title, cuisine, image, likeCount } = recipe;

  return (
    <div className="card bg-base-100 shadow-xl">
      <Tooltip anchorSelect={`.my-anchor-element-${_id}`} place="top">
        {title}
      </Tooltip>
      <figure>
        <img
          src={image || "https://via.placeholder.com/400x250.png?text=No+Image"}
          alt={title}
          className={`h-48 w-full object-cover my-anchor-element-${_id}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          <strong>Cuisine:</strong> {cuisine}
        </p>
        <p>
          <strong>Likes:</strong> {likeCount}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/recipes/${_id}`}>
            <button className="btn btn-outline btn-primary btn-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
