import React, { useState, useEffect} from "react";
import "../styles/SidebarPage.css";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'

export default function Targets(){

    const [targets, setTargets] = useState([]);
    useEffect(() => {
        getTargets();
    }, []);
  
    function getTargets() {
        axios.get('http://127.0.0.1:5000/listtarget').then(function(response) {
            console.log(response.data);
            setTargets(response.data);
        });
    }
     
    // eslint-disable-next-line
    const deleteTarget = (trimester, year) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this target?");
        if (confirmDelete) {
            axios.delete(`http://127.0.0.1:5000/targetdelete/${trimester}/${year}`).then(function(response){
                console.log(response.data);
                getTargets();
            });
            alert("Successfully Deleted");
        };
    };


    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/login');
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
                    <p><Link to="/addtarget" className="btn btn-success">Add New Target</Link> </p>
                    <h1>Targets</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Quarter</th>
                                <th>Year</th>
                                <th>Target</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targets.map((target_, key) =>
                                <tr key={key}>
                                    <td>{target_.trimestre}</td>
                                    <td>{target_.year}</td>
                                    <td>{target_.target}</td>
                                    <td>
                                        <Link to={`/targetupdate/${target_.trimestre}/${target_.year}`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                        <button onClick={() => deleteTarget(target_.trimestre, target_.year)} className="btn btn-danger">Delete</button>
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