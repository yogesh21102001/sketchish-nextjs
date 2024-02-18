import React, { useState } from "react";
import Styles from "./style.module.css";
import { notifySuccess } from "../../../utils/notify";

import { TwitterShareButton, LinkedinShareButton, PinterestShareButton, EmailShareButton } from "react-share";

import {
  Congratulations,
  Gmail,
  InstaGram,
  LinkdIn,
  Pintrest,
  Twitter,
} from "../assets";
import { Button } from "../../../ui";

export const CongPopUp = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(
      "https://openstrokeicons.com/?ref-social"
    );
    setIsCopied(true);
    notifySuccess("Copied Successfully");
  };

   const shareUrl = "https://openstrokeicons.com/";
   const title = "OpenStroke Icons";

  return (
    <div className={Styles.wraper}>
      <div className={Styles.top_cont}>
        <Congratulations />
      </div>
      <div className={Styles.btm_cont}>
        <div className={Styles.text_cont}>
          <h3>Congratulations!</h3>
          <p>You have unlocked pro plan for one month.</p>
        </div>
        <div className={Styles.social_accounts}>
          <LinkedinShareButton
            url={`${shareUrl}?ref-linkedin`}
            className={Styles.social_media}
            title={title}
          >
            <LinkdIn />
            <p>LinkedIn</p>
          </LinkedinShareButton>
          <TwitterShareButton
            url={`${shareUrl}?ref-twitter`}
            title={title}
            className={Styles.social_media}
          >
            <Twitter />
            <p>Twitter</p>
          </TwitterShareButton>
          <div
            onClick={() =>
              window.open("https://www.instagram.com/openstrokeicons/")
            }
            className={Styles.social_media}
          >
            <InstaGram />
            <p>Instagram</p>
          </div>
          <PinterestShareButton
            url={shareUrl}
            // pinId="926474954579735147"
            description="Hello dosto"
            media={"https://openstrokeicons.com/preview.png"}
            className={Styles.social_media}
          >
            <Pintrest />
            <p>Pinterest</p>
          </PinterestShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="OpenStroke Icons"
            className={Styles.social_media}
          >
            <Gmail />
            <p>Email</p>
          </EmailShareButton>
        </div>
        <div className={Styles.copy_link}>
          <p>https://openstrokeicons.com/?ref-social</p>
          <Button onClick={() => copy()} className={Styles.copy_btn}>
            {!isCopied ? "Copy" : "Copied"}
          </Button>
        </div>
      </div>
    </div>
  );
};
