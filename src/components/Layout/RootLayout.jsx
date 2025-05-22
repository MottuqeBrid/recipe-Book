import React, { use } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ThemeContext } from "../../providers/ThemeContext";

const RootLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme} className="w-full">
      <main className="max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default RootLayout;
