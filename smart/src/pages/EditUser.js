import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { email } = useParams();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    full_Access: false,
  });

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    axios
      .get(`http://127.0.0.1:5000/userdetails/${email}`)
      .then(function (response) {
        console.log(response.data);
        setInputs(response.data);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: name === "full_Access" ? value === "true" : value, // Convert to boolean if name is fullAccess
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation regex pattern
    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    axios
      .post(`http://127.0.0.1:5000/userupdate/${email}`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/Users");
      });
  };

  return (
    <div className="flex flex-col h-full p-8 gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">Edit user</h1>
      <form onSubmit={handleSubmit} className="w-2/4">
        <div className="mb-4">
          <label className="block my-4" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-primary-500 p-2"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block my-4" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className="w-full rounded-md border border-primary-500 p-2"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-4">
          <label className="block my-4" htmlFor="full_Access">
            Is Admin
          </label>
          <select
            name="full_Access"
            id="lang"
            onChange={handleChange}
            value={inputs.full_Access}
            className="w-full rounded-md border border-primary-500 p-2"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          type="submit"
          name="update"
          className="bg-green hover:bg-primary-400 w-full text-white font-bold py-2 rounded-md mt-8"
        >
          Save
        </button>
      </form>
    </div>
  );
}
