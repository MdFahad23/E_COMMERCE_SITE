import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Protected from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import AdminRoutes from "./adminRoutes";
import AdminDashboard from "../pages/adminDashboard";
import Error from "../Components/Error";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoutes>
            <AdminDashboard />
          </AdminRoutes>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Index;
