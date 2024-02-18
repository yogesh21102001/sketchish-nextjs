import React from "react";
import Styles from "./style.module.css";

import {
  MeshGradient,
  PatternLft,
  PatternRgt,
  StripOne,
  StripFive,
  StripFour,
  StripThree,
  StripTwo,
  StripOneWhite,
  StripFourWhite,
  StripFiveWhite,
  StripThreeWhite,
  StripTwoWhite,
} from "../../assets/images";

export const CustomizationExampleSection = () => {
  return (
    <div className={Styles.wraper}>
      <div className={Styles.cont}>
        <h3 className={Styles.floating_gradient_txt}>Customisation examples</h3>
        <div className={Styles.lft}>
          <div className={Styles.icons_strip_cont}>
            <div className={Styles.overlay}></div>
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
          <div className={Styles.icons_strip_cont}>
            <div className={Styles.overlay}></div>
            <div style={{ overflow: "hidden", width: "100%" }}>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "30px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripFourWhite />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripFourWhite />
                </div>
              </div>
              <div className={Styles.strip}>
                <div className={Styles.motion_div_to_lft}>
                  <StripFiveWhite />
                </div>
                <div className={Styles.motion_div_to_lft}>
                  <StripFiveWhite />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "60px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripOneWhite />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripOneWhite />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "30px",
                }}
              >
                <div className={Styles.motion_div_to_lft}>
                  <StripThreeWhite />
                </div>
                <div className={Styles.motion_div_to_lft}>
                  <StripThreeWhite />
                </div>
              </div>
              <div
                className={Styles.strip}
                style={{
                  marginLeft: "-30px",
                }}
              >
                <div className={Styles.motion_div_to_rgt}>
                  <StripTwoWhite />
                </div>
                <div className={Styles.motion_div_to_rgt}>
                  <StripTwoWhite />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationExampleSection;