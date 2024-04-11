import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SidebarPage.css"; // Import CSS for styling

const AdminPage = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Perform logout logic here
        // For example, clear local storage, reset state, etc.
        // Then navigate to the logout page or perform any other necessary action
        navigate('/login');
    };

    return (
        <div className="sidebar-page">
            <nav className="sidebar">
                <div className="logo">
                    <a href="/consultant">
                        <img src='https://brand.airbus.com/sites/g/files/jlcbta121/files/styles/airbus_480x480/public/2021-06/logo_black.webp?itok=aN5izIzH' alt="Logo" />
                    </a>
                </div>
                <ul>
                    {/* Add your navigation links here */}
                </ul>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">
                <iframe src="https://example.com" title="Content" />
            </div>
        </div>
    );
};

export default AdminPage;
