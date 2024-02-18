import React from 'react'
import Styles from "./styles.module.css"

export const HeaderText = ({
  heading,
  message,
  style,
  tag,
  headingFont,
  headingMargin,
  headingColor,
  messageColor
}) => {
  return (
    <div className={Styles.wraper} style={{ margin: headingMargin }}>
      <div className={Styles.text_cont} style={{ ...style }}>
        <h2 style={{ fontSize: headingFont, color: headingColor }}>
          {heading} {tag && <span className={Styles.tag}>Soon</span>}
        </h2>
        <p style={{color: messageColor }}>{message}</p>
      </div>
    </div>
  );
};
