import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../Layout";
import {
  getCartItem,
  updateCartItem,
  delateCartItem,
} from "../../api/apiOrder";
import { userInfo } from "../../util/auth";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadItem = () => {
    getCartItem(userInfo().jwt)
      .then((response) => setCartItems(response.data))
      .catch((err) => {});
  };

  useEffect(() => {
    loadItem();
  }, []);

  const increaseItem = (item) => () => {
    if (item.count === 5) return;
    const cartItem = {
      ...item,
      count: item.count + 1,
    };
    updateCartItem(userInfo().jwt, cartItem)
      .then((res) => loadItem())
      .catch((err) => {});
  };

  const decreaseItem = (item) => () => {
    if (item.count === 1) return;
    const cartItem = {
      ...item,
      count: item.count - 1,
    };
    updateCartItem(userInfo().jwt, cartItem)
      .then((res) => loadItem())
      .catch((err) => {});
  };

  const totalAmount = () => {
    const arr = cartItems.map((item) => item.price * item.count);
    const sum = arr.reduce((a, b) => a + b, 0);
    return sum;
  };

  const removeCartItem = (item) => () => {
    if (!window.confirm("Delete Item?")) return;
    delateCartItem(userInfo().jwt, item)
      .then((res) => loadItem())
      .catch((err) => {});
  };

  return (
    <Layout title="Your Cart" description="Hurry up! Place your order!">
      <div className="containers">
        <div className="mt-16">
          <table className=" border border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-[15%] border ">
                  #
                </th>
                <th scope="col" className=" border">
                  Image
                </th>
                <th scope="col" className=" border">
                  Product Name
                </th>
                <th scope="col" className=" border">
                  Quantity
                </th>
                <th scope="col" className=" border">
                  Price
                </th>
                <th scope="col" className=" border">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <CartItem
                  key={item._id}
                  item={item}
                  serial={i + 1}
                  increaseItem={increaseItem(item)}
                  decreaseItem={decreaseItem(item)}
                  removeCartItem={removeCartItem(item)}
                />
              ))}
              <tr>
                <th scope="row" />
                <td>total</td>
                <td>&#2547;{totalAmount()}</td>
              </tr>
              <tr>
                <th scope="row" />
                <td className="text-right">
                  <Link to="/">
                    <button>Continue Shopping</button>
                  </Link>
                  <Link to="/shipping">Proceed To Checkout</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
