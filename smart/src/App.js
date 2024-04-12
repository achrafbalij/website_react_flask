import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.js";
import ConsultantPage from "./pages/Consultant.js";
import AdminPage from "./pages/AdminPage.js";
import Users from "./pages/Users.js";
import Targets from "./pages/Targets.js";
import CreateUser from "./pages/CreateUser.js";
import AddTarget from "./pages/AddTarget.js";
import EditUser from "./pages/EditUser.js";
import EditTarget from "./pages/EditTarget.js";
import Layout from "./Layout/Layout.jsx";
import { UserContext, UserProvider } from "./context/User.js";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="vh-100">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <LoginPage />
                </Layout>
              }
            />
            {user.role !== "" && (
              <Route
                path="/consultant"
                element={
                  <Layout>
                    <ConsultantPage />
                  </Layout>
                }
              />
            )}
            {user.role === "admin" && (
              <>
                <Route
                  path="/adminpage"
                  element={
                    <Layout>
                      <AdminPage />
                    </Layout>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <Layout>
                      <Users />
                    </Layout>
                  }
                />
                <Route
                  path="/addnewuser"
                  element={
                    <Layout>
                      <CreateUser />
                    </Layout>
                  }
                />
                <Route
                  path="/userupdate/:email"
                  element={
                    <Layout>
                      <EditUser />
                    </Layout>
                  }
                />
                <Route
                  path="/targets"
                  element={
                    <Layout>
                      <Targets />
                    </Layout>
                  }
                />
                <Route
                  path="/addtarget"
                  element={
                    <Layout>
                      <AddTarget />
                    </Layout>
                  }
                />
                <Route
                  path="/targetupdate/:trimester/:year"
                  element={
                    <Layout>
                      <EditTarget />
                    </Layout>
                  }
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
