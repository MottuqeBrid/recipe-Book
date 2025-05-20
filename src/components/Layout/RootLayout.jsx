import React, { use } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ThemeContext } from "../../providers/ThemeContext";
// import ThemeProvider from "../../providers/ThemeContext";

const RootLayout = () => {
  const { theme } = use(ThemeContext);
  return (
    <div data-theme={theme}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
