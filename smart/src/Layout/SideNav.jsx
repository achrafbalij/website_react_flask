import React from "react";

const SideNav = ({ toggleSideNav, showSideNav }) => {
  const paths = [
    { name: "Login", path: "/" },
    { name: "Consultant", path: "/consultant" },
    { name: "Admin", path: "/adminpage" },
    { name: "Users", path: "/users" },
    { name: "Targets", path: "/targets" },
  ];

  const handleToggle = () => {
    toggleSideNav(!showSideNav);
  };

  return (
    <div className="bg-primary-200 w-96">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Airbus</h1>
        <button onClick={handleToggle}>Toggle</button>
      </div>
      <ul>
        {paths.map((item, index) => (
          <li key={index}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
