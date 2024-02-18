import React from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../ui";

// Assets
import { FigmaPluginSvg, FigmaConnect } from "../../assets/images";

// Hooks
import { useRef } from "react";

const PluginSection = ({from}) => {
  // hooks
  const windowWidth = useRef(window.innerWidth);
  const navigate = useNavigate();

  return (
    <div
      className={`${Styles.wraper} ${from == "pluginSuccess" && Styles.fromPlugginSuccess}`}
    >
      <div className={Styles.plugin_cont}>
        <div className={Styles.lft}>
          {from != "pluginSuccess" && (
            <FigmaConnect className={Styles.figma_connect} />
          )}
          <div>
            <h2 className={Styles.heading}>
              {" "}
              {from != "pluginSuccess"
                ? "Plugin Built for Figma"
                : "Built to boost"}
            </h2>
            <p className={`${Styles.description} ${Styles.topDesc}`}>
              Instantly drag and drop our beautiful icon from Figma plugin to
              your design so keep you focused on your stunning creation.
            </p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
            >
              <g filter="url(#filter0_d_12757_24241)">
                <path
                  d="M15.7059 1L14.6471 8.10526L21 8.89474L8.02941 21L9.35294 13.8947L3 13.1053L15.7059 1Z"
                  fill="#FDF182"
                />
                <path
                  d="M14.5237 9.09763L18.7537 9.62329L9.56908 18.1952L10.336 14.0779L10.5306 13.0334L9.47626 12.9024L5.2181 12.3732L14.2877 3.73237L13.658 7.95787L13.507 8.97128L14.5237 9.09763Z"
                  stroke="url(#paint0_radial_12757_24241)"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_12757_24241"
                  x="0"
                  y="0"
                  width="24"
                  height="26"
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
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.992157 0 0 0 0 0.945098 0 0 0 0 0.509804 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_12757_24241"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_12757_24241"
                    result="shape"
                  />
                </filter>
                <radialGradient
                  id="paint0_radial_12757_24241"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(15.7059 0.999999) rotate(110.334) scale(21.3292 19.1692)"
                >
                  <stop offset="0.00428621" stop-color="#FFCC00" />
                  <stop offset="0.494987" stop-color="#FF9300" />
                  <stop offset="1" stop-color="#FF9300" stop-opacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <p className={Styles.description}>
              Download Figma plugin now to boost your productivity up to 70%.
            </p>
          </div>
          <div className={`${CommonStyles.btn_cont} ${Styles.btn_wraper}`}>
            {from != "pluginSuccess" && (
              <div className={CommonStyles.lft_btn_cont}>
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos"
                    )
                  }
                  className={`${CommonStyles.btn}  ${Styles.lft_btn}`}
                >
                  Download Figma Plugin{" "}
                </Button>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.7142 3.6178C12.8482 2.62375 11.778 2.25872 10.7076 2.34596C9.74226 2.42464 8.7959 2.86825 8.00017 3.50664C7.20443 2.86826 6.25807 2.42464 5.29276 2.34596C4.22235 2.25872 3.15209 2.62375 2.2861 3.6178C0.886055 5.22489 1.04798 7.66734 2.64838 9.07385L7.78012 13.5839C7.90597 13.6945 8.09436 13.6945 8.22021 13.5839L13.3519 9.07385C14.9524 7.66734 15.1143 5.22489 13.7142 3.6178Z"
                      fill="#FF3624"
                    />
                  </svg>{" "}
                  Like us on Figma
                </p>
              </div>
            )}

            <div className={CommonStyles.lft_btn_cont}>
              <Button
                onClick={() =>
                  window.open(
                    "https://www.figma.com/file/YbnzkXFcvZhRCAGqCKmetH/Openstrokeicons-Preview?type=design&node-id=180%3A18789&mode=design&t=dUn8vlC3ksmFUOpx-1"
                  )
                }
                className={`${Styles.rgt_btn}`}
              >
                Preview 90,000+ Icons{" "}
              </Button>
            </div>
          </div>
        </div>
        <div className={Styles.rgt}>
          <FigmaPluginSvg />
        </div>
      </div>
    </div>
  );
};

export default PluginSection;