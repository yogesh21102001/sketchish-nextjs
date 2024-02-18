import React, { useState } from "react";
import "./plan.css";
import { Button } from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import {
  OSColorSVG,
  OSAdvanceSVG,
  OSBasicSVG,
  CCSVG,
  DownloadWSVG,
} from "../../assets/svg";
import { CloseBtnSVG } from "../../assets/ossvg";
import { RadioButton } from "../../components/FormControles/RadioButton/radioButton";
import { isAuthenticated } from "../../utils/helpers";
import useProduct from "../../hooks/product/useProduct";
import usePricing from "../../hooks/pricing/usePricing";
import { notifyError } from "../../utils/notify";
import { ToggleSwitch } from "../FormControles";

export function PlanDetails({ handelClose, setOpen, finalDownload }) {
  const { getDownloadProduct } = useProduct();
  const [billMothlyPRO, setBillMonthlyPRO] = useState(true);
  const [billMothlyADV, setBillMonthlyADV] = useState(true);
  const { useGetPlansList, getSubscription, getPurchaseIcon } = usePricing();
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const { plansListData } = useGetPlansList();
  const handelLink = () => {
    window.open("https://creativecommons.org/licenses/by/4.0/");
  };

  const handleDownload = async () => {
    const user = isAuthenticated();
    if (user) {
      if (selectedPlan === "basic") {
        if (finalDownload.type === "svg") {
          const res = await getPurchaseIcon({
            id: finalDownload.id,
            searchKeyword: finalDownload.searchKeyword,
            isCopy: finalDownload.isCopy,
          });

          if (res) {
            window.location.href = res;
            return null;
          }
        } else await getDownloadProduct(finalDownload);
      } else if (selectedPlan) {
        let opt = "";

        if (selectedPlan === "pro") opt = billMothlyPRO ? "yearly" : "monthly";
        else opt = billMothlyADV ? "yearly" : "monthly";

        const res = await getSubscription({
          plan: selectedPlan,
          opt,
        });

        if (res) {
          window.location.href = res;
          return null;
        }
      } else notifyError("Select plan first.");
    }
  };

  return (
    <div className="plan-section">
      <div className="price-plan-container">
        <div className="plan-container">
          <div>
            <h2 className="price-plan-heading">Plans</h2>
          </div>
          <div>
            <CloseBtnSVG className="search-ico" onClick={handelClose} />
          </div>
        </div>

        <label htmlFor="rb-advance">
          <div className="plan-price-sec">
            <div className="price-plan-sec">
              <div>
                <div className="price-sec-2">
                  <RadioButton
                    id={"rb-advance"}
                    name={"rb-plans"}
                    onClick={() => setSelectedPlan("advance")}
                  />

                  {selectedPlan === "advance" && (
                    <div className="pd-switch-sec">
                      <div className="pd-price-sec">
                        <div>
                          <p className="pd-txt">Billed Monthly</p>
                        </div>
                        <div>
                          <ToggleSwitch
                            isOn={billMothlyADV}
                            id={"set-renew"}
                            onChange={(e) =>
                              setBillMonthlyADV(e.target.checked)
                            }
                          />
                        </div>
                        <div>
                          <p className="pd-txt">Billed Annually</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="plan-logo-svg">
                    <OSAdvanceSVG />
                  </div>
                </div>
                <div className="price-sec-2">
                  <h2>Advance</h2>
                  <div className="price-values">
                    <span className="price-plan-amt">
                      $
                      {billMothlyADV
                        ? `${plansListData?.advance?.billAnullay?.monthPrice}.00`
                        : `${plansListData?.advance?.billMonthly?.monthPrice}.00`}
                      /month
                    </span>
                    <p className="plan-text-secondery">
                      $
                      {billMothlyADV
                        ? `${plansListData?.advance?.billAnullay?.yearPrice}.00`
                        : `${plansListData?.advance?.billMonthly?.yearPrice}.00`}
                      /year
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="plan-text-primary">
                {plansListData?.advance?.discription}
              </p>
            </div>
          </div>
        </label>

        <label htmlFor="rb-pro">
          <div className="plan-price-sec">
            <div>
              <div className="price-sec-2">
                <RadioButton
                  id={"rb-pro"}
                  name={"rb-plans"}
                  onClick={() => setSelectedPlan("pro")}
                />

                {selectedPlan === "pro" && (
                  <div className="pd-switch-sec">
                    <div className="pd-price-sec">
                      <div>
                        <p className="pd-txt">Billed Monthly</p>
                      </div>
                      <div>
                        <ToggleSwitch
                          isOn={billMothlyPRO}
                          id={"set-renew"}
                          onChange={(e) => setBillMonthlyPRO(e.target.checked)}
                        />
                      </div>
                      <div>
                        <p className="pd-txt">Billed Annually</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="plan-logo-svg">
                  <OSColorSVG />
                </div>
              </div>
              <div className="price-sec-2">
                <h2>Pro</h2>
                <div className="price-values">
                  <span className="price-plan-amt">
                    $
                    {billMothlyPRO
                      ? `${plansListData?.pro?.billAnullay?.monthPrice}.00`
                      : `${plansListData?.pro?.billMonthly?.monthPrice}.00`}
                    /month
                  </span>
                  <p className="plan-text-secondery">
                    $
                    {billMothlyPRO
                      ? `${plansListData?.pro?.billAnullay?.yearPrice}.00`
                      : `${plansListData?.pro?.billMonthly?.yearPrice}.00`}
                    /year
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="plan-text-primary">
                {plansListData?.pro?.discription}
              </p>
            </div>
          </div>
        </label>
        <label htmlFor="rb-basic">
          <div className="plan-price-sec">
            <div className="price-plan-sec-1">
              <div>
                <div>
                  <RadioButton
                    id={"rb-basic"}
                    name={"rb-plans"}
                    onClick={() => setSelectedPlan("basic")}
                    defaultChecked={selectedPlan === "basic" ? true : false}
                  />
                </div>
                <div>
                  <h2>Basic</h2>
                </div>
              </div>
              <div>
                <div className="plan-logo-sec">
                  <div className="plan-logo-svg">
                    <CCSVG />
                    <OSBasicSVG />
                  </div>
                  <div>
                    <span className="price-plan-amt">$0/month</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="plan-text-primary">
                {plansListData?.basic?.discription + " "}
                <Link onClick={handelLink}>How to attribute?</Link>
              </p>
            </div>
          </div>
        </label>
      </div>
      <div>
        <Button
          lable={"Get this icon"}
          type={"submit"}
          iconPre={<DownloadWSVG />}
          btnSize="full"
          onClick={handleDownload}
        />
      </div>
    </div>
  );
}
