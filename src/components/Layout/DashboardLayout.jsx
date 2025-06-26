import React from "react";
import Navbar from "./../NavBar/Navbar";
import { use } from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import DashboardSideBar from "../Dashboard/DashboardSideBar/DashboardSideBar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme} className="w-full ">
      <Navbar />
      <div className="flex flex-row bg-base-100 ">
        <aside className=" min-h-screen bg-base-100">
          <DashboardSideBar />
        </aside>
        <div className="flex-1 p-4 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
