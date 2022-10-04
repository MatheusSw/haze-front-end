import React from "react";
import { Outlet } from "react-router-dom";
import ProfileCard from "../components/profile-card/profilecard";
import SearchBar from "../components/search-bar/searchbar";
import Sidebar from "../components/sidebar/sidebar";

const Layout: React.FC = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-6 subpixel-antialiased">
      <Sidebar />
      <main className="col-span-5" aria-colspan={5}>
        <div className="my-16 mx-16 flex flex-col gap-6">
          <div className="flex justify-between gap-10">
            <SearchBar />
            <ProfileCard
              name="Matheus"
              title="Boss"
              photo="https://images.unsplash.com/photo-1498671546682-94a232c26d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"
            />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
