// import { Field } from "formik";
import React from "react";
import "./style.css";

export const ToggleSwitch = ({
  id,
  isOn,
  lable,
  iconPre,
  iconSuff,
  customStyle,
  styleName,
  onChange,
  options,
  disabled,
  changeColor = false,
}) => {
  let defaultClassName = "react-switch-checkbox";

  let className = customStyle
    ? customStyle
    : `${defaultClassName} ` + styleName || "";

  return (
    <div className="toggle-swtich">
      <input
        id={id}
        checked={isOn}
        onChange={onChange}
        className={className}
        options={options}
        disabled={disabled}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={id}
        style={{
          background: changeColor && !isOn ? "grey" : "#7238fa",
        }}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};
