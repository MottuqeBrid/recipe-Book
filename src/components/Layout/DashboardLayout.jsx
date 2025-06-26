import React from "react";
import Navbar from "./../NavBar/Navbar";
import { use } from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import DashboardSideBar from "../Dashboard/DashboardSideBar/DashboardSideBar";
import { Outlet } from "react-router";
import DashboardNavbar from "../Dashboard/DashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme} className="w-full ">
      <Navbar />
      <div className="flex flex-row bg-base-100 ">
        <aside className=" min-h-screen bg-base-100">
          <div className="drawer mt-6 sm:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side mt-14">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu  bg-base-100 text-base-content min-h-full w-80 p-4">
                {/* <DashboardNavbar column={true} hide={true} /> */}
                <DashboardSideBar />
              </ul>
            </div>
          </div>
          <div className="hidden sm:block w-48">
            <DashboardSideBar />
          </div>
        </aside>
        <div className="flex-1 w-full p-4 min-h-screen mt-14 sm:mt-0">
          {/* <DashboardNavbar hide={false} column={false} /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
