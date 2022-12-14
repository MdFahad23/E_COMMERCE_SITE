import React from "react";
import { Routes, Route } from "react-router-dom";

import { isAuthentication } from "../util/auth";
import Protected from "./ProtectedRoutes";
import Home from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <Protected auth={isAuthentication}>
            <Dashboard />
          </Protected>
        }
      />
    </Routes>
  );
};

export default Index;
