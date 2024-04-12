import { CloseSquare, Logout } from "iconsax-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideNav = ({ paths, showSideNav, setShowSideNav }) => {
  const navigate = useNavigate();

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="flex flex-col gap-8 bg-lighsilver max-w-96 min-w-96 p-8">
      <div className="flex items-center justify-between">
        <img
          src={require("../img/Airbus_Logo_2017.svg.png")}
          alt="Logo"
          className="w-44"
        />
        <CloseSquare
          onClick={toggleSideNav}
          className="w-12 h-12 text-primary-500 hover:text-primary-400 cursor-pointer"
          variant="Bold"
        />
      </div>
      <ul className="mt-8 gap-8 flex flex-col">
        {paths.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={
                window.location.pathname === item.path
                  ? "text-lg rounded-xl bg-primary-500 font-bold flex gap-4 flex-row items-center text-white p-4"
                  : "text-lg rounded-xl bg-white flex gap-4 flex-row items-center text-primary-500 p-4 hover:bg-primary-500 hover:text-white"
              }
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="flex flex-row text-lg text-red bg-pink rounded-xl p-3 gap-4 cursor-pointer hover:opacity-80"
        onClick={() => navigate("/")}
      >
        <Logout className="w-8 h-8 text-red cursor-pointer" />
        Logout
      </button>
    </div>
  );
};

export default SideNav;
