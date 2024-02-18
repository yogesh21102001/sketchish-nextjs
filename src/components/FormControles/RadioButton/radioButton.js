import React from "react";

export const RadioButton = ({
  id,
  name,
  onChange,
  onClick,
  value,
  checked,
  defaultChecked,
}) => {
  return (
    // <div>
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      onClick={onClick}
      onChange={onChange}
      checked={checked}
      defaultChecked={defaultChecked}
    />
    // </div>
  );
};
