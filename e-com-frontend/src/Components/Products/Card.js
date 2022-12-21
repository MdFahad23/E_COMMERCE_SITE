import React from "react";
import { Link } from "react-router-dom";
import { API } from "../../util/config";

const Card = ({ product }) => {
  return (
    <div className="col-span-3 border-2 mx-6 my-6">
      <img
        className="w-[100%] h-[200px] inline-block bg-cover justify-center"
        src={`${API}/product/photo/${product._id}`}
        alt={`${product.name}`}
      />
      <div>
        <div>{product.name}</div>
        <span>&#2547;</span>
        {product.price}
        <p>
          {product.quantity ? (
            <span class="badge badge-pill badge-primary">In Stock</span>
          ) : (
            <span class="badge badge-pill badge-danger">Out of Stock</span>
          )}
        </p>
        <Link to={`/product/${product._id}`} state={product}>
          <button className="btn btn-outline-warning btn-sm">
            View Product
          </button>
        </Link>
        {product.quantity ? (
          <>
            &nbsp;
            <button className="btn btn-outline-primary btn-sm">
              Add to Cart
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
