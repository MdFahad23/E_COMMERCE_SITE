import React from "react";

const RadioBox = ({ price, handleFilters }) => {
  const handelChange = (e) => {
    handleFilters(e.target.value);
  };

  return price.map((item) => (
    <div className="col-span-3">
      <li key={item.id}>
        <input
          type="radio"
          name="price_filter"
          className="cursor-pointer"
          value={item.id}
          onChange={handelChange}
        />
        <label htmlFor="price">{item.name}</label>
      </li>
    </div>
  ));
};

export default RadioBox;
