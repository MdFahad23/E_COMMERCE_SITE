import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="containers">
      <div className="text-center mt-10">
        <h1 className="text-6xl font-sans font-extrabold pb-6">404</h1>
        <h3 className="text-4xl font-sans font-semibold pb-4">
          Page Not Pound
        </h3>
        <Link
          to="/"
          className="text-md font-sans font-medium uppercase text-[#0650af] border-b-2 border-b-[#01b1f7]"
        >
          Back To Home Page
        </Link>
      </div>
    </div>
  );
};

export default Error;
