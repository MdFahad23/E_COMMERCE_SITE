import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getCartItem, getProfile } from "../../api/apiOrder";
import { userInfo } from "../../util/auth";
import Layout from "../Layout";

const Checkout = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [values, setValues] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postCode: "",
    country: "",
  });

  const { phone, address1, address2, city, postCode, country } = values;

  const loadCart = () => {
    getCartItem(userInfo().jwt)
      .then((response) => setOrderItems(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile(userInfo().jwt)
      .then((response) => setValues(response.data))
      .catch((err) => {});
    loadCart();
  }, []);

  const getOrderTotal = () => {
    const arr = orderItems.map((cartItem) => cartItem.price * cartItem.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };

  const shippingDetails = () => (
    <>
      To,
      <br /> <b>{userInfo().name}</b>
      <br /> Phone: {phone}
      <br /> {address1}
      {address2 ? (
        <>
          <br />
          {address2}
        </>
      ) : (
        ""
      )}
      <br /> {city}-{postCode}, {country}
    </>
  );

  if (address1 && city && phone && postCode && country)
    return (
      <>
        <Layout title="Checkout" description="Complete your order!">
          <div className="containers">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link href="#">Order</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link href="#">Cart</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link href="#">Shipping Address</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </nav>
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="card mb-5" style={{ height: "auto" }}>
                    <div className="card-header">Shipping Details</div>
                    <div className="card-body">{shippingDetails()}</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card" style={{ height: "auto" }}>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {orderItems.map((item) => (
                          <li
                            key={item._id}
                            className="list-group-item"
                            align="right"
                          >
                            {item.product ? item.product.name : ""} x{" "}
                            {item.count} = ৳ {item.price * item.count}{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer">
                      <span className="float-left">
                        <b>Order Total</b>
                      </span>
                      <span className="float-right">
                        <b>৳ {getOrderTotal()}</b>
                      </span>
                    </div>
                  </div>
                  <br />
                  <p>
                    <Link className="btn btn-warning btn-md" to="/payment">
                      Make Payment
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  else return <></>;
};

export default Checkout;
