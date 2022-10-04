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
        <div className="my-16 mx-16 flex h-full flex-col gap-6">
          <div className="flex justify-between gap-10">
            <SearchBar />
            <ProfileCard
              name="Matheus"
              title="Boss"
              photo="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/seth-rogen-attends-los-angeles-fyc-clips-conversation-event-news-photo-1655133456.jpg"
            />
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
