import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { trimester, year } = useParams();

  const [inputs, setInputs] = useState({
    trimester: "",
    year: "",
    target: ""
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
          target: response.data.target
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
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit target</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Quarter</label>
                <input
                  type="number"
                  className="form-control"
                  name="trimester"
                  min="1"
                  max="4"
                  value={inputs.trimester}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={inputs.year}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Target</label>
                <input
                  type="number"
                  className="form-control"
                  name="target"
                  value={inputs.target}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" name="update" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}
