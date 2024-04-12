import React, { useState, useEffect } from "react";
import "../styles/SidebarPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  // eslint-disable-next-line
  const deleteUser = (email) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://127.0.0.1:5000/userdelete/${email}`)
        .then(function (response) {
          console.log(response.data);
          getUsers();
        });
      alert("Successfully Deleted");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button className="w-fit border text-green border-green rounded p-2 mt-4 hover:bg-green hover:text-white hover:opacity-80">
        <Link to="/addnewuser">Add New User</Link>
      </button>
      <h1 className="text-2xl font-bold">List Users</h1>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td className="py-2 text-blue-500 text-center">{user.email}</td>
              <td className="py-2 text-blue-500 text-center">{user.fullAccess ? "Admin": "Consultant"}</td>
              <td className="py-2 text-center">
                <Link
                  to={`/userupdate/${user.email}`}
                  className="mr-2 text-blue-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.email)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
