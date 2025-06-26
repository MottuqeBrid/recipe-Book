import { ImageOff } from "lucide-react";
import { Link, NavLink } from "react-router";

const DashboardSideBar = () => {
  return (
    <div className={` w-full h-full p-4 bg-base-100 shadow-lg`}>
      <Link to="/dashboard" className="block p-2 rounded hover:bg-base-200">
        Dashboard
      </Link>
      <NavLink
        to="/dashboard/blogs"
        className="block p-2 rounded hover:bg-base-200"
      >
        All Post
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className="block p-2 rounded hover:bg-base-200"
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/settings"
        className="block p-2 rounded hover:bg-base-200"
      >
        Settings
      </NavLink>
    </div>
  );
};

export default DashboardSideBar;
