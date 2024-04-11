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
    axios.get(`http://127.0.0.1:5000/userdetails/${email}`).then(function (response) {
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

    axios.post(`http://127.0.0.1:5000/userupdate/${email}`, inputs).then(function (response) {
      console.log(response.data);
      navigate('/Users');
    });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit user</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-outline mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password" // Add name attribute to password input
                  value={inputs.password}
                  onChange={handleChange} // Use handleChange for password input
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>
              <div className="mb-3">
                <label>Is Admin</label>
                <select name="full_Access" id="lang" onChange={handleChange} value={inputs.full_Access}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <button type="submit" name="update" className="btn btn-primary">Save</button>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}