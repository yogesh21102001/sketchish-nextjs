import React from "react";
import Styles from "./style.module.css";

// Assets
import {
  RightArrow
} from "../../assets/icons";

// hooks
import { useNavigate } from "react-router";

export const StylesSection = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.style_section_cont}>
      <div
        className={Styles.style_card}
        onClick={() => navigate(data?.navigate.location)}
      >
        {data?.style_icon ? (
          <data.style_icon className={Styles.style_icon_svg} />
        ) : (
          ""
        )}
        <div className={Styles.txt}>
          <h3>{data?.title}</h3>
          <p>{data?.text}</p>
        </div>
        <div className={Styles.action}>
          <p>
            {data?.navigate.title}
            <span className={Styles.badg}>{data?.navigate.tag}</span>
          </p>
          <RightArrow />
        </div>
      </div>
      {data?.icon_styles.map((item, index) => (
        <div
          key={index}
          className={Styles.style_card}
          onClick={() => navigate(item?.navigate)}
        >
          <item.style_image className={Styles.style_image} />
          <div className={Styles.action}>
            <p>{item?.style}</p>
            {item?.navigate ? <RightArrow className={Styles.arrow_icon} /> : <p>Soon!</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
