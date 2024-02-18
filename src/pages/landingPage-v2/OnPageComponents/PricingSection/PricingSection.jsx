import React, { useContext, useState } from "react";
import Styles from "./style.module.css";
import CommonStyle from "../../../../style/commonStyle.module.css";

import { FreeTxt } from "../../assets/images";

// Component
import { HeaderText } from "../Header/HeaderText";
import PricingCards from "../../../../components/PricingCards/PricingCards";

import { useSubscriptionPlans } from "../../../../hooks/subscription-plans/useSubscriptionPlans";
import usePricing from "../../../../hooks/pricing/usePricing";
import Modal from "../../../../containers/modal/modals";
import { isAuthenticated } from "../../../../utils/helpers";
import tariffSet from "./tariffSet";
import hint from "./hint.svg";
import AuthContext from "../../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const PricingSection = ({
  header = true,
  heading,
  message,
  headingFont,
  headingMargin,
  from
}) => {
  const { auth } = useContext(AuthContext);
  const [monthlyDuration, setMonthlyDuration] = useState(false);
  const { ModalMain, setIsLoginOpen } = Modal();
  const { getSubscription, getProdPurchaseStatus } = usePricing();
  const { plansList } = useSubscriptionPlans();

  const navigate = useNavigate();

  const handelProSub = async () => {
    if (isAuthenticated()) {
      const res = await getSubscription({
        plan: "pro",
        opt: monthlyDuration ? "monthly" : "yearly",
      });

      if (res) {
        window.location.href = res;
        return null;
      }
    } else {
      setIsLoginOpen(true);
    }
  };
  const handelAdvncSub = async () => {
    if (isAuthenticated()) {
      const res = await getSubscription({
        plan: "advance",
        opt: monthlyDuration ? "monthly" : "yearly",
      });
      console.log("Advance responseeee???", res);
      if (res) {
        window.location.href = res;
        return null;
      }
    } else {
      setIsLoginOpen(true);
    }
  };
  const subClick = async (n) => {
    if (n.toLowerCase() === "pro") {
      await handelProSub();
    } else if (n.toLowerCase() == "advance") {
      await handelAdvncSub();
    } else {
      if (isAuthenticated()) {
      } else {
        setIsLoginOpen(true);
      }
    }
  };
  function planPricing(p, p2) {
    if (monthlyDuration) {
      return Number(p) === 0 ? "0" : `${(Number(p) * 50) / 100}`;
    }
    return Number(p2) === 0 ? "0" : `${(Number(p2) * 50) / 100}`;
  }
  const mergedArray = plansList?.map((item) => ({
    ...item,
    ...tariffSet.find((i) => i.name === item.name),
  }));

  return (
    <div className={Styles.pricing_cont}>
      {header ? (
        <HeaderText
          heading={heading ? heading : "Pricing"}
          message={message ? message : ""}
          headingFont={headingFont}
          headingMargin={headingMargin}
        />
      ) : (
        ""
      )}
      <div
        className={`${Styles.tariffs_switch} ${
          from == "pricing" && Styles.tariffs_switch_pricing_page}`}
      >
        <FreeTxt className={Styles.free_txt} />
        <p
          className={`${monthlyDuration ? Styles.active : ""}`}
          onClick={() => setMonthlyDuration(true)}
        >
          {monthlyDuration ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="white"
                stroke="#7238FA"
                stroke-width="2"
              />
              <circle cx="10" cy="10" r="4" fill="#7238FA" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="8" stroke="#676F7E" stroke-width="2" />
            </svg>
          )}
          Billed monthly
        </p>
        <p
          className={`${!monthlyDuration ? Styles.active : ""}`}
          onClick={() => setMonthlyDuration(false)}
        >
          {!monthlyDuration ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                fill="white"
                stroke="#7238FA"
                stroke-width="2"
              />
              <circle cx="10" cy="10" r="4" fill="#7238FA" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle cx="10" cy="10" r="8" stroke="#676F7E" stroke-width="2" />
            </svg>
          )}
          Billed yearly <span className={Styles.discount}> Save 40%</span>
        </p>
      </div>
      <div className={Styles.pricing_card_cont}>
        {mergedArray
          ?.sort((a, b) => a.sort - b.sort)
          ?.reverse()
          .map((tariff) => {
            if (tariff?.name != "basic") {
              return (
                <PricingCards
                  subClick={subClick}
                  planName={tariff.name}
                  discount={`${tariff.discount}%`}
                  price={planPricing(tariff.price, tariff.priceYearly)}
                  isMonthly={monthlyDuration}
                />
              );
            }
          })}
        {from == "pricing" && <PricingCards planName={"enterprise"} />}
      </div>
      {from != "pricing" ? (
        <h4 className={Styles.question} onClick={() => navigate("/pricing")}>
          Compare pricing plan features
        </h4>
      ) : (
        <h4
          className={`${Styles.question} ${Styles.currency_info}`}
          style={{ textAlign: "right", width: "100%" }}
        >
          All prices are in US dollars.
        </h4>
      )}
      {ModalMain()}
    </div>
  );
};

export default PricingSection;