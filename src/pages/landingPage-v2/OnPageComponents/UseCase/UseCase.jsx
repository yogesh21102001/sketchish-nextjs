import React from "react";
import Style from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";
import { Button } from "../../../../ui";
import { useNavigate } from "react-router-dom";

// Assets
import {
  DropdownUseCase,
  FormUseCase,
  PlayerUseCase,
  IconVarientUseCase,
  MenuCollapsedUseCase,
  MobileAppMenuBarUseCase,
  RichTextEditorUseCase,
  WebAppListUseCase,
  WebAppSideBar,
} from "../../assets/images";

// Component
import { HeroMessage } from "../Heromessage/HeroMessage";
import { HeaderText } from "../Header/HeaderText";

const UseCase = ({ setIsLoginOpen, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className={Style.usecase_cont}>
      <HeaderText
        heading={
          "Consistent & beautiful icon styles in use for website, mobile app, web app and widget"
        }
        message={
          "Use our 90,000+ icons beautiful trendy icons and 20+ unique styles to design digital interface like web, and mobile app, widget etc."
        }
        style={{ marginBottom: "5.13rem" }}
      />
      <div className={`${Style.useCase_svg_cont} ${CommonStyles.body_padding}`}>
        <div className={` ${Style.svg_cont}`}>
          <WebAppSideBar />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <WebAppListUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <RichTextEditorUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <DropdownUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <MenuCollapsedUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <MobileAppMenuBarUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <FormUseCase />
        </div>
        <div className={` ${Style.svg_cont}`}>
          <IconVarientUseCase />
        </div>
        <div className={`${Style.apple_watch_cont} ${Style.svg_cont}`}></div>
      </div>
      <div className={`${CommonStyles.btn_cont} ${Style.btn_wraper}`}>
        <div className={CommonStyles.lft_btn_cont}>
          <Button
            onClick={() => navigate("/icons")}
            className={`${Style.lft_btn}`}
            shadow={"0px 6px 30px rgba(115, 56, 250, 0.50)"}
          >
            Explore 90,000+ Icons{" "}
          </Button>
        </div>
        <div className={`${CommonStyles.lft_btn_cont}`}>
          {isAuthenticated() ? (
            <Button
              onClick={() => navigate("/icons")}
              className={` ${Style.rgt_btn}`}
              shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
            >
              View All Style Set{" "}
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setIsLoginOpen(true)}
                className={`${Style.rgt_btn}`}
                shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
              >
                Unlock Pro Plan For Free{" "}
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
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
  );
};

export default UseCase;
