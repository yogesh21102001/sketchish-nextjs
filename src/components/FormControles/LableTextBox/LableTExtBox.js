import React from "react";
import "./style.css";

export function LabelTextBox({
  id,
  type,
  lable,
  value,
  options,
  inputSize = "full",
  onChange,
  disabled,
  icoSuf,
  isMulti = false,
  isClearable = false,
  isCreatable = false,
  defaultValue,
  placeholder,
  ...rest
}) {
  const size = {
    xsm: "120px",
    sm: "140px",
    md: "250px",
    lg: "300px",
    full: "100%",
  };

  return (
    <div className="lib-main">
      <div className="lib-lbl-con">
        <span className="lib-lbl">{lable}</span>
      </div>
      <div className="lib-input-con">
        <textarea
          rows={4}
          id={id}
          type={type}
          value={value}
          className={"text-input-box"}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          style={{
            width: size[inputSize],
          }}
          {...rest}
        />
        {icoSuf && <div className="lib-input-rit-ico">{icoSuf}</div>}
      </div>
    </div>
  );
}
