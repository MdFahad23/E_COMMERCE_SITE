import { Navigate } from "react-router-dom";

import { isAuthentication, userInfo } from "../util/auth";

const AdminRoutes = ({ children }) => {
  return isAuthentication() && userInfo().role === "admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoutes;
