import React, { useContext, useState, useEffect } from "react";
import Styles from "./style.module.css";

import { Button } from "../../ui";
import AuthContext from "../../context/AuthProvider";
import Modal from "../../containers/modal/modals";
import usePricing from "../../hooks/pricing/usePricing";
import { useSubscriptionPlans } from "../../hooks/subscription-plans/useSubscriptionPlans";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import tariffSet from "./tariffSet";
import PricingCards from "../PricingCards/PricingCards";

const PricingModal = ({ iconName, setIsPriceModalOpen }) => {
  const [monthlyDuration, setMonthlyDuration] = useState(false);
  const { ModalMain, setIsLoginOpen } = Modal();
  const { getSubscription, getProdPurchaseStatus } = usePricing();
  const { plansList } = useSubscriptionPlans();


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
    <div className={Styles.pricing_modal_cont}>
      <div className={Styles.header}>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.0835 9.99992C2.0835 5.62766 5.62791 2.08325 10.0002 2.08325C14.3724 2.08325 17.9168 5.62766 17.9168 9.99992C17.9168 14.3722 14.3724 17.9166 10.0002 17.9166C5.62791 17.9166 2.0835 14.3722 2.0835 9.99992ZM8.75016 6.24992C8.75016 5.78968 9.12326 5.41658 9.5835 5.41658C10.0437 5.41658 10.4168 5.78968 10.4168 6.24992C10.4168 6.71016 10.0437 7.08325 9.5835 7.08325C9.12326 7.08325 8.75016 6.71016 8.75016 6.24992ZM7.7085 9.16658C7.7085 8.82141 7.98832 8.54158 8.3335 8.54158H10.0002C10.3453 8.54158 10.6252 8.82141 10.6252 9.16658V13.5416H12.5002C12.8453 13.5416 13.1252 13.8214 13.1252 14.1666C13.1252 14.5118 12.8453 14.7916 12.5002 14.7916H7.50016C7.15498 14.7916 6.87516 14.5118 6.87516 14.1666C6.87516 13.8214 7.15498 13.5416 7.50016 13.5416H9.37516V9.79158H8.3335C7.98832 9.79158 7.7085 9.51176 7.7085 9.16658Z"
              fill="#676F7E"
            />
          </svg>{" "}
          {iconName} is pro icons, upgrade your account.
        </p>
      </div>
      <div className={Styles.pricing_sec}>
        {/* <div className={Styles.tabs}>
          <p
            className={`${monthlyDuration && Styles.active}`}
            onClick={() => setMonthlyDuration(true)}
          >
            Monthly
          </p>
          <p
            className={`${!monthlyDuration && Styles.active}`}
            onClick={() => setMonthlyDuration(false)}
          >
            Annually
          </p>
        </div> */}

        <div
          className={`${Styles.tariffs_switch} ${Styles.tariffs_switch_pricing_page}`}
        >
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
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#676F7E"
                  stroke-width="2"
                />
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
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#676F7E"
                  stroke-width="2"
                />
              </svg>
            )}
            Billed yearly <span className={Styles.discount}> Save 40%</span>
          </p>
        </div>
        <div className={Styles.pricing_card_cont}>
          {mergedArray
            ?.sort((a, b) => a.sort - b.sort)
            .map((tariff, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <PricingCards
                  from={"modal"}
                  subClick={subClick}
                  planName={tariff.name}
                  discount={`${tariff.discount}%`}
                  price={planPricing(tariff.price, tariff.priceYearly)}
                  isMonthly={monthlyDuration}
                />
              );
            })}
        </div>
        <div className={Styles.btm_text_cont}>
          <p onClick={() => setIsPriceModalOpen(false)}>Continue with low-res png</p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;