import React, { useState } from "react";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  const [showSideNav, setShowSideNav] = useState(true);

  return (
    <div className="h-screen w-screen">
      {showSideNav && window.location.pathname !== "/" && (
        <SideNav toggleSideNav={setShowSideNav} showSideNav />
      )}
      <div className="flex-grow">
        <div className="flex items-center justify-between bg-gray-200 p-4">
          <h1 className="text-xl font-bold">{}</h1>
          <div className="w-10 h-10 rounded-full bg-secondary-200"></div>{" "}
          {/* Replace with your profile circle image */}
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
