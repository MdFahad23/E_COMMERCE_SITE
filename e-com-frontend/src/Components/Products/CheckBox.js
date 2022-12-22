import React, { useState } from "react";

const CheckBox = ({ category, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  let checkedIds = [...checked];

  const handelToggle = (id) => () => {
    let foundId = checked.indexOf(id);
    if (foundId === -1) {
      checkedIds.push(id);
    } else {
      checkedIds.splice(foundId, 1);
    }
    setChecked(checkedIds);
    handleFilters(checkedIds);
  };

  return category.map((item) => (
    <>
      <div>
        <li key={item._id}>
          <input
            type="checkbox"
            onChange={handelToggle(item._id)}
            value={checked.indexOf(item._id === -1)}
            className="cursor-pointer mr-2"
          />
          <label htmlFor="category">{item.name}</label>
        </li>
      </div>
    </>
  ));
};

export default CheckBox;
