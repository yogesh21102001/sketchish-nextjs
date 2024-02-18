import React from 'react'
import Style from "./style.module.css"
import CommonStyles from "../../../../style/commonStyle.module.css";

export const HeroMessage = ({header, message, color}) => {
  return (
    <div className={Style.hero_message_cont}>
      <h3 style={{ color: color?.header }}>{header}</h3>
      <p style={{ color: color?.message }}>{message}</p>
      {/* <div className={`${Style.text}`}>
      </div> */}
    </div>
  );
}