import React from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";
import { Button } from "../../../../ui";

import {
  MeshGradient,
  PatternLft,
  PatternRgt,
  StripOne,
  StripFive,
  StripFour,
  StripThree,
  StripTwo,
} from "../../assets/images";

import { useNavigate } from "react-router-dom";

const MainLandingSection = ({ setIsLoginOpen, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.main_landing_sec_wraper}>
      <div className={Styles.main_landing_sec}>
        <div className={Styles.lft}>
          <PatternLft />
        </div>
        <div className={Styles.mid}>
          <div className={Styles.item_wraper}>
            <div className={Styles.text_cont}>
              <h1>The only icon system you've ever want</h1>
              <p>
                90,000+ icons, 20+ unique styles, 7+ animated style, animated
                svg, and much more.
              </p>
            </div>
            <div className={CommonStyles.btn_cont}>
              <div className={CommonStyles.lft_btn_cont}>
                <Button
                  onClick={() => {
                    window.open(
                      "https://www.figma.com/file/YbnzkXFcvZhRCAGqCKmetH/Openstrokeicons-Preview?type=design&node-id=180%3A18789&mode=design&t=dUn8vlC3ksmFUOpx-1"
                    );
                  }}
                  className={`${Styles.figma_btn}`}
                >
                  Preview All Icons{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 9.99996C10 9.1159 10.3512 8.26806 10.9763 7.64294C11.6014 7.01782 12.4493 6.66663 13.3333 6.66663C14.2174 6.66663 15.0652 7.01782 15.6904 7.64294C16.3155 8.26806 16.6667 9.1159 16.6667 9.99996C16.6667 10.884 16.3155 11.7319 15.6904 12.357C15.0652 12.9821 14.2174 13.3333 13.3333 13.3333C12.4493 13.3333 11.6014 12.9821 10.9763 12.357C10.3512 11.7319 10 10.884 10 9.99996Z"
                      fill="#1ABCFE"
                    />
                    <path
                      d="M3.3335 16.6667C3.3335 15.7827 3.68469 14.9348 4.30981 14.3097C4.93493 13.6846 5.78277 13.3334 6.66683 13.3334H10.0002V16.6667C10.0002 17.5508 9.64897 18.3986 9.02385 19.0237C8.39873 19.6489 7.55088 20 6.66683 20C5.78277 20 4.93493 19.6489 4.30981 19.0237C3.68469 18.3986 3.3335 17.5508 3.3335 16.6667H3.3335Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M10 0V6.66667H13.3333C14.2174 6.66667 15.0652 6.31548 15.6904 5.69036C16.3155 5.06523 16.6667 4.21739 16.6667 3.33333C16.6667 2.44928 16.3155 1.60143 15.6904 0.976311C15.0652 0.351189 14.2174 0 13.3333 0L10 0Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M3.3335 3.33333C3.3335 4.21739 3.68469 5.06523 4.30981 5.69036C4.93493 6.31548 5.78277 6.66667 6.66683 6.66667H10.0002V0H6.66683C5.78277 0 4.93493 0.351189 4.30981 0.976311C3.68469 1.60143 3.3335 2.44928 3.3335 3.33333H3.3335Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M3.3335 9.99996C3.3335 10.884 3.68469 11.7319 4.30981 12.357C4.93493 12.9821 5.78277 13.3333 6.66683 13.3333H10.0002V6.66663H6.66683C5.78277 6.66663 4.93493 7.01782 4.30981 7.64294C3.68469 8.26806 3.3335 9.1159 3.3335 9.99996H3.3335Z"
                      fill="#A259FF"
                    />
                  </svg>
                </Button>
                <p>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M14.2142 3.61768C13.3482 2.62363 12.278 2.2586 11.2076 2.34584C10.2423 2.42451 9.2959 2.86813 8.50017 3.50651C7.70443 2.86813 6.75807 2.42452 5.79276 2.34584C4.72235 2.2586 3.65209 2.62363 2.7861 3.61768C1.38605 5.22477 1.54798 7.66721 3.14838 9.07373L8.28012 13.5837C8.40597 13.6943 8.59436 13.6943 8.72021 13.5837L13.8519 9.07373C15.4524 7.66721 15.6143 5.22477 14.2142 3.61768Z"
                      fill="#FF3624"
                    />
                  </svg>
                  Like us on Figma
                </p>
              </div>
              <div className={CommonStyles.lft_btn_cont}>
                {isAuthenticated() ? (
                  <Button
                    onClick={() => navigate("/icons")}
                    className={` ${Styles.plane_btn}`}
                    shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
                  >
                    View All Style Set{" "}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setIsLoginOpen(true)}
                      className={` ${Styles.plane_btn}`}
                      shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
                    >
                      Try Free for 1 Month{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <g filter="url(#filter0_dif_12818_4678)">
                          <path
                            d="M15 4L17.7009 11.2991L25 14L17.7009 16.7009L15 24L12.2991 16.7009L5 14L12.2991 11.2991L15 4Z"
                            fill="url(#paint0_linear_12818_4678)"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_dif_12818_4678"
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
                              result="effect1_dropShadow_12818_4678"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_12818_4678"
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
                              result="effect2_innerShadow_12818_4678"
                            />
                            <feGaussianBlur
                              stdDeviation="0.25"
                              result="effect3_foregroundBlur_12818_4678"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_12818_4678"
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
          <div className={Styles.floating_elem}>
            <div className={Styles.overlay}>
              <div className={Styles.overlay_gradients}></div>
              <div className={Styles.overlay_gradients}></div>
            </div>
            <div style={{ overflow: "hidden", width: "100%" }}>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "30px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripOne />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripOne />
                </div>
              </div>
              <div className={Styles.strip}>
                <div className={Styles.motion_div_to_lft}>
                  <StripTwo />
                </div>
                <div className={Styles.motion_div_to_lft}>
                  <StripTwo />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "60px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripThree />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripThree />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "30px",
                }}
              >
                <div className={Styles.motion_div_to_lft}>
                  <StripFour />
                </div>
                <div className={Styles.motion_div_to_lft}>
                  <StripFour />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "-30px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripFive />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripFive />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.rgt}>
          <PatternRgt />
        </div>
      </div>
      <Button
        onClick={() => navigate("/icons?style-set")}
        className={Styles.viwe_styles_btn}
      >
        View All Styles
      </Button>
    </div>
  );
};

export default MainLandingSection;