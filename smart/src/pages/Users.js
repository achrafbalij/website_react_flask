import React, { useState, useEffect } from "react";
import "../styles/SidebarPage.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

export default function Users(){

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
  
    function getUsers() {
        axios.get('http://127.0.0.1:5000/listusers').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }
     
    // eslint-disable-next-line
    const deleteUser = (email) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            axios.delete(`http://127.0.0.1:5000/userdelete/${email}`).then(function(response){
                console.log(response.data);
                getUsers();
            });
            alert("Successfully Deleted");
        };
    };

    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
    };


  return (
    <div className="sidebar-page">
      <nav className="sidebar">
        <div className="logo">
            <a href="/AdminPage">
          <img src='https://brand.airbus.com/sites/g/files/jlcbta121/files/styles/airbus_480x480/public/2021-06/logo_black.webp?itok=aN5izIzH' alt="Logo" />
          </a>
        </div>
        <ul>
          <li><a href="/AdminPage">Dashboard</a></li>
          <li><a href="/users">Users</a></li>
          <li><a href="/targets">Targets</a></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content">
      <div className="col-12">
                    <p><Link to="/addnewuser" className="btn btn-success">Add New User</Link> </p>
                    <h1>List Users</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, key) =>
                                <tr key={key}>
                                    <td>{user.email}</td>
                                    <td>{user.fullAccess}</td>
                                    <td>
                                        <Link to={`/userupdate/${user.email}`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                        <button onClick={() => deleteUser(user.email)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  );
};