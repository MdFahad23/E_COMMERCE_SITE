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
import CreateCategory from "../Components/admin/CreateCategory";
import CreateProduct from "../Components/admin/CreateProduct";
import ProductDetails from "../Components/Products/ProductDetails";
import Cart from "../Components/order/Cart";
import ShippingAddress from "../Components/order/ShippingAddress";
import Checkout from "../Components/order/Checkout";
import Payment from "../Components/order/Payment";

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
        path="/cart"
        element={
          <Protected>
            <Cart />
          </Protected>
        }
      />
      <Route
        path="/shipping"
        element={
          <Protected>
            <ShippingAddress />
          </Protected>
        }
      />
      <Route
        path="/checkout"
        element={
          <Protected>
            <Checkout />
          </Protected>
        }
      />
      <Route
        path="/payment"
        element={
          <Protected>
            <Payment />
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
      <Route
        path="/create/category"
        element={
          <AdminRoutes>
            <CreateCategory />
          </AdminRoutes>
        }
      />
      <Route
        path="/create/product"
        element={
          <AdminRoutes>
            <CreateProduct />
          </AdminRoutes>
        }
      />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default Index;
