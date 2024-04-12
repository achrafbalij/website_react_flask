import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SidebarPage.css"; // Import CSS for styling

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear local storage, reset state, etc.
    // Then navigate to the logout page or perform any other necessary action
    navigate("/");
  };

  return (
    <div className="flex">
      <iframe
        src="https://example.com"
        title="Content"
        className="w-full h-screen"
      />
    </div>
  );
};

export default AdminPage;
