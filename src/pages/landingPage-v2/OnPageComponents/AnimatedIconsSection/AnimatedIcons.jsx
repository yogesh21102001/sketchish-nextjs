import React from "react";
import Styles from "./style.module.css";

import {
  GairAn,
  BellAn,
  BallAn,
  HeartAn,
  DownArrowAn,
  AttachAn,
  DollarAn,
} from "../../assets/icons";

import { useNavigate } from "react-router-dom";

export const AnimatedIcons = ({ authenticated, setIsLoginOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    if (authenticated){navigate(url)}else{setIsLoginOpen(true)};
  };

  return (
    <div className={Styles.animatedIcons_cont}>
      <div className={Styles.main_item}>
        <h3>we have introduced animated icons</h3>
        <div className={Styles.icon_cont}>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation(
                "/icons/settings-gear?t=Classic&s=Solid&an=rotate"
              )
            }
          >
            <GairAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation("/icons/bell?t=Classic&s=Solid&an=shake")
            }
          >
            <BellAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation(
                "/icons/cricket-ball-1?t=Classic&s=Solid&an=bumping"
              )
            }
          >
            <BallAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation("/icons/heart?t=Classic&s=Solid&an=beat")
            }
          >
            <HeartAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation(
                "/icons/down-arrow-square?t=Classic&s=Solid&an=beatfade"
              )
            }
          >
            <DownArrowAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation(
                "/icons/attachment-2?t=Classic&s=Standard&an=draw"
              )
            }
          >
            <AttachAn />
          </div>
          <div
            className={Styles.icon}
            onClick={() =>
              handleNavigation("/icons/coins-dollar?t=Sharp&s=Solid&an=flip")
            }
          >
            <DollarAn />
          </div>
        </div>
        <h3>CLICK ON ICON TO EXPLORE</h3>
      </div>
    </div>
  );
};
