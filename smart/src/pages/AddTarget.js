import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTarget() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/addtarget", inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/targets");
      });
  };

  return (
    <div className="flex flex-col h-full p-8 gap-4 items-center">
      <h1 className="text-2xl font-bold mb-4">Add Target</h1>
      <form onSubmit={handleSubmit} className="w-2/4">
        <div className="mb-4">
          <label className="block my-4">Quarter</label>
          <input
            type="number"
            className=" w-full rounded-md border border-primary-500 p-2"
            name="trimestre"
            min="1"
            max="4"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block my-4">Year</label>
          <input
            type="number"
            className=" w-full rounded-md border border-primary-500 p-2"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block my-4">Target</label>
          <input
            type="number"
            className=" w-full rounded-md border border-primary-500 p-2"
            name="target"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          name="add"
          className="bg-primary-500 hover:bg-primary-400 w-full text-white font-bold py-2 rounded-md mt-8"
        >
          Save
        </button>
      </form>
    </div>
  );
}
