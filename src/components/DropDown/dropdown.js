import "./style.css";
import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export const Selectdrop = ({
  customStyle,
  styleName,
  options,
  onChange,
  selSize = "sm",
  disabled,
  isMulti = false,
  placeholder,
  defaultValue,
  isClearable,
  isCreatable = false,
}) => {
  let defaultClassName = "form-select";

  let className = customStyle
    ? customStyle
    : `${defaultClassName} ` + styleName || "";

  const size = {
    xsm: "120px",
    sm: "140px",
    md: "250px",
    lg: "300px",
    full: "100%",
  };
  const style = {
    control: base => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      width: size[selSize],
      zIndex: 2,
    })
  };

  return (
    <>
      {isCreatable ? (
        <CreatableSelect
          defaultValue={defaultValue}
          className={className + ` ${selSize}`}
          onChange={onChange}
          options={options}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder ? placeholder : "select."}
          isClearable={isClearable}
          style={{
            width: size[selSize],
            zIndex: 2,
          }}
        />
      ) : (
        <Select
          className={className + ` ${selSize}`}
          onChange={onChange}
          options={options}
          isDisabled={disabled}
          placeholder={placeholder ? placeholder : "select."}
          defaultValue={defaultValue}
            style={style}
        />
      )}
    </>
  );
};
