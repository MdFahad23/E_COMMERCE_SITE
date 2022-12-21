import React, { useEffect, useState } from "react";

import Layout from "../Components/Layout";
import { getProducts } from "../api/apiProduct";
import { showSuccess, showError } from "../util/messages";
import Card from "../Components/Products/Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    sortBy: "name",
    order: "desc",
    limit: 30,
    error: false,
    success: false,
  });

  const { sortBy, order, limit, error, success } = values;

  useEffect(() => {
    getProducts(sortBy, order, limit)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        setValues({ ...values, error: "Failed to load Product!" })
      );
  }, []);

  return (
    <Layout title="Home Page">
      <div className="containers">
        <div>
          {showError(error, error)}
          {showSuccess(success, "Added to Cart Successfully!")}
        </div>
        <div className="grid grid-cols-12 mt-14">
          {products &&
            products.map((product) => (
              <Card product={product} key={product._id} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
