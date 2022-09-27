import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";

const Layout: React.FC = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-6 subpixel-antialiased">
      <Sidebar />
      <main
        className="col-span-5 flex flex-col gap-20 px-8 pt-20"
        aria-colspan={5}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
