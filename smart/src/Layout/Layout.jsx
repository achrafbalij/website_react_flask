import React, { useContext, useState } from "react";
import SideNav from "./SideNav";
import {
  Menu,
  MessageQuestion,
  Profile2User,
  SecurityUser,
  StatusUp,
} from "iconsax-react";
import UserContext from "../context/User";

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  const [showSideNav, setShowSideNav] = useState(true);
  const paths =
    user === "admin"
      ? [
          {
            name: "Admin",
            path: "/adminpage",
            icon: <SecurityUser className="w-6 h-6" />,
          },
          {
            name: "Users",
            path: "/users",
            icon: <Profile2User className="w-6 h-6" />,
          },
          {
            name: "Targets",
            path: "/targets",
            icon: <StatusUp className="w-6 h-6" />,
          },
        ]
      : [
          {
            name: "Consultant",
            path: "/consultant",
            icon: <MessageQuestion className="w-6 h-6" />,
          },
        ];

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="flex h-screen w-screen overflow-clip">
      {showSideNav && window.location.pathname !== "/" && (
        <SideNav
          paths={paths}
          showSideNav={showSideNav}
          setShowSideNav={setShowSideNav}
        />
      )}
      <div className="flex-grow">
        {window.location.pathname !== "/" && (
          <div className="flex items-center justify-between drop-shadow-xl bg-primary-500 px-8 py-2">
            {!showSideNav && (
              <div
                className="flex items-center justify-center bg-primary-500 text-white cursor-pointer hover:text-primary-100"
                onClick={toggleSideNav}
              >
                <Menu variant="Bold" className="w-10 h-10" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-white">
              {window.location.pathname === "/adminpage"
                ? <a target="_blank" href="https://app.powerbi.com/groups/ecd3748e-7b50-4f15-81df-52b8fcd10e07/reports/71d0ce95-599b-4fa0-ad98-ead5ed7d6d75/ReportSectionf9685674a3100970d013?experience=power-bi"> Dashboard </a>
                : window.location.pathname === "/consultant"
                ? "Consultant"
                : window.location.pathname === "/users"
                ? "Users"
                : window.location.pathname === "/targets"
                ? "Targets"
                : window.location.pathname === "/addnewuser"
                ? "Add New User"
                : window.location.pathname === "/addtarget"
                ? "Add New Target"
                : window.location.pathname === "/userupdate/:email"
                ? "Edit User"
                : ""}
            </h1>
            {/* Replace with your profile circle image */}
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
