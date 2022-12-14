import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Components/Layout";
import { showError, showLoading } from "../util/messages";
import { login } from "../api/apiAuth";
import { authentication } from "../util/auth";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    disable: false,
    redirect: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading, disable, redirect } = values;

  const handelChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //Submit From

  const handelSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    login({ email, password })
      .then((response) => {
        authentication(response.data.token, () => {
          setValues({
            name: "",
            email: "",
            password: "",
            loading: false,
            disable: false,
            redirect: true,
          });
        });
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

  const signInFrom = () => (
    <form onSubmit={handelSubmit}>
      <div className="mb-3">
        <label className="flex font-serif font-semibold" htmlFor="email">
          Email:
        </label>
        <input
          className="w-[100%]"
          type="text"
          name="email"
          value={email}
          onChange={handelChange}
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
          onChange={handelChange}
          required
        />
      </div>
      <div className="pb-4">
        <button
          className="bg-[#1fc5db] px-8 py-2 text-2xl font-sans font-semibold inline-block"
          type="submit"
          disabled={disable}
        >
          Login
        </button>
      </div>
    </form>
  );

  const redirectUser = () => {
    if (redirect) return navigate("/");
  };

  return (
    <Layout title="Login" className="bg-slate-400 py-6">
      <div className="containers">
        {redirectUser()}
        {showLoading(loading)}
        {showError(error, error)}
        <h1 className="text-4xl ml-3 font-sans font-bold">Login Hear,</h1>
        <br />
        <hr />
        <div className="ml-3">{signInFrom()}</div>
        <hr />
      </div>
    </Layout>
  );
};

export default Login;
