import React from "react";
import Styles from "./style.module.css";
// import { SmoothCorners } from "react-smooth-corners";

export const Button = ({
  children,
  style,
  onClick,
  className,
  disable,
  highlight = false,
  width,
  type,
  border,
  backgroundColor,
  textStyle,
  onKeyDown,
  shadow,
}) => {
  return (
      <button
        corners="30, 5"
        borderRadius="0.5rem"
        as="button"
        type={type}
        className={`${Styles.button} ${className} ${
          disable ? Styles.disable : ""
        } ${highlight ? Styles.highlight : ""} ${border ? Styles.border : ""}`}
        style={{
          width: width,
          ...style,
          backgroundColor: backgroundColor,
          textTransform: textStyle,
          filter: `drop-shadow(${shadow})`,
        }}
        onClick={() => {
          if (!disable && onClick) {
            onClick();
          }
        }}
        onKeyDown={onKeyDown}
      >
        {children}
      </button>
  );
};