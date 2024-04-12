import React, { useState, useEffect } from "react";
import "../styles/SidebarPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Edit, TrushSquare } from "iconsax-react";

export default function Targets() {
  const [targets, setTargets] = useState([]);
  useEffect(() => {
    getTargets();
  }, []);

  function getTargets() {
    axios.get("http://127.0.0.1:5000/listtarget").then(function (response) {
      console.log(response.data);
      setTargets(response.data);
    });
  }

  // eslint-disable-next-line
  const deleteTarget = (trimester, year) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this target?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://127.0.0.1:5000/targetdelete/${trimester}/${year}`)
        .then(function (response) {
          console.log(response.data);
          getTargets();
        });
      alert("Successfully Deleted");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <button className="w-fit border text-green border-green rounded p-2 mt-4 hover:bg-green hover:text-white hover:opacity-80">
        <Link to="/addtarget">Add New Target</Link>
      </button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Quarter</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Target</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {targets.map((target_, key) => (
            <tr key={key}>
              <td className="border px-4 py-2">{target_.trimestre}</td>
              <td className="border px-4 py-2">{target_.year}</td>
              <td className="border px-4 py-2">{target_.target}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/targetupdate/${target_.trimestre}/${target_.year}`}
                  className="bg-primary-500 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  <Edit className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => deleteTarget(target_.trimestre, target_.year)}
                  className="bg-pink hover:bg-red text-white font-bold py-2 px-4 rounded"
                >
                  <TrushSquare className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
