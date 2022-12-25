import React, { useEffect, useState } from "react";

import Layout from "../Components/Layout";
import {
  getProducts,
  getCategory,
  getFilteredProduct,
} from "../api/apiProduct";
import { showSuccess, showError } from "../util/messages";
import Card from "../Components/Products/Card";
import CheckBox from "../Components/Products/CheckBox";
import RadioBox from "../Components/Products/RadioBox";
import { prices } from "../util/price";
import { isAuthentication, userInfo } from "../util/auth";
import { addToCart } from "../api/CartApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [values, setValues] = useState({
    sortBy: "name",
    order: "desc",
    limit: 30,
    skip: 0,
    error: false,
    success: false,
  });
  const [filters, setFilters] = useState({
    price: [],
    category: [],
  });

  const { sortBy, skip, order, limit, error, success } = values;

  useEffect(() => {
    getProducts(sortBy, order, limit)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        setValues({ ...values, error: "Failed to load Product!" })
      );
    getCategory()
      .then((res) => setCategory(res.data))
      .catch((err) =>
        setValues({ ...values, error: "Failed to load Category!" })
      );
  }, []);

  const handleFilters = (myFilters, filterBy) => {
    const newFilters = { ...filters };
    if (filterBy === "category") {
      newFilters[filterBy] = myFilters;
    } else if (filterBy === "price") {
      const data = prices;
      let arr = [];
      for (let i in data) {
        if (data[i].id === parseInt(myFilters)) {
          arr = data[i].arr;
        }
      }
      newFilters[filterBy] = arr;
    }

    setFilters(newFilters);
    getFilteredProduct(order, sortBy, limit, skip, newFilters)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        setValues({ ...values, error: "Failed to load Product!" })
      );
  };

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
    <Layout title="Home Page">
      <div className="containers">
        <div>
          {showError(error, error)}
          {showSuccess(success, "Added to Cart Successfully!")}
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <h5>Filter By Category:</h5>
            <ul>
              {
                <CheckBox
                  category={Category}
                  handleFilters={(myFilters) =>
                    handleFilters(myFilters, "category")
                  }
                />
              }
            </ul>
          </div>
          <div className="col-span-8">
            <h5>Filter By Price:</h5>
            <ul className="grid grid-cols-9">
              {
                <RadioBox
                  price={prices}
                  handleFilters={(myFilters) =>
                    handleFilters(myFilters, "price")
                  }
                />
              }
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-14">
          {products &&
            products.map((product) => (
              <Card
                product={product}
                key={product._id}
                handleAddToCart={handleAddToCart(product)}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
