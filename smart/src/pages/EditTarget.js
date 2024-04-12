import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { trimester, year } = useParams();

  const [inputs, setInputs] = useState({
    trimester: "",
    year: "",
    target: "",
  });

  useEffect(() => {
    getTarget();
  }, []);

  function getTarget() {
    axios
      .get(`http://127.0.0.1:5000/gettarget/${trimester}/${year}`)
      .then(function (response) {
        console.log(response.data);
        // Set the trimester value in the inputs state
        setInputs((prevInputs) => ({
          ...prevInputs,
          trimester: response.data.trimestre,
          year: response.data.year,
          target: response.data.target,
        }));
      })
      .catch(function (error) {
        console.error("Error fetching target data:", error);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://127.0.0.1:5000/updatetarget/${trimester}/${year}`, inputs)
      .then(function (response) {
        console.log(response.data);
        navigate("/targets");
      })
      .catch(function (error) {
        console.error("Error updating target:", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col h-full p-8 gap-4 items-center">
        <h1 className="text-2xl font-bold mb-4">Edit target</h1>
        <form onSubmit={handleSubmit} className="w-2/4">
          <div className="mb-4">
            <label className="block my-4">Quarter</label>
            <input
              type="number"
              className="w-full rounded-md border border-primary-500 p-2"
              name="trimester"
              min="1"
              max="4"
              value={inputs.trimester}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block my-4">Year</label>
            <input
              type="number"
              className="w-full rounded-md border border-primary-500 p-2"
              name="year"
              value={inputs.year}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block my-4">Target</label>
            <input
              type="number"
              className="w-full rounded-md border border-primary-500 p-2"
              name="target"
              value={inputs.target}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            name="update"
            className="bg-primary-500 hover:bg-primary-400 w-full text-white font-bold py-2 rounded-md mt-8"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
