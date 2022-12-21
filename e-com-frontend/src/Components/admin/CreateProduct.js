import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";
import { showSuccess, showError, showLoading } from "../../util/messages";
import { createProduct, getCategory } from "../../api/adminApi";
import { userInfo } from "../../util/auth";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    loading: false,
    error: false,
    success: false,
    disabled: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    success,
    disabled,
    formData,
  } = values;

  useEffect(() => {
    getCategory()
      .then((response) => {
        setValues({
          ...values,
          categories: response.data,
          formData: new FormData(),
        });
      })
      .catch((error) => {
        setValues({
          ...values,
          error: "Failed to load categories!",
          formData: new FormData(),
        });
      });
  }, []);

  const handleChange = (e) => {
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({
      ...values,
      [e.target.name]: value,
      error: false,
      success: false,
    });
    console.log(...formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      disabled: true,
      success: false,
    });
    const { jwt } = userInfo();
    createProduct(jwt, formData)
      .then((response) => {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          loading: false,
          disabled: false,
          success: true,
          error: false,
        });
      })
      .catch((error) => {
        let errMsg = "Something went wrong!";
        if (error.response) errMsg = error.response.data;
        setValues({
          ...values,
          error: errMsg,
          loading: false,
          success: false,
          disabled: false,
        });
      });
  };

  const productForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="flex font-serif font-semibold pb-2">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
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
      <div>
        <label
          htmlFor="description"
          className="flex font-serif font-semibold pb-2"
        >
          Description:
        </label>
        <textarea
          className="w-[100%]"
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="flex font-serif font-semibold pb-2">
          Price:
        </label>
        <input
          className="w-[100%]"
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="flex font-serif font-semibold pb-2"
        >
          Quantity:
        </label>
        <input
          className="w-[100%]"
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="flex font-serif font-semibold pb-2"
        >
          Category
        </label>
        <select
          className="w-[100%]"
          name="category"
          value={category}
          onChange={handleChange}
          required
        >
          <option value="">----Select Category----</option>
          {categories &&
            categories.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="bg-[#1fc5db] px-8 py-2 text-2xl font-sans font-semibold inline-block rounded-xl my-7"
      >
        Create Product
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
    <Layout title="Add a new product" className="bg-slate-400 py-6">
      <div className="containers">
        {showSuccess(success, "Product Add Successfully!")}
        {showError(error, error)}
        {showLoading(loading)}
        <div className="mt-5">
          {productForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
