import React from "react";
import Styles from "./style.module.css";

import { EmailBadge, DiscordBadge, ChatBadge } from "../../assets";

import { Button } from "../../../../ui";

export const SupportCard = ({
  label,
  description,
  btnShadow,
  btnColor,
  btnlabel,
  navigate,
}) => {
  return (
    <div className={Styles.wraper}>
      <div className={Styles.card_cont}>
        <div className={Styles.top}>
          {label?.toLowerCase() == "email" && (
            <EmailBadge className={Styles.badge} />
          )}
          {label?.toLowerCase() == "chat" && (
            <ChatBadge className={Styles.badge} />
          )}
          {label?.toLowerCase() == "community" && (
            <DiscordBadge className={Styles.badge} />
          )}

          <h3>{label}</h3>
          <p>{description}</p>
        </div>
        <Button
          width={"100%"}
          backgroundColor={btnColor}
          shadow={btnShadow}
          style={{ color: "white" }}
          onClick={() => navigate()}
        >
          {btnlabel}
        </Button>
      </div>
    </div>
  );
};
