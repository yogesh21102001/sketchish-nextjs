import React from 'react'
import Styles from "./style.module.css"
import { Button } from "../../ui";

import { Advance, Pro, Enterprise, FloatingTxt } from "./assets";

const PricingCards = ({ planName, discount, price, isMonthly, subClick, from }) => {
  return (
    <div className={Styles.wraper}>
      {planName == "pro" &&
        isMonthly &&
        from != "modal" && (<FloatingTxt className={Styles.floating_txt} />)}

      <div className={Styles.price_card}>
        <div className={Styles.top}>
          <div className={Styles.header}>
            <p className={Styles.plan_name}>
              {planName}{" "}
              {planName == "advance" && !isMonthly && (
                <span className={Styles.tag}>Best value</span>
              )}
            </p>
            {planName == "advance" && <Advance />}
            {planName == "pro" && <Pro />}
            {planName == "enterprise" && <Enterprise />}
          </div>
          <p className={Styles.benifits}>
            {planName == "pro" && (
              <>
                Access to all <br /> 90,000+ icons, 20 styles
              </>
            )}
            {planName == "advance" && (
              <>
                Access to all <br /> 90,000+ icons, 20 styles, plus Animated svg
              </>
            )}
            {planName == "enterprise" && (
              <>
                Access to all <br /> 90,000+ icons, 20 styles, Animated svg,
                plus dedicated support
              </>
            )}
          </p>
        </div>
        <div className={Styles.btm}>
          <div className={Styles.pricing_cont}>
            <div className={Styles.lft}>
              {planName == "enterprise" ? (
                <p>Contact us for pricing</p>
              ) : (
                <p>FROM</p>
              )}

              <div
                className={`${Styles.price_cont} ${
                  planName == "enterprise" && Styles.enterprise_plan
                }`}
              >
                <h3
                  className={`${
                    planName == "pro" && isMonthly && Styles.one_month_free
                  } ${
                    planName == "advance" && !isMonthly && Styles.one_month_free
                  }`}
                >
                  {planName == "basic" ? "Free" : <>${price}</>}
                </h3>
                {planName == "advance" && !isMonthly ? "" : <span>/mo.*</span>}
              </div>
            </div>
            {planName != "enterprise" && (
              <div className={Styles.lft}>
                {planName != "basic" && (
                  <p
                    style={{
                      color:
                        planName == "pro" && isMonthly ? "#7238FA" : "#1E3050",
                      textAlign: "right",
                    }}
                  >
                    {planName == "pro" && isMonthly ? (
                      "1 MONTH FREE TRIAL"
                    ) : (
                      <>
                        {" "}
                        USE <span>”SAVE40”</span>
                      </>
                    )}
                  </p>
                )}

                {planName == "advance" && !isMonthly && (
                  <div className={Styles.price_cont}>
                    <h3>$9</h3>
                    <span>/mo.*</span>
                  </div>
                )}
              </div>
            )}
          </div>
          {planName == "pro" && (
            <Button
              className={`${Styles.btn} ${Styles[planName]}`}
              onClick={() => subClick(planName)}
            >
              Unlock {planName}{" "}
              {planName == "pro" && isMonthly && "Plan For Free"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <g filter="url(#filter0_dif_12813_4265)">
                  <path
                    d="M13 4L15.1607 9.83927L21 12L15.1607 14.1607L13 20L10.8393 14.1607L5 12L10.8393 9.83927L13 4Z"
                    fill="url(#paint0_linear_12813_4265)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dif_12813_4265"
                    x="0"
                    y="0"
                    width="26"
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
                      result="effect1_dropShadow_12813_4265"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12813_4265"
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
                      result="effect2_innerShadow_12813_4265"
                    />
                    <feGaussianBlur
                      stdDeviation="0.25"
                      result="effect3_foregroundBlur_12813_4265"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_12813_4265"
                    x1="21"
                    y1="4"
                    x2="6.23416"
                    y2="21.0677"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.00428621" stop-color="#EAFF00" />
                    <stop offset="1" stop-color="#FFCF88" />
                  </linearGradient>
                </defs>
              </svg>
            </Button>
          )}

          {planName == "advance" && (
            <Button
              className={`${Styles.btn} ${Styles[planName]}`}
              onClick={() => subClick(planName)}
            >
              Unlock {planName}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
              >
                <g filter="url(#filter0_dif_12813_4505)">
                  <path
                    d="M13.5 6L15.6607 11.8393L21.5 14L15.6607 16.1607L13.5 22L11.3393 16.1607L5.5 14L11.3393 11.8393L13.5 6Z"
                    fill="url(#paint0_linear_12813_4505)"
                  />
                </g>
                <g filter="url(#filter1_dif_12813_4505)">
                  <path
                    d="M21.5 4L22.5804 6.91964L25.5 8L22.5804 9.08036L21.5 12L20.4196 9.08036L17.5 8L20.4196 6.91964L21.5 4Z"
                    fill="url(#paint1_linear_12813_4505)"
                  />
                </g>
                <g filter="url(#filter2_dif_12813_4505)">
                  <path
                    d="M21.5 16L22.5804 18.9196L25.5 20L22.5804 21.0804L21.5 24L20.4196 21.0804L17.5 20L20.4196 18.9196L21.5 16Z"
                    fill="url(#paint2_linear_12813_4505)"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dif_12813_4505"
                    x="0.5"
                    y="2"
                    width="26"
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
                      result="effect1_dropShadow_12813_4505"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12813_4505"
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
                      result="effect2_innerShadow_12813_4505"
                    />
                    <feGaussianBlur
                      stdDeviation="0.25"
                      result="effect3_foregroundBlur_12813_4505"
                    />
                  </filter>
                  <filter
                    id="filter1_dif_12813_4505"
                    x="12.5"
                    y="0"
                    width="18"
                    height="18"
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
                      result="effect1_dropShadow_12813_4505"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12813_4505"
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
                      result="effect2_innerShadow_12813_4505"
                    />
                    <feGaussianBlur
                      stdDeviation="0.25"
                      result="effect3_foregroundBlur_12813_4505"
                    />
                  </filter>
                  <filter
                    id="filter2_dif_12813_4505"
                    x="12.5"
                    y="12"
                    width="18"
                    height="18"
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
                      result="effect1_dropShadow_12813_4505"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_12813_4505"
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
                      result="effect2_innerShadow_12813_4505"
                    />
                    <feGaussianBlur
                      stdDeviation="0.25"
                      result="effect3_foregroundBlur_12813_4505"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_12813_4505"
                    x1="21.5"
                    y1="6"
                    x2="6.73416"
                    y2="23.0677"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.00428621" stop-color="#EAFF00" />
                    <stop offset="1" stop-color="#FFCF88" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_12813_4505"
                    x1="25.5"
                    y1="4"
                    x2="18.1171"
                    y2="12.5339"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.00428621" stop-color="#EAFF00" />
                    <stop offset="1" stop-color="#FFCF88" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_12813_4505"
                    x1="25.5"
                    y1="16"
                    x2="18.1171"
                    y2="24.5339"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.00428621" stop-color="#EAFF00" />
                    <stop offset="1" stop-color="#FFCF88" />
                  </linearGradient>
                </defs>
              </svg>
            </Button>
          )}
          {planName == "enterprise" && (
            <button
              className={`${Styles.btn} ${Styles[planName]}`}
              onClick={() => {}}
            >
              Say Hello 👋
            </button>
          )}

          {planName == "pro" && isMonthly && (
            <p className={Styles.btm_txt}>No credit card</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingCards