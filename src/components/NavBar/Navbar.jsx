// src/components/Navbar.jsx
import { Link, NavLink } from "react-router";
import useAuth from "../../providers/useAuth";
import ThemeToggle from "./ThemeToggle";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className={`navbar bg-primary shadow-md sticky top-0 z-50`}>
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">
            Recipe Book
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1 hidden sm:flex">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipes">All Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blog</NavLink>
          </li>
          {user && (
            <>
              {/* <li>
                <NavLink to="/add-recipe">Add Recipe</NavLink>
              </li>
              <li>
                <NavLink to="/my-recipes">My Recipes</NavLink>
              </li> */}
              <li>
                <NavLink to="/comments">Comments</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
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
            <Tooltip anchorSelect={`.my-anchor-element`} place="top">
              {user.displayName}
            </Tooltip>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <a className={`my-anchor-element`}>
                <img
                  src={user.photoURL || "/placeholder.jpg"}
                  className="w-10 rounded-full"
                />
              </a>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <ul className="menu menu-horizontal px-1 sm:hidden flex-col">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/recipes">All Recipes</Link>
                </li>
                <li>
                  <Link to="/blogs">Blog</Link>
                </li>
                {user && (
                  <>
                    <li>
                      <Link to="/add-recipe">Add Recipe</Link>
                    </li>
                    <li>
                      <Link to="/my-recipes">My Recipes</Link>
                    </li>
                    <li>
                      <Link to="/comments">Comments</Link>
                    </li>
                  </>
                )}
              </ul>
              <li>
                <Link to="/profile" className="text-center">
                  {user.displayName}
                </Link>
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
