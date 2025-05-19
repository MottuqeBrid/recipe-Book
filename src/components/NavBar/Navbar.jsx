import { Link, NavLink } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider"; // Make sure you have context
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLogin, MdAppRegistration } from "react-icons/md";

const Navbar = () => {
  //   const { user, logout } = useContext(AuthContext);
  // const navigate = useNavigate();

  //   const handleLogout = async () => {
  //     // await logout();
  //     navigate("/login");
  //   };

  const navLinks = (
    <>
      <NavLink to="/" className="btn btn-ghost text-base">
        Home
      </NavLink>
      <NavLink to="/all-recipes" className="btn btn-ghost text-base">
        All Recipes
      </NavLink>
      <NavLink to="/add-recipe" className="btn btn-ghost text-base">
        Add Recipe
      </NavLink>
      <NavLink to="/my-recipes" className="btn btn-ghost text-base">
        My Recipes
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-12">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          🍳 Recipe Book
        </Link>
      </div>

      <div className="flex-none gap-2">
        <div className="hidden md:flex gap-2">{navLinks}</div>

        {/* {!user ? (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              <MdOutlineLogin /> Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              <MdAppRegistration /> Register
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img
                className="w-10 rounded-full"
                // src={user.photoURL}
                alt="avatar"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <p className="text-center">{user.displayName}</p>
              </li>
              <li>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
