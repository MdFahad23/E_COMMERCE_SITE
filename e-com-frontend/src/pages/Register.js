import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Layout from "../Components/Layout";
import { showError, showLoading } from "../util/messages";
import { register } from "../api/apiAuth";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: false,
    disable: false,
    success: false,
  });

  const { name, email, password, error, loading, disable, success } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  //Submit From
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, disable: true });

    register({ name, email, password })
      .then((response) => {
        if (response) {
          setValues({
            name: "",
            email: "",
            password: "",
            loading: false,
            disable: false,
            success: true,
          });
        }
      })
      .catch((err) => {
        let errMsg = "Something Wend Wrong! ";
        if (err.response) {
          errMsg = err.response.data;
        } else {
          errMsg = "Something Wend Wrong! ";
        }
        setValues({ ...values, error: errMsg, disable: false });
      });
  };

  const signUpFrom = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="flex font-serif font-semibold" htmlFor="name">
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
      <div className="mb-3">
        <label className="flex font-serif font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          className="w-[100%]"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="flex font-serif font-semibold" htmlFor="password">
          Password:
        </label>
        <input
          className="w-[100%]"
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="pb-4">
        <button
          className="bg-[#1fc5db] px-8 py-2 text-2xl font-sans font-semibold inline-block"
          type="submit"
          disabled={disable}
        >
          Create Account
        </button>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success)
      return (
        <div>
          New Account Created. Please <NavLink to="/login">Login</NavLink>.
        </div>
      );
  };

  return (
    <Layout title="Register" className="bg-slate-400 py-6">
      <div className="containers">
        {showSuccess()}
        {showLoading(loading)}
        {showError(error, error)}
        <h1 className="text-4xl ml-3 font-sans font-bold">Register Hear,</h1>
        <br />
        <hr />
        <div className="ml-3">{signUpFrom()}</div>
        <hr />
      </div>
    </Layout>
  );
};

export default Register;
