import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setName, setRole } = useContext(UserContext);

  const navigate = useNavigate();

  const logInUser = () => {
    if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (password.length === 0) {
      alert("password has left Blank!");
    } else {
      axios
        .post("http://127.0.0.1:5000/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          //console.log(response.data);
          if (response.data.is_admin === true) {
            setRole("admin");
            setName(response.data.name);
            navigate("/AdminPage");
          } else {
            setRole("consultant");
            setName(response.data.name);
            navigate("/ConsultantPage");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response && error.response.status === 401) {
            alert("Invalid credentials");
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    }
  };

  let imgs = [
    "https://brand.airbus.com/sites/g/files/jlcbta121/files/styles/airbus_480x480/public/2021-06/logo_black.webp?itok=aN5izIzH",
  ];

  return (
    <div className="flex w-full h-full items-center justify-center my-12">
      <div className="flex flex-col items-center p-16 gap-4 border rounded-2xl bg-lighsilver w-fit border-primary-200 shadow-2xl shadow-primary-200">
        <img src={imgs[0]} alt="Logo" className="w-40 rounded-lg" />
        <div>
          <form className=" flex flex-col gap-8">
            <div>
              <h3 className="text-lg">Log Into Your SMART AIRBUS Account</h3>
            </div>
            <div>
              <input
                type="email"
                className="border border-silver w-full rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a valid email address"
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="border border-silver w-full rounded-md p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <button
                className="bg-primary-500 w-full hover:bg-primary-400 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={logInUser}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
