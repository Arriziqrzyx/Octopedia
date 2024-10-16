import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow py-8 sm:px-12 md:px-16 lg:px-32 mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
