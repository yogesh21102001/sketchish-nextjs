import React from "react";
import "./style.css";
import { motion } from "framer-motion";
export const Button = ({
  lable,
  customStyle,
  styleName,
  type = "button",
  iconPre,
  iconSuff,
  disabled,
  outlined = false,
  btnSize = "sm",
  onClick,
  defaultBlackText = false,
}) => {
  let defaultClassName = outlined ? "form-button-outlined" : "form-button";

  let className = customStyle
    ? customStyle
    : `${defaultClassName} ` + styleName || "";

  const size = {
    sm: "40px",
    md: "84px",
    hg: "94px",
    mlg: "145px",
    lg: "250px",
    full: "100%",
  };

  const style = {
    width: size[btnSize],
  };

  if (defaultBlackText && !disabled) style.color = "#000";

  const Button = (
    <motion.button
      className={className}
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {iconPre && <div className="svg-pre">{iconPre}</div>}
      <p className="btn-text">{lable}</p>
      {iconSuff && iconSuff}
    </motion.button>
  );

  return Button;
};
