import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Index;
