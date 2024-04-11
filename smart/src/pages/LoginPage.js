import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import "../App.css";
 
export default function LoginPage(){
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const logInUser = () => {
        if(email.length === 0){
          alert("Email has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                //console.log(response.data);
                if(response.data.is_admin === true)
                  navigate("/AdminPage");
                else
                  navigate("/consultant");
            })
            .catch(function (error) {
              console.log(error, 'error');
              if (error.response && error.response.status === 401) {
                  alert("Invalid credentials");
              } else {
                  alert("An error occurred. Please try again later.");
              }
            });
        }
    }
 
    let imgs = [
      'https://brand.airbus.com/sites/g/files/jlcbta121/files/styles/airbus_480x480/public/2021-06/logo_black.webp?itok=aN5izIzH',
    ];
     
  return (
    <div>
      <div className="container">
        <div className="container-fluid h-custom">
          <div className="row">
            <div className="col-md-8 col-lg-6 col-xl-5 login-form">
              <div className="title-image">
                <img src={imgs[0]} className="img_fluid" alt="Logo" />
              </div>
              <div>
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <h3 className="lead fw-normal mb-0 me-3">Log Into Your SMART AIRBUS Account</h3>
                  </div>
  
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
                  </div>
  
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                  </div>
  
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser}>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );    
}