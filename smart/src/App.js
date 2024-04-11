import React, { } from 'react';
  
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
  
import LoginPage from './pages/LoginPage.js'
import ConsultantPage from './pages/Consultant.js';
import AdminPage from './pages/AdminPage.js';
import Users from './pages/Users.js';
import Targets from './pages/Targets.js';
import CreateUser from './pages/CreateUser.js';
import AddTarget from './pages/AddTarget.js';
import EditUser from './pages/EditUser.js';
import EditTarget from './pages/EditTarget.js';
 
function App() {
  return (
    <div className="vh-100 gradient-custom">
    <div className="container">
   
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/consultant" element={<ConsultantPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="/userupdate/:email" element={<EditUser />} />
            <Route path="/targets" element={<Targets />} />
            <Route path="/addtarget" element={<AddTarget />} />
            <Route path="/targetupdate/:trimester/:year" element={<EditTarget />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}
   
export default App;