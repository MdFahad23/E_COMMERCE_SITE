import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layout";
import { getProfile, updateProfile } from "../../api/apiOrder";
import { userInfo } from "../../util/auth";

const ShippingAddress = () => {
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postCode: "",
    country: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const { phone, address1, address2, city, postCode, country } = values;

  useEffect(() => {
    getProfile(userInfo().jwt)
      .then((response) => setValues(response.data))
      .catch((err) => {});
  }, []);

  const handelChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    updateProfile(userInfo().jwt, values)
      .then((response) => {
        if (response.status === 200) {
          setRedirect(true);
        }
      })
      .catch((err) => setDisabled(false));
  };

  const profileForm = () => (
    <form onSubmit={handelSubmit}>
      <label className="text-muted">Phone:</label>
      <input
        name="phone"
        value={phone}
        required
        className="form-control"
        onChange={handelChange}
      />
      <label className="text-muted">Address 1:</label>
      <input
        name="address1"
        value={address1}
        required
        className="form-control"
        onChange={handelChange}
      />
      <label className="text-muted">Address 2:</label>
      <input
        name="address2"
        value={address2}
        className="form-control"
        onChange={handelChange}
      />
      <div className="row">
        <div className="col-4">
          <label className="text-muted">City:</label>
          <input
            name="city"
            value={city}
            required
            className="form-control"
            onChange={handelChange}
          />
        </div>
        <div className="col-4">
          <label className="text-muted">Post Code: </label>
          <input
            name="postCode"
            value={postCode}
            type="number"
            required
            className="form-control"
            onChange={handelChange}
          />
        </div>
        <div className="col-4">
          <label className="text-muted">Country:</label>
          <input
            name="country"
            value={country}
            required
            className="form-control"
            onChange={handelChange}
          />
          <br />
          <button
            type="submit"
            className="btn btn-primary btn-sm float-right bg-slate-500"
            disabled={disabled}
          >
            Save and Checkout
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Layout title="Checkout" description="Complete your order!">
      <div className="containers">
        {redirect ? navigate("/checkout") : ""}
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link href="#">Order</Link>
            </li>
            <li class="breadcrumb-item">
              <Link href="#">Cart</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Shipping Address
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-5" style={{ height: "auto" }}>
              <div className="card-header">Shipping Address</div>
              <div className="card-body">{profileForm()}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddress;
