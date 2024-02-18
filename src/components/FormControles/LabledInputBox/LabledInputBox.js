import "./style.css";
import React, { useState } from "react";
import { Field } from "formik";
import { Selectdrop } from "../../DropDown";
import { EyeSVG } from "../../../assets/svg";

export function LabledInputBox({
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
  noBorder = false,
  ...rest
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handelPasswordToggel = () => {
    if (isPasswordVisible) setPasswordVisible(false);
    else setPasswordVisible(true);
  };

  const size = {
    xsm: "120px",
    sm: "140px",
    md: "250px",
    lg: "300px",
    full: "100%",
  };

  const style = {};

  if (noBorder) {
    style.border = "none";
  }
  return (
    <div className="lib-main">
      <div className="lib-lbl-con">
        <span className="lib-lbl">{lable}</span>
      </div>
      <div className="lib-input-con" style={style}>
        {type === "select" ? (
          <Selectdrop
            placeholder={placeholder}
            defaultValue={defaultValue}
            options={options}
            selSize={inputSize}
            onChange={onChange}
            disabled={disabled}
            isClearable={isClearable}
            isCreatable={isCreatable}
          />
        ) : (
          <Field
            id={id}
            type={isPasswordVisible ? "text" : type}
            value={value}
            className={"lib-input-box"}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            style={{
              width: size[inputSize],
            }}
            {...rest}
          />
        )}

        {type === "password" ? (
          <EyeSVG className="eye-icon" onClick={handelPasswordToggel} />
        ) : (
          ""
        )}
        {icoSuf && <div className="lib-input-rit-ico">{icoSuf}</div>}
      </div>
    </div>
  );
}
