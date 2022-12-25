import axios from "axios";
import { API } from "../util/config";

export const addToCart = (token, cartItem) => {
  return axios.post(`${API}/cart`, cartItem, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartItem = (token) => {
  return axios.get(`${API}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartItem = (token, cartItem) => {
  return axios.put(`${API}/cart`, cartItem, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const delateCartItem = (token, cartItem) => {
  return axios.delete(`${API}/cart/${cartItem._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
