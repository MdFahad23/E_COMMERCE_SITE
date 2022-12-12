import axios from "axios";
import { API } from "../util/config";

export const register = (user) => {
  return axios.post(`${API}/user/signUp`, user, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
};

export const login = (user) => {
  return axios.post(`${API}/user/signIn`, user, {
    headers: {
      "Content-Type": "Application/json",
    },
  });
};
