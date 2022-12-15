import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { signOut, isAuthentication, userInfo } from "../util/auth";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#000] text-orange-50 py-4">
      <ul className="containers flex">
        <li className="mr-10">
          <NavLink className="text-xl" to="/">
            Home
          </NavLink>
        </li>
        {!isAuthentication() && (
          <>
            <li className="mx-10">
              <NavLink className="text-xl" to="/login">
                Login
              </NavLink>
            </li>
            <li className="mx-10">
              <NavLink className="text-xl" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
        {isAuthentication() && (
          <>
            <li className="mx-10">
              <NavLink className="text-xl" to={`/${userInfo().role}/dashboard`}>
                Dashboard
              </NavLink>
            </li>
            <li className="mx-10">
              <span
                className="text-xl cursor-pointer"
                onClick={() => {
                  signOut(navigate("/login"));
                }}
              >
                Log Out
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
