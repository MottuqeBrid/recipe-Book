import { Link, NavLink } from "react-router";

const DashboardSideBar = () => {
  return (
    <div className={` w-full h-full p-4 bg-base-100 shadow-lg`}>
      <Link to="/" className="block p-2 rounded hover:bg-base-200">
        ⬅ Back to Home
      </Link>
      <Link to="/dashboard" className="block p-2 rounded hover:bg-base-200">
        Overview
      </Link>
      <NavLink
        to="/dashboard/blogs"
        className="block p-2 rounded hover:bg-base-200"
      >
        My Post
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className="block p-2 rounded hover:bg-base-200"
      >
        Profile
      </NavLink>

      <Link to="/recipes" className="block p-2 rounded hover:bg-base-200">
        All Recipes
      </Link>
      <Link to="/add-recipe" className="block p-2 rounded hover:bg-base-200">
        Add Recipe
      </Link>

      <Link to="/my-recipes" className="block p-2 rounded hover:bg-base-200">
        My Recipes
      </Link>
    </div>
  );
};

export default DashboardSideBar;
