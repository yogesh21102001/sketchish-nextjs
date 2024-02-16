import React from "react";
import Styles from "./style.module.css";
import CommonStyles from "@/utils/commonStyles.module.css";
import { Button, SectionHeader } from "@/components";
import Link from "next/link";

import CalendlyEmbed from "../../components/CalendlyEmbed/CalendlyEmbed";

const FooterSection = ({ background }) => {
  return (
    <footer className={Styles.sec_cont} style={{ backgroundColor: background }}>
      <div className={`${Styles.wraper} ${CommonStyles.body_padding}`}>
        <div className={Styles.main_cont}>
          <div className={`${Styles.sec} ${Styles.top_sec}`}>
            <SectionHeader
              alignItems={"flex-start"}
              heading={"Talk to us to"}
              gradient={"get insights from our brain"}
              color={"white"}
              textAlign="left"
            />
            <div className={Styles.btn_cont}>
              <Button
                width={"44%"}
                margin={0}
                color={"#F7D56E"}
                border={"2px solid #F7D56E"}
              >
                get free quote
              </Button>

              <CalendlyEmbed
                className={Styles.btn}
                width={"44%"}
                margin={0}
                background={"#F7D56E"}
                border={"2px solid #F7D56E"}
                color={"#000000"} text='SCHEDULE A CALL' />
            </div>
          </div>
          <div className={`${Styles.sec}`}>
            <SectionHeader
              alignItems={"flex-start"}
              heading={"Drop a line"}
              color={"white"}
              textAlign="left"
            />
            <div className={Styles.social_medias}>

              <Link href="https://twitter.com/sketchishteam" target="_blank" className={Styles.social_logo_cont}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1929_12146)">
                    <path
                      d="M23.6465 1.4834H28.2324L18.2134 12.9344L30 28.5167H20.7712L13.5429 19.0662L5.27208 28.5167H0.683349L11.3996 16.2686L0.0927734 1.4834H9.55584L16.0896 10.1216L23.6465 1.4834ZM22.0369 25.7718H24.578L8.17502 4.08415H5.44815L22.0369 25.7718Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1929_12146">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <Link href="https://www.linkedin.com/company/sketchishd/?viewAsMember=true" target="_blank" className={Styles.social_logo_cont}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1929_12151)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.7805 0H2.21341C0.992256 0 0 0.968925 0 2.16341V27.8366C0 29.0311 0.992256 30.0011 2.21341 30.0011H27.7805C29.0044 30.0011 30 29.0311 30 27.8366V2.16341C30 0.968925 29.0044 0 27.7805 0ZM7.15063 4.05518C8.5475 4.05518 9.68263 5.19027 9.68263 6.58938C9.68263 7.98681 8.5475 9.12187 7.15063 9.12187C5.75096 9.12187 4.61914 7.98681 4.61914 6.58938C4.61914 5.19027 5.75096 4.05518 7.15063 4.05518ZM4.96719 25.0987H9.33682V11.0424H4.96719V25.0987ZM12.0752 11.0419H16.2654V12.964H16.3254C16.9084 11.8584 18.3338 10.6934 20.4588 10.6934C24.8824 10.6934 25.699 13.6039 25.699 17.3888V25.0982H21.3321V18.262C21.3321 16.6317 21.3043 14.535 19.0619 14.535C16.7884 14.535 16.4421 16.312 16.4421 18.1454V25.0982H12.0752V11.0419Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1929_12151">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <Link href="https://www.facebook.com/Sketchish/" target="_blank" className={Styles.social_logo_cont}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1929_12162)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.024 30H1.65577C0.741044 30 0 29.2585 0 28.3441V1.65576C0 0.741156 0.741163 0 1.65577 0H28.3444C29.2588 0 30 0.741156 30 1.65576V28.3441C30 29.2586 29.2586 30 28.3444 30H20.6996V18.3824H24.5991L25.183 13.8548H20.6996V10.9641C20.6996 9.65331 21.0636 8.76 22.9433 8.76L25.3408 8.75894V4.70943C24.9262 4.65426 23.503 4.53098 21.8472 4.53098C18.3905 4.53098 16.024 6.64094 16.024 10.5157V13.8548H12.1144V18.3824H16.024V30Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1929_12162">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>

              <Link href="mailto:hello@sketchish.com" target="_blank" className={Styles.social_logo_cont}>
                <p>send mail</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2 3V19H16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                  <path
                    d="M6 15H18V4.73333L14.3077 1H6V15Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>

            </div>
          </div>
          <div className={`${Styles.sec} ${Styles.bottom_sec}`}>
            <div className={Styles.lft}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M40.0002 2.58208C40.0002 1.15604 38.8788 0 37.4956 0H2.4548C1.41846 0 0.830608 1.22364 1.45867 2.07347L9.85496 13.4344C10.8123 14.7297 12.3061 15.4837 13.8856 15.4687L21.518 15.3962C23.7379 15.3751 25.8675 14.4868 27.4771 12.9104C25.8693 14.6508 24.9725 16.9622 24.9725 19.3656V26.9518C24.9725 28.5635 25.7024 30.0828 26.9459 31.0596L37.9889 39.7335C38.8133 40.381 40.0002 39.775 40.0002 38.7066V2.58208Z"
                  fill="url(#paint0_linear_1928_6131)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1928_6131"
                    x1="40.0002"
                    y1="-2.38419e-06"
                    x2="0.0187404"
                    y2="38.782"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FA38A1" />
                    <stop offset="1" stopColor="#5500FF" />
                  </linearGradient>
                </defs>
              </svg>
              <p>
                Sketchish is a digital product design and engineering firm
                committed to addressing intricate software challenges. <br />{" "}
                <br />
                Established in 2017, our team has proven record in assisting
                entities spanning from startups that went public offerings to
                esteemed Fortune 500 and progressive enterprises.
              </p>
            </div>
            <div className={Styles.rgt}>
              <div className={Styles.link_cont}>
                <p className={Styles.header}>What we do</p>
                <div className={Styles.links}>
                  <Link href={"/services/digital-product-design"}>Digital Product Design</Link>
                  <Link href={"/services/software-engineering"}>Software Engineering</Link>
                  <Link href={"/services/quality-engineering"}>Quality Engineering</Link>
                  <Link href={"/services/creative-branding"}>Branding</Link>
                  <Link href={"/services/digital-marketing"}>Digital Marketing</Link>
                </div>
              </div>
              <div className={Styles.link_cont}>
                <p className={Styles.header}>Company</p>
                <div className={Styles.links}>
                  <Link href={"#"}>Who we are</Link>
                  <Link href={"/case-studies"}>Case Studies</Link>
                  <Link href={"#"}>Blogs</Link>
                  <Link href={"/clients"}>Clients</Link>
                </div>
              </div>
              <div className={Styles.link_cont}>
                <p className={Styles.header}>Headquarter</p>
                <div className={Styles.links}>
                  <Link href={"#"}>
                    401-402, Palak Prime, Ambli, Ahmedabad - 380054, India
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`${Styles.sec}`}>
            <p>© 2017-2024 Copyright. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
