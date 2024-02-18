import React from "react";
import { Button } from "../../ui";
import Styles from "./styles.module.css";

import { OS, OSFullLogo } from "./assets";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { isAuthenticated } from "../../utils/helpers";

const Footer = ({ setIsLoginOpen}) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.wraper}>
      <div className={Styles.floating_elem}>
        <OS className={Styles.os_logo} />
        <div className={Styles.rgt}>
          <div className={Styles.txt_cont}>
            <h3>One icon library to replace them all.</h3>
            <p>
              90,000+ icons, 20+ consistent styles, animated svg, only at
              openstrokeicons.
            </p>
          </div>
          <div className={Styles.btn_cont}>
            {isAuthenticated() ? (
              <Button
                onClick={() => navigate("/icons")}
                className={` ${Styles.btn}`}
                shadow={"0px 6px 30px rgba(165, 90, 243, 0.50)"}
              >
                View All Style Set{" "}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setIsLoginOpen(true)}
                  className={Styles.btn}
                >
                  Start 1 Month Free Trial{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g filter="url(#filter0_dif_13177_1927)">
                      <path
                        d="M15 4L17.7009 11.2991L25 14L17.7009 16.7009L15 24L12.2991 16.7009L5 14L12.2991 11.2991L15 4Z"
                        fill="url(#paint0_linear_13177_1927)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dif_13177_1927"
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
                          result="effect1_dropShadow_13177_1927"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_13177_1927"
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
                          result="effect2_innerShadow_13177_1927"
                        />
                        <feGaussianBlur
                          stdDeviation="0.25"
                          result="effect3_foregroundBlur_13177_1927"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_13177_1927"
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
      <div className={Styles.cont}>
        <div className={Styles.main_cont}>
          <div className={Styles.top}>
            <ul>
              <li>DOWNLOADS</li>
              <li>
                <Link
                  to={
                    "https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos"
                  }
                >
                  Figma plugin
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://openstrokeicons.com/icons?t=all&s=duotone&m=Free"
                  }
                >
                  Open-source icons
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://openstrokeicons.com/icons/arrow-circle-swipe-left?t=Sharp&s=Standard&an=draw"
                  }
                >
                  Animated icons
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://www.figma.com/community/file/1294343707050130585"
                  }
                >
                  Interface Essential Icons
                </Link>
              </li>
              <li>
                <Link to={"/"}>Vue.js -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>React -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>Angular -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>SCSS -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>Illustrations -soon!</Link>
              </li>
            </ul>
            <ul>
              <li>EXPLORE</li>
              <li>
                <Link
                  to={
                    "https://www.figma.com/file/YbnzkXFcvZhRCAGqCKmetH/Openstrokeicons-Preview?type=design&node-id=180%3A18789&mode=design&t=dUn8vlC3ksmFUOpx-1"
                  }
                >
                  Preview pro icons
                </Link>
              </li>
              <li>
                <Link to={"https://openstrokeicons.com/style-set"}>
                  20+ icon styles
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://openstrokeicons.com/icons/arrow-circle-swipe-left?t=Sharp&s=Standard&an=draw"
                  }
                >
                  7+ animated styles
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://openstrokeicons.com/icons/arrow-circle-swipe-left?t=Sharp&s=Standard"
                  }
                >
                  Copy hi-res png
                </Link>
              </li>
              <li>
                <Link
                  to={"https://openstrokeicons.com/icons?t=Classic&s=standard"}
                >
                  Bucket to collect icons
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://openstrokeicons.com/icons/your-videos?t=Classic&s=Standard"
                  }
                >
                  Advance icon editor
                </Link>
              </li>
              <li>
                <Link to={"/icons/dictionary"}>Dictionary</Link>
              </li>
            </ul>
            <ul>
              <li>RESOURCES</li>
              <li>
                <HashLink to="/pricing#faqs">FAQs</HashLink>
              </li>
              <li>
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>
                  Request icon
                </Link>
              </li>
              <li>
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>
                  Report icons
                </Link>
              </li>
              <li>
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>
                  Report bug
                </Link>
              </li>
              <li>
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>
                  Feature request
                </Link>
              </li>
              <li>
                <Link to={"https://discord.com/invite/QN3Zwf4KWK"}>
                  Discord community
                </Link>
              </li>
              <li>
                <Link to={"/contactus"}>Contact Us</Link>
              </li>
            </ul>
            <ul>
              <li>PRICING</li>
              <li>
                <Link to={"/pricing"}>Pro pricing</Link>
              </li>
              <li>
                <Link to={"/pricing"}>Advance pricing</Link>
              </li>
              <li>
                <Link to={"https://openstrokeicons.com/free-licence"}>
                  Free licence
                </Link>
              </li>
              <li>
                <Link to={"https://openstrokeicons.com/ "}>Features</Link>
              </li>
              <li>COMPARE</li>
              <li>
                <Link to={"/"}>vs Icons8 -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>vs Flaticons -soon!</Link>
              </li>
              <li>
                <Link to={"/"}>vs Thenounproject -soon!</Link>
              </li>
            </ul>
          </div>
          <div className={Styles.btm}>
            <div className={Styles.lft}>
              <OSFullLogo />
              <div className={Styles.terms_conditions_cont}>
                <span>©2023 Sketchish Designer, Llp.</span>
                <span>|</span>
                <span onClick={() => navigate("/privacypolicy")}>
                  Your privacy
                </span>
                <span>|</span>
                <span onClick={() => navigate("/termsandconditions")}>
                  Terms
                </span>
                <span>|</span>
                <span>
                  Secure payment with{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="11"
                    viewBox="0 0 29 11"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_13177_1984)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M28.0566 5.64233C28.0566 3.95444 27.0955 2.62259 25.2586 2.62259C23.414 2.62259 22.2979 3.95444 22.2979 5.62914C22.2979 7.61373 23.6155 8.61592 25.5066 8.61592C26.429 8.61592 27.1265 8.4379 27.6535 8.18735V6.86869C27.1265 7.09286 26.522 7.23132 25.7547 7.23132C25.0029 7.23132 24.3363 7.00715 24.2511 6.22914H28.0411C28.0411 6.14342 28.0566 5.80057 28.0566 5.64233ZM24.2278 5.01596C24.2278 4.27092 24.7626 3.96103 25.2509 3.96103C25.7237 3.96103 26.2274 4.27092 26.2274 5.01596H24.2278Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.3063 2.62259C18.5467 2.62259 18.0585 2.92588 17.7872 3.13687L17.6864 2.72808H15.9813V10.4159L17.919 10.0664L17.9267 8.20054C18.2057 8.37196 18.6165 8.61592 19.2985 8.61592C20.6859 8.61592 21.9492 7.66648 21.9492 5.5764C21.9415 3.66433 20.6626 2.62259 19.3063 2.62259ZM18.8413 7.16539C18.384 7.16539 18.1127 7.02693 17.9267 6.8555L17.919 4.40938C18.1205 4.21817 18.3995 4.08631 18.8413 4.08631C19.5466 4.08631 20.0348 4.75882 20.0348 5.62255C20.0348 6.50605 19.5543 7.16539 18.8413 7.16539Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.3151 2.23355L15.2605 1.87751V0.539062L13.3151 0.888508V2.23355Z"
                        fill="white"
                      />
                      <path
                        d="M15.2605 2.73481H13.3151V8.50397H15.2605V2.73481Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.2303 3.22258L11.1063 2.73467H9.43217V8.50383H11.3698V4.59399C11.8271 4.08631 12.6021 4.17861 12.8424 4.25114V2.73467C12.5944 2.65556 11.6876 2.5105 11.2303 3.22258Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.35497 1.30409L5.46385 1.64694L5.4561 6.92819C5.4561 7.904 6.3164 8.62268 7.46347 8.62268C8.09901 8.62268 8.56404 8.52378 8.81981 8.4051V7.06665C8.5718 7.15237 7.34722 7.45566 7.34722 6.47985V4.13922H8.81981V2.73484H7.34722L7.35497 1.30409Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.11566 4.40938C2.11566 4.15224 2.36368 4.05334 2.77445 4.05334C3.36349 4.05334 4.10754 4.20499 4.69658 4.47531V2.92588C4.05329 2.7083 3.41774 2.62259 2.77445 2.62259C1.2011 2.62259 0.154785 3.32148 0.154785 4.4885C0.154785 6.30826 3.09997 6.01815 3.09997 6.80275C3.09997 7.10605 2.78995 7.20495 2.35593 7.20495C1.71264 7.20495 0.891082 6.98077 0.240041 6.67748V8.24669C0.960837 8.51042 1.68938 8.62251 2.35593 8.62251C3.96803 8.62251 5.07635 7.9434 5.07635 6.76319C5.0686 4.79838 2.11566 5.14783 2.11566 4.40938Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13177_1984">
                        <rect
                          width="28.2118"
                          height="10.1562"
                          fill="white"
                          transform="translate(0 0.421875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </div>
            <div className={Styles.social_media_cont}>
              <svg
                onClick={() =>
                  window.open("https://dribbble.com/openstrokeicons")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.7271 20.4993C17.6227 19.8813 17.0765 16.873 15.7317 13.1803C19.0409 12.6512 21.907 13.5585 22.1187 13.6276C21.6629 16.4835 20.0273 18.9458 17.7271 20.4993ZM12.0008 22.249C9.51997 22.249 7.24514 21.3671 5.47128 19.8996C5.60676 20.0097 5.70131 20.0788 5.70131 20.0788C5.70131 20.0788 7.66567 15.795 13.7436 13.677C13.7662 13.6686 13.7902 13.6629 13.8128 13.6559C15.255 17.4021 15.8491 20.5402 16.0015 21.4362C14.7724 21.9583 13.4191 22.249 12.0008 22.249ZM1.75122 11.9993C1.75122 11.8907 1.75687 11.7835 1.75969 11.6762C1.94173 11.6805 7.00506 11.7947 12.2815 10.2158C12.575 10.7901 12.8558 11.3757 13.1127 11.9584C12.9772 11.9951 12.8431 12.036 12.7091 12.0812C7.17863 13.8675 4.3732 18.8428 4.3732 18.8428C4.3732 18.8428 4.37743 18.847 4.37743 18.8484C2.74469 17.0324 1.75122 14.6323 1.75122 11.9993ZM7.62761 2.73317C7.7645 2.91519 9.65972 5.48465 11.4336 8.63687C6.51278 9.94488 2.24112 9.89267 1.97159 9.88844C2.63626 6.71365 4.76855 4.0821 7.62761 2.73317ZM9.54524 2.05019C9.54524 2.0516 9.54383 2.05301 9.54383 2.05301C9.54383 2.05301 9.53113 2.05583 9.51279 2.05865C9.52408 2.05583 9.53395 2.05442 9.54524 2.05019ZM18.7685 4.31072C18.7431 4.34882 17.284 6.57117 13.4145 8.02029C11.6632 4.80176 9.73838 2.24499 9.58456 2.04181C10.3593 1.85414 11.1679 1.75255 12.0005 1.75255C14.5943 1.75255 16.9636 2.72051 18.7685 4.31072ZM22.2459 11.8977C22.0977 11.8652 18.629 11.1188 15.1081 11.5619C15.0347 11.3869 14.9628 11.2105 14.8866 11.0341C14.6735 10.5318 14.4434 10.0351 14.205 9.54692C18.2522 7.89462 19.8948 5.51987 19.9146 5.49165C21.3512 7.23708 22.2219 9.46649 22.2459 11.8977ZM23.7573 9.58504C23.5992 8.81463 23.3621 8.05409 23.0559 7.32883C22.7567 6.61767 22.3828 5.93192 21.9496 5.29132C21.522 4.65636 21.028 4.05809 20.4862 3.51626C19.9428 2.97301 19.3459 2.48057 18.7095 2.05162C18.0688 1.61703 17.383 1.24593 16.6717 0.943971C15.9464 0.639191 15.1872 0.40214 14.4167 0.245517C13.6264 0.08325 12.8135 0 12.0007 0C11.1865 0 10.3736 0.08325 9.58335 0.245517C8.81284 0.40214 8.05362 0.639191 7.32828 0.943971C6.61704 1.24593 5.9312 1.61703 5.28912 2.05162C4.65408 2.48057 4.05715 2.97301 3.51385 3.51626C2.97195 4.05809 2.47945 4.65636 2.05045 5.29132C1.61722 5.93192 1.24325 6.61767 0.944082 7.32883C0.636444 8.05409 0.400776 8.81463 0.242724 9.58504C0.0818486 10.3738 0 11.1865 0 11.9993C0 12.8149 0.0818486 13.6276 0.242724 14.4178C0.400776 15.1882 0.636444 15.9473 0.944082 16.6712C1.24325 17.3823 1.61722 18.0709 2.05045 18.7115C2.47945 19.3465 2.97195 19.9419 3.51385 20.4866C4.05715 21.0284 4.65408 21.5194 5.28912 21.9498C5.9312 22.383 6.61704 22.7555 7.32828 23.056C8.05362 23.3636 8.81284 23.5979 9.58335 23.7545C10.3736 23.9182 11.1865 24 12.0007 24C12.8135 24 13.6264 23.9182 14.4167 23.7545C15.1872 23.5979 15.9464 23.3636 16.6717 23.056C17.383 22.7555 18.0688 22.383 18.7095 21.9498C19.3459 21.5194 19.9428 21.0284 20.4862 20.4866C21.028 19.9419 21.522 19.3465 21.9496 18.7115C22.3828 18.0709 22.7567 17.3823 23.0559 16.6712C23.3621 15.9473 23.5992 15.1882 23.7573 14.4178C23.9182 13.6276 24 12.8149 24 11.9993C24 11.1865 23.9182 10.3738 23.7573 9.58504Z"
                  fill="white"
                />
              </svg>

              <svg
                onClick={() =>
                  window.open("https://pinterest.com/openstrokeicons/")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.0007 0C5.37379 0 0 5.37238 0 12.0007C0 16.913 2.95502 21.1353 7.18434 22.991C7.15047 22.1542 7.17869 21.1466 7.39178 20.235C7.62321 19.2612 8.93561 13.6969 8.93561 13.6969C8.93561 13.6969 8.55318 12.9307 8.55318 11.7975C8.55318 10.0194 9.58476 8.69148 10.8675 8.69148C11.9584 8.69148 12.4862 9.51138 12.4862 10.4936C12.4862 11.5901 11.7862 13.2313 11.4264 14.7511C11.1258 16.0254 12.0642 17.0626 13.3202 17.0626C15.5936 17.0626 17.1247 14.1429 17.1247 10.6827C17.1247 8.05363 15.3537 6.08502 12.1319 6.08502C8.4925 6.08502 6.22473 8.79873 6.22473 11.83C6.22473 12.8771 6.53237 13.6137 7.01499 14.1838C7.23796 14.4477 7.2676 14.5521 7.18716 14.8541C7.13071 15.0729 6.99806 15.6063 6.94302 15.8165C6.86259 16.1199 6.61704 16.23 6.34327 16.1171C4.66537 15.4327 3.88499 13.5968 3.88499 11.5322C3.88499 8.12418 6.75957 4.03457 12.4608 4.03457C17.0429 4.03457 20.0586 7.35227 20.0586 10.9099C20.0586 15.6176 17.4422 19.1342 13.5826 19.1342C12.2886 19.1342 11.0693 18.4343 10.6516 17.6398C10.6516 17.6398 9.95449 20.4043 9.80773 20.9377C9.55371 21.8621 9.05557 22.7878 8.59975 23.5075C9.67931 23.8264 10.8195 24 12.0007 24C18.6276 24 24 18.6276 24 12.0007C24 5.37238 18.6276 0 12.0007 0Z"
                  fill="white"
                />
              </svg>

              <svg
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/openstrokeicons/"
                  )
                }
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.2244 0H1.77073C0.793807 0 0 0.77514 0 1.73073V22.2693C0 23.2249 0.793807 24.0009 1.77073 24.0009H22.2244C23.2035 24.0009 24 23.2249 24 22.2693V1.73073C24 0.77514 23.2035 0 22.2244 0ZM5.71982 3.24414C6.83735 3.24414 7.74542 4.15221 7.74542 5.27149C7.74542 6.38945 6.83735 7.29752 5.71982 7.29752C4.60012 7.29752 3.69466 6.38945 3.69466 5.27149C3.69466 4.15221 4.60012 3.24414 5.71982 3.24414ZM3.97314 20.0791H7.46885V8.83398H3.97314V20.0791ZM13.0121 8.83352H9.65999V20.0786H13.1535V14.5163C13.1535 13.0497 13.4306 11.628 15.2494 11.628C17.0433 11.628 17.0655 13.3054 17.0655 14.6097V20.0786H20.559V13.9111C20.559 10.8831 19.9058 8.55469 16.3669 8.55469C14.6668 8.55469 13.5266 9.48676 13.0601 10.3713H13.0121V8.83352Z"
                  fill="white"
                />
              </svg>

              <svg
                onClick={() =>
                  window.open("https://twitter.com/openstrokeicons")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.9171 1.18652H22.5859L14.5707 10.3474L24 22.8132H16.617L10.8343 15.2527L4.21767 22.8132H0.546678L9.11971 13.0146L0.0742188 1.18652H7.64466L12.8717 8.09708L18.9171 1.18652ZM17.6295 20.6173H19.6624L6.54004 3.26712H4.35852L17.6295 20.6173Z"
                  fill="white"
                />
              </svg>

              <svg
                onClick={() =>
                  window.open("https://www.instagram.com/openstrokeicons/")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.2 2C4.32812 2 2 4.32812 2 7.2V16.8C2 19.6719 4.32812 22 7.2 22H16.8C19.6719 22 22 19.6719 22 16.8V7.2C22 4.32812 19.6719 2 16.8 2H7.2ZM7.2 0C3.22355 0 0 3.22355 0 7.2V16.8C0 20.7764 3.22355 24 7.2 24H16.8C20.7764 24 24 20.7764 24 16.8V7.2C24 3.22355 20.7764 0 16.8 0H7.2Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 8C9.77125 8 8 9.77125 8 12C8 14.2288 9.77125 16 12 16C14.2288 16 16 14.2288 16 12C16 9.77124 14.2288 8 12 8ZM6 12C6 8.66668 8.66669 6 12 6C15.3333 6 18 8.66668 18 12C18 15.3333 15.3333 18 12 18C8.66669 18 6 15.3333 6 12Z"
                  fill="white"
                />
                <path
                  d="M19.2 4.79961C19.2 5.44576 18.6462 5.99961 18.0001 5.99961C17.3539 5.99961 16.8 5.44576 16.8 4.79961C16.8 4.15346 17.3539 3.59961 18.0001 3.59961C18.7385 3.59961 19.2 4.15346 19.2 4.79961Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
