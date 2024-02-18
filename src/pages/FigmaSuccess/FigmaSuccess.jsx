import React from "react";
import Styles from "./style.module.css";

import { Helmet } from "react-helmet";
import NavBar from "../../components/NavBar/NavBar";
import PluginSection from "../landingPage-v2/OnPageComponents/PluginSection/PluginSection";

import { FigmaConnected } from "./assets";

export const FigmaSuccess = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="Figma Plugin access granted." />
        <title>Openstrokeicons - figma</title>
      </Helmet>
      <NavBar />
      <div className={Styles.cont}>
        <div className={Styles.top}>
          <FigmaConnected />
          <div className={Styles.text_cont}>
            <h3>Awesome! You’re logged in Figma Plugin!</h3>
            <p>Go to Figma plugin and explore our assets.</p>
          </div>
          <div className={Styles.link_cont}>
            <div className={Styles.text}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M15.4283 4.06984C14.4541 2.95153 13.2501 2.54088 12.0458 2.63903C10.9599 2.72753 9.89521 3.2266 9 3.94478C8.1048 3.2266 7.04015 2.72753 5.95417 2.63903C4.74996 2.54088 3.54592 2.95153 2.57168 4.06984C0.996628 5.87782 1.17879 8.62557 2.97925 10.2079L8.75245 15.2817C8.89403 15.4061 9.10597 15.4061 9.24756 15.2817L15.0208 10.2079C16.8212 8.62557 17.0034 5.87782 15.4283 4.06984Z"
                  fill="#FF3624"
                />
              </svg>{" "}
              <p
                onClick={() =>
                  window.open(
                    "https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos"
                  )
                }
              >
                Like us on Figma
              </p>
            </div>
            <div className={Styles.text}>
              <p>Share It</p>
            </div>
          </div>
        </div>
        <div className={Styles.btm}>
          <PluginSection from={"pluginSuccess"} />
        </div>
      </div>
    </div>
  );
};
