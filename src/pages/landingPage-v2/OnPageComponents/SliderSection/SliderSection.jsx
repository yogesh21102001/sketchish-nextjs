import React, { useEffect, useState, useMemo } from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";
import { HeaderText } from "../Header/HeaderText";
import { Button } from "../../../../ui";

import { useNavigate } from "react-router-dom";

// Assets
import {
  BestMatch,
  BucketIt,
  Customise,
  SliderGradient,
} from "../../assets/images";

// Hooks
import { useRef } from "react";

const SliderSection = ({ setIsLoginOpen, isAuthenticated }) => {
  // hooks
  const windowWidth = useRef(window.innerWidth);

  const navigate = useNavigate();

  const DATA = [
    {
      id: 1,
      header: "Best Match",
      image: BestMatch,
      description:
        "Do the best match our icon collection with your brand color.",
    },
    {
      id: 2,
      header: "Customise",
      image: Customise,
      description:
        "Change the colour, stroke weight, icon size, and animate it.",
    },
    {
      id: 3,
      header: "Bucket it",
      image: BucketIt,
      description:
        "Add your favourite icons to bucket and use wherever you want.",
    },
  ];

  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lastIndex = DATA.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 4000);
    return () => clearInterval(slider);
  }, [index]);

  useEffect(() => {
    const itemAtIndex = DATA.filter((item, i) => i === index);
    if (itemAtIndex.length > 0) {
      setDescription(itemAtIndex[0]?.description);
    }
  }, [index]);

  return (
    <div className={Styles.slider_cont}>
      <SliderGradient className={Styles.gradient} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className={Styles.hero_message_cont}>
          <HeaderText
            heading={"Icon tool that do work professionally"}
            message={
              "We've got the right set of tool that work great to deliver projects faster and better."
            }
          />
        </div>
        <div>
          <div className={`${Styles.slider_header}`}>
            <div className={Styles.slide_tabs_cont}>
              {DATA.map((item, i) => (
                <div
                  onClick={() => {
                    setIndex(i);
                    setDescription(item.description);
                  }}
                  className={`${Styles.slide_tabs} ${
                    index == i ? Styles.slide_tabs_active : ""
                  }`}
                >
                  <h5>{item.header}</h5>
                  {windowWidth.current > 600 ? <p>{item.description}</p> : ""}
                  {/* <div className={Styles.progress_bar_cont}>
                <div
                  className={Styles.progress_bar}
                  style={{ width: `30%` }}
                ></div>
              </div> */}
                </div>
              ))}
            </div>
          </div>
          <div className={CommonStyles.body_padding}>
            {windowWidth.current <= 600 ? (
              <p className={Styles.slider_desc_mobile}>{description}</p>
            ) : (
              ""
            )}
            <div className={Styles.section_center}>
              {DATA.map((item, personIndex) => {
                let position = Styles.nextSlide;
                if (personIndex === index) {
                  position = Styles.activeSlide;
                }
                if (
                  personIndex === index - 1 ||
                  (index === 0 && personIndex === DATA.length - 1)
                ) {
                  position = Styles.lastSlide;
                }
                return (
                  <article key={item.id} className={position}>
                    <item.image />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${CommonStyles.btn_cont} ${Styles.btn_wraper}`}>
          <div className={CommonStyles.lft_btn_cont}>
            <Button
              onClick={() => navigate("/style-set")}
              className={`${Styles.lft_btn}`}
              shadow={"0px 6px 30px rgba(115, 56, 250, 0.50)"}
            >
              Explore 20+ Consistent Styles{" "}
            </Button>
          </div>
          <div className={CommonStyles.lft_btn_cont}>
            {isAuthenticated() ? (
              <Button
                onClick={() => navigate("/icons")}
                className={` ${Styles.rgt_btn}`}
                shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
              >
                View All Style Set{" "}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  className={`${Styles.rgt_btn}`}
                  shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
                >
                  Claim Free Trial for 1 Month{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g filter="url(#filter0_dif_12818_4680)">
                      <path
                        d="M15 4L17.7009 11.2991L25 14L17.7009 16.7009L15 24L12.2991 16.7009L5 14L12.2991 11.2991L15 4Z"
                        fill="url(#paint0_linear_12818_4680)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dif_12818_4680"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.996078 0 0 0 0 0.815686 0 0 0 0 0.0980392 0 0 0 0.4 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_12818_4680"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_12818_4680"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.992157 0 0 0 0 0.819608 0 0 0 0 0.121569 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect2_innerShadow_12818_4680"
                        />
                        <feGaussianBlur
                          stdDeviation="0.25"
                          result="effect3_foregroundBlur_12818_4680"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_12818_4680"
                        x1="25"
                        y1="4"
                        x2="6.54271"
                        y2="25.3346"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.00428621" stop-color="#EAFF00" />
                        <stop offset="1" stop-color="#FFCF88" />
                      </linearGradient>
                    </defs>
                  </svg>
                </Button>
                <p>No credit card</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
