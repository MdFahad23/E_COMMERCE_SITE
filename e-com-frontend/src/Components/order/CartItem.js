import React from "react";

import { API } from "../../util/config";

const CartItem = ({
  item,
  serial,
  increaseItem,
  decreaseItem,
  removeCartItem,
}) => {
  return (
    <tr>
      <th scope="row" className=" border">
        {serial}
      </th>
      <th className=" border justify-center">
        <img
          src={`${API}/product/photo/${item.product._id}`}
          alt={item.product.name}
          className=" w-8 h-8"
        />
      </th>
      <td className=" border">{item.product ? item.product.name : ""}</td>
      <td className=" border">
        <button onClick={decreaseItem}>-</button>
        {item.count}
        <button onClick={increaseItem}>+</button>
      </td>
      <td className=" border">৳ {item.price * item.count} </td>
      <td className=" border">
        <button onClick={removeCartItem}>Remove From Cart</button>
      </td>
    </tr>
  );
};

export default CartItem;
