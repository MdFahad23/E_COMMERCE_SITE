import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../Components/Layout";
import { showSuccess, showError, showLoading } from "../util/messages";
import { createCategory } from "../api/adminApi";
import { userInfo } from "../util/auth";

const CreateCategory = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    loading: false,
  });

  const { name, error, success, loading } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    const { jwt } = userInfo();
    createCategory(jwt, { name })
      .then((res) => {
        setValues({
          ...values,
          name: "",
          success: true,
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response)
          setValues({
            ...values,
            success: false,
            error: err.response.data,
            loading: false,
          });
        else {
          setValues({
            ...values,
            success: false,
            error: "Something Went Wrong!",
            loading: false,
          });
        }
      });
  };

  const categoryFrom = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="flex font-serif font-semibold pb-2">
          Name:
        </label>
        <input
          className="w-[100%]"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-[#1fc5db] px-8 py-2 text-2xl font-sans font-semibold inline-block rounded-xl mb-7"
      >
        Create Category
      </button>
    </form>
  );

  const goBack = () => (
    <div>
      <Link
        to="/admin/dashboard"
        className="text-[#161515] text-2xl font-sans font-semibold uppercase border-b-2 border-b-[#4d4b4b]"
      >
        Go to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new Category" className="bg-slate-400 py-6">
      <div className="containers">
        {showError(error, error)}
        {showSuccess(success, "Category Created!")}
        {showLoading(loading)}
        <div className="mt-5">
          {categoryFrom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
