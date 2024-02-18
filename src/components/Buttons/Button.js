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
  iconMain,
  disabled,
  outlined = false,
  btnSize = "sm",
  onClick,
  defaultBlackText = false,
  fixHeight = false,
}) => {
  let defaultClassName = outlined ? "form-button-outlined" : "form-button";

  let className = customStyle
    ? customStyle
    : `${defaultClassName} ` + styleName || "";

  const size = {
    sm: "40px",
    md: "84px",
    hg: "94px",
    hug: "max-content",
    mlg: "145px",
    lg: "250px",
    full: "100%",
  };

  let style = {
    width: size[btnSize],
  };

  if (btnSize === "hug") {
    style = {
      width: size[btnSize],
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "11px",
      paddingBottom: "11px",
    };
  }

  if (fixHeight) style.height = "50px";

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
      {!iconMain && <p className="btn-text">{lable}</p>}
      {iconSuff && iconSuff}
      {iconMain && iconMain}
    </motion.button>
  );

  return Button;
};
