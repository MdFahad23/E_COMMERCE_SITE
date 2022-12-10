import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="bg-[#000] text-orange-50 py-4">
      <ul className="containers flex">
        <li className="mr-10">
          <NavLink className="text-xl" to="/">
            Home
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
};

export default Menu;
