import React, { useState, useEffect } from "react";

// Styles
import Styles from "./style.module.css";
import CommonStyle from "../../../../style/commonStyle.module.css";

// Assets
import {
  StyleStroke,
  IconStyleOne,
  IconStyleFour,
  IconStyleSeven,
  IconStyleTwo,
  IconStyleThree,
  IconStyleFive,
  IconStyleSix,
  IconStyleEight,
  IconStyleNine,
} from "../../assets/images";
import { RightArrow } from "../../assets/icons";

// Hooks
import { useNavigate } from "react-router-dom";

export const StyleSection = () => {
  // Hooks
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const DATA = [
    {
      icons_name: "interface essential icons",
      icon_type: "Classic / stANDARD",
      image: IconStyleOne,
      navigate: `/icons?t=Classic&s=standard`,
    },
    {
      icons_name: "design ICONS",
      icon_type: "Classic / Solid",
      image: IconStyleTwo,
      navigate: `/icons?t=Classic&s=solid`,
    },
    {
      icons_name: "photo videos icons",
      icon_type: "sharp / duotone",
      image: IconStyleThree,
      navigate: `/icons?t=Sharp&s=duotone`,
    },
    {
      icons_name: "music-media-playback icons",
      icon_type: "sharp / standard",
      image: IconStyleFour,
      navigate: `/icons?t=Sharp&s=standard`,
    },
    {
      icons_name: "sports-fitness icons",
      icon_type: "sharp / solid",
      image: IconStyleFive,
      navigate: `/icons?t=Sharp&s=solid`,
    },
    {
      icons_name: "food-beverage",
      icon_type: "sharp / duotone",
      image: IconStyleSix,
      navigate: `/icons?t=Sharp&s=duotone`,
    },
    {
      icons_name: "maps location icons",
      icon_type: "Classic / stANDARD",
      image: IconStyleSeven,
      navigate: `/icons?t=Classic&s=standard`,
    },
    {
      icons_name: "e-commerce icons",
      icon_type: "classic / solid",
      image: IconStyleEight,
      navigate: `/icons?t=Classic&s=solid`,
    },
    {
      icons_name: "household ICONS",
      icon_type: "Classic / duotone",
      image: IconStyleNine,
      navigate: `/icons?t=Classic&s=duotone`,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % DATA.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={Styles.style_section_cont}>
      {/* <div className="slide-container">
        <div className="slider">
          {data.slice(currentIndex, currentIndex + itemsToShow).map((item) => (
            <div key={item.id} className="slide">
              {item.name}
            </div>
          ))}
        </div>
      </div> */}
      <div className={Styles.main_item}>
        <StyleStroke className={Styles.style_stroke} />
        <div className={Styles.style_card_cont}>
          {DATA.slice(currentIndex, currentIndex + itemsToShow).map((item) => (
            <div
              className={Styles.style_card}
              onClick={() => navigate(item.navigate)}
            >
              <item.image className={Styles.style_svg_image} />
              <div className={Styles.action}>
                <p>
                  {item.icons_name} <br /> {item.icon_type}
                </p>
                <RightArrow />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          navigate(`/icons?t=Classic&s=standard`);
        }}
        className={CommonStyle.btn_style}
        style={{ backgroundColor: "#36DC5E" }}
      >
        Explore Styles <RightArrow />
      </button>
    </div>
  );
};
