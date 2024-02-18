import React from 'react'
import Styles from "./style.module.css"

import { SolidFilterIcon } from "../../assets/icons/index";

export const FilterOptions = ({
  checkbox,
  icon,
  lable,
  count,
  onClick,
  active,
  disable,
  IconComp,
}) => {
  return (
    <div
      className={`${Styles.filter_option} ${active ? Styles.active : ""} ${
        disable ? Styles.disable : ""
      }`}
      onClick={onClick}
    >
      <div className={Styles.left}>
        {checkbox && <input type="checkbox" />}
        {IconComp && <IconComp />}
        {icon && <img className={Styles.icon_img} src={icon} alt="" />}
        <p>{lable ? lable : "Filter Name"}</p>
      </div>
      {count && <span>{count}</span>}
    </div>
  );
};