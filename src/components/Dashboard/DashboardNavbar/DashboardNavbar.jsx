import { Link } from "react-router"; // Optional if you're using React Router
import useAuth from "../../../providers/useAuth";

const DashboardNavbar = ({ hide, column }) => {
  const { user } = useAuth();
  return (
    <div className="navbar bg-base-200 shadow-md px-4 w-full mb-6">
      <div
        className={` ${
          column ? "flex flex-col items-start" : "flex-1"
        } items-center justify-between ${hide ? "hidden" : "block"}`}
      >
        <Link to="/" className="btn btn-ghost text-lg">
          ⬅ Back to Home
        </Link>
        <Link to="/recipes" className="btn btn-ghost text-lg">
          All Recipes
        </Link>
        <Link to="/add-recipe" className="btn btn-ghost text-lg">
          Add Recipe
        </Link>

        <Link to="/my-recipes" className="btn btn-ghost text-lg">
          My Recipes
        </Link>
      </div>

      {/* Right: Welcome + User Avatar */}
      {/* <div className={`flex items-center gap-4 ${hide ? "hidden" : "block"}`}>
        <div className="text-sm text-right hidden sm:block">
          <p className="font-semibold">Welcome back,</p>
          <p className="text-primary">{user.displayName}</p>
        </div>
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardNavbar;
