import React from "react";
import { NavLink } from "react-router-dom";

import Layout from "../Components/Layout";
import { userInfo } from "../util/auth";

const AdminDashboard = () => {
  const { name, email, role } = userInfo();

  const userLink = () => {
    return (
      <>
        <h4 className="text-3xl font-sans font-bold p-3 bg-[#bdbdbdf5]">
          User Links
        </h4>
        <ul>
          <li className="history text-[#0069f3] border-b-2 border-b-[#999]">
            <NavLink to="#">Create Category</NavLink>
          </li>
          <li className=" text-[#0069f3] history border-b-2 border-[#999]">
            <NavLink to="#">Create Product</NavLink>
          </li>
        </ul>
      </>
    );
  };

  const UserInfo = () => {
    return (
      <>
        <h4 className="text-3xl font-sans font-bold p-3 bg-[#bdbdbdf5]">
          {" "}
          User Information
        </h4>
        <ul>
          <li className="history border-b-2 border-[#999]">{name}</li>
          <li className="history border-b-2 border-[#999]">{email}</li>
          <li className="history">{role}</li>
        </ul>
      </>
    );
  };

  return (
    <Layout title="Dashboard">
      <div className="containers">
        <div className="grid grid-cols-12 py-6">
          <div className="card_Link mt-5">{userLink()}</div>
          <div className="card_Info">
            <div className="border-2 border-[#999] mt-5">{UserInfo()}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
