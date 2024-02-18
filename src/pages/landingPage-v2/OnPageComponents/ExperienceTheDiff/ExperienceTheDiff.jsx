import React from 'react'
import Styles from "./style.module.css"
import { Button } from '../../../../ui';

import { GientOsLogo, Avtar } from "../../assets/images";
import { useNavigate } from 'react-router-dom';

const ExperienceTheDiff = () => {

  const navigator = useNavigate()

  return (
    <div className={Styles.wraper}>
      <GientOsLogo className={Styles.gient_os_logo} />
      <div className={Styles.main_cont}>
        <h3>Experience the difference</h3>
        <p>
          Hello, <br />
          <br />
          I'm Dave, I began my journey into the world of icon design back in
          2009. 📔 <br />
          <br /> In 2013, groundbreaking📈 release of 371 line icons, The
          overwhelming success inspired me on a mission to go next level. <br />
          <br /> Today, Openstrokeicons having 90,000 + consistent icons,
          designed with a consistent style and We are continuously working to
          expand, to cater the evolving needs of various industries. <br />
          <br /> <span>One library to replace them all.</span> <br />
          <br /> How? <br />{" "}
          <span>
            Guarantee of consistent styles, icons in various styles🎨, crafted
            by a team of in-house designers👩‍💻, solid guidelines followed,
            ensuring top-quality icons across all styles.{" "}
          </span>
          <br />
          <br /> This approach sets us apart from marketplaces so You'll never
          struggle to create or mix and match icons that compromise your design
          uniformity. <br />
          <br /> Invest in our growing icon design system.
          <br />{" "}
          <span> Choose Openstrokeicons and experience the difference.</span>
        </p>
        <div className={Styles.founder_info}>
          <div className={Styles.avtar_cont}></div>
          <div className={Styles.info_text}>
            <p>
              <span>Chirag Dave</span> <br /> Designer + Openstroke founder
            </p>
            <div className={Styles.social_icons}>
              <svg
                onClick={() =>
                  window.open("https://twitter.com/openstrokeicons")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M12.6113 0.791016H15.0571L9.71367 6.89824L15.9998 15.2088H11.0778L7.22272 10.1685L2.81161 15.2088H0.364289L6.07965 8.67643L0.0493164 0.791016H5.09628L8.58095 5.39805L12.6113 0.791016ZM11.7529 13.7448H13.1081L4.35986 2.17808H2.90552L11.7529 13.7448Z"
                  fill="#1E3050"
                />
              </svg>
              <svg
                onClick={() =>
                  window.open("https://www.instagram.com/openstrokeicons/")
                }
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8163 0H1.18049C0.529205 0 0 0.51676 0 1.15382V14.8462C0 15.4832 0.529205 16.0006 1.18049 16.0006H14.8163C15.469 16.0006 16 15.4832 16 14.8462V1.15382C16 0.51676 15.469 0 14.8163 0Z"
                  fill="#1E3050"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.81349 2.16309C4.55851 2.16309 5.16389 2.76847 5.16389 3.51465C5.16389 4.25996 4.55851 4.86534 3.81349 4.86534C3.06702 4.86534 2.46338 4.25996 2.46338 3.51465C2.46338 2.76847 3.06702 2.16309 3.81349 2.16309ZM2.64905 13.3864H4.97952V5.88965H2.64905V13.3864Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.43994 5.88902H8.67471V6.91418H8.7067C9.01769 6.32451 9.77783 5.70312 10.9112 5.70312C13.2705 5.70312 13.706 7.25542 13.706 9.27403V13.3857H11.377V9.73978C11.377 8.87025 11.3621 7.752 10.1662 7.752C8.95369 7.752 8.76896 8.69978 8.76896 9.67753V13.3857H6.43994V5.88902Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={Styles.btn_cont}>
          <Button
            onClick={() => navigator("/icons/read-home-1?t=Classic&s=Standard")}
            highlight={true}
            className={Styles.btn}
          >
            Explore the difference
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceTheDiff;