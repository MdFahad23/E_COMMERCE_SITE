import { API } from "../util/config";
import axios from "axios";

export const getProducts = (sortBy, order, limit) => {
  return axios.get(
    `${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}`
  );
};

export const getProductId = (id) => {
  return axios.get(`${API}/product/${id}`);
};

export const getCategory = () => {
  return axios.get(`${API}/category`);
};

export const getFilteredProduct = (order, sortBy, limit, skip, filter = {}) => {
  const data = {
    order: order,
    sortBy: sortBy,
    limit: limit,
    skip: skip,
    filter: { ...filter },
  };

  return axios.post(`${API}/product/filter`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
