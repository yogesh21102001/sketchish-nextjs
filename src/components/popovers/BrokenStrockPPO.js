import React from "react";
import { BrokenStrokeSVG, OpenStrokeSVG } from "../../assets/svg/index";
import "./style.css";

export function BrokenStrokePPO() {
  return (
    <div>
      <div className="bro-sto-ppo">
        <div className="bro-sto-ppo-container">
          <div className="strock-svg-body">
            <OpenStrokeSVG className="stroke-svg" />
            <p className="bro-ppo-text">OpenStroke®</p>
          </div>
          <div className="strock-svg-body">
            <BrokenStrokeSVG className="stroke-svg" />
            <p className="bro-ppo-text">BrokenStroke</p>
          </div>
        </div>
        <p className="bro-ppo-context">
          Converts strokes into objects. Alternative to the “Broken Stroke”
          features in figma, illustrator, etc.
        </p>
      </div>
      <div className="bro-sto-tri">
        <span class="caret caret-reversed"></span>
      </div>
    </div>
  );
}
