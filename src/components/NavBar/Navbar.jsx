// src/components/Navbar.jsx
import { Link } from "react-router";
import useAuth from "../../providers/useAuth";
import ThemeToggle from "./ThemeToggle";
// import useAuth from "../hooks/useAuth";
// gti

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">
            Recipe Book
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">All Recipes</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/add-recipe">Add Recipe</Link>
              </li>
              <li>
                <Link to="/my-recipes">My Recipes</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="">
        {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <img
                src={user.photoURL || "/placeholder.jpg"}
                className="w-10 rounded-full"
              />
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="text-center">{user.displayName}</span>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
