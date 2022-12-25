import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Layout from "../Layout";
import { API } from "../../util/config";
import { isAuthentication, userInfo } from "../../util/auth";
import { addToCart } from "../../api/apiOrder";
import { showError, showSuccess } from "../../util/messages";

const ProductDetails = () => {
  const [values, setValues] = useState({
    error: false,
    success: false,
  });
  let { state } = useLocation();

  let { _id, name, price, description, quantity } = state;

  const handleAddToCart = (product) => () => {
    if (isAuthentication()) {
      setValues({ ...values, error: false, success: false });
      const { jwt, _id } = userInfo();
      const cartItem = {
        user: _id,
        product: product._id,
        price: product.price,
      };

      addToCart(jwt, cartItem)
        .then((res) => setValues({ ...values, success: true }))
        .catch((err) => {
          if (err.response) {
            setValues({ ...values, error: err.response.data });
          } else {
            setValues({ ...values, error: "Adding to cart Field!" });
          }
        });
    } else {
      setValues({ ...values, success: false, error: "please login First!" });
    }
  };

  return (
    <Layout title="Product Details">
      <div className="containers">
        {showError(values.error, values.error)}
        {showSuccess(values.success, "Added to Cart Successfully!")}
        <div className="grid grid-cols-12 mt-7">
          <div className="col-span-4 mr-6">
            <img src={`${API}/product/photo/${_id}`} alt={name} />
          </div>
          <div className="col-span-8 ml-6">
            <h2 className="text-2xl uppercase font-sans font-bold">{name}</h2>
            <div className="text-xl uppercase font-sans font-semibold">
              <span className="text-2xl font-bold mr-1">&#2547;</span>
              {price}
            </div>
            <p>
              {quantity ? <span>In Stock</span> : <span>Out of Stock</span>}
            </p>
            <p>{description}</p>
            {quantity ? (
              <>
                &nbsp;
                <button
                  className="btn btn-outline-primary btn-md"
                  onClick={handleAddToCart(state)}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
