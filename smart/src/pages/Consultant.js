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
    <div className="flex w-full h-full p-8 items-center justify-center">
      <iframe title="smart_1_2_3_4_new_data11" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=71d0ce95-599b-4fa0-ad98-ead5ed7d6d75&autoAuth=true&ctid=35c1785d-3361-4341-a29e-fc685e52b8a5" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  );
};

export default AdminPage;
