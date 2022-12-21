import React from "react";
import { useLocation } from "react-router-dom";

import Layout from "../Layout";
import { API } from "../../util/config";

const ProductDetails = () => {
  let { state } = useLocation();

  let { _id, name, price, description, quantity } = state;

  return (
    <Layout title="Product Details">
      <div className="containers">
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
                <button className="btn btn-outline-primary btn-md">
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
