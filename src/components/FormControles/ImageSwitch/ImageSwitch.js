// import { Field } from "formik";
import React from "react";
import "./style.css";
import {
  GridViewSVG,
  ListViewSVG,
  GridColorSVG,
  ListColorSVG,
} from "../../../assets/svg";

export const ImageSwitch = ({ isOn, onChange, tLable, fLable }) => {
  return (
    <>
      <div
        className="image-switch-container switch-btn"
        onClick={() => {
          if (isOn) onChange(false);
          else onChange(true);
        }}
      >

        <div className={`image-switch-activity ${!isOn && "isa-active"}`}>
          <div className="is-view-toggle">
            {fLable ? (
              <span className={`is-lable-text ${!isOn && "is-active-svg"}`}>
                {fLable}
              </span>
            ) : (
              <>
                  <GridViewSVG className="is-display" />
                  <GridColorSVG className="is-active-svg" />
              </>
            )}
          </div>
        </div>
        <div className="sep"></div>
        <div className={`image-switch-activity ${isOn && "isa-active"}`}>
          <div className="is-view-toggle">
            {tLable ? (
              <span className={`is-lable-text ${isOn && "is-active-svg"}`}>
                {tLable}
              </span>
            ) : (
              <>
                  <ListViewSVG className="is-display" />
                  <ListColorSVG className="is-active-svg" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
