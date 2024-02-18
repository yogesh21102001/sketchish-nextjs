import React from "react";
import Styles from "./GetInTouch.module.css";
import CommonStyle from "../../../../style/commonStyle.module.css";

import { Waves } from "../../assets/images";

export const GetInTouch = () => {
  return (
    <div className={Styles.get_in_touch_cont}>
      <div className={Styles.content_cont}>
        <div className={Styles.text}>
          <h4>Get Latest updates to your Inbox</h4>
          <p>
            We keep adding new icons every week, get the latest updates to your
            inbox. Subscribe to your newsletter today!
          </p>
        </div>
        <div className={Styles.input_cont}>
          <input type="text" placeholder="Email address" />
          <button
            className={CommonStyle.btn_style}
            style={{ backgroundColor: "#FAD338", width: "34%" }}
          >
            Subscribe
          </button>
        </div>
      </div>
      <Waves />
    </div>
  );
};
