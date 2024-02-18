import { useNavigate } from "react-router-dom";
import "./style.css";
import bestValue from "../../assets/svg/bestValue.svg";

export default function PlansCard({
  planName,
  planPrice,
  subscrption,
  featues,
  billMothly,
  setBillMonthly,
  planPriceYearly,
  planPriceMonthly,
  handelProSub,
  handelAdvncSub,
  plansbillAnnually,
  plansbillMonthly,
}) {
  const navigate = useNavigate();

  function subScription(p1, p2) {
    if (Number(p1) === 0 || Number(p2) === 0) {
      return "Free forever";
    }
    if (billMothly && Number(p2) > 0) {
      return `$${p2 * 12}.00/year`;
    } else {
      return `$${p1 * 12}.00/year`;
    }
  }

  function Action(name) {
    if (planName === "basic") {
      return <button onClick={() => navigate("/")}>Get Started</button>;
    }
    if (planName === "pro") {
      return <button onClick={handelProSub}>Subscribe</button>;
    }
    if (planName === "advance") {
      return (
        <button onClick={handelAdvncSub} className="advance-btn">
          Subscribe
        </button>
      );
    }
  }

  function planPricing(p1, p2) {
    if (billMothly) {
      return Number(p2) === 0 ? "0" : `${p2}.00`;
    }
    return Number(p1) === 0 ? "0" : `${p1}.00`;
  }

  function plansName(name) {
    if (name === "basic") {
      return <h5>Basic</h5>;
    }
    if (name === "pro") {
      return <h5 className="pro">Pro</h5>;
    }
    if (name === "advance") {
      return <h5 className="Advance">Advance</h5>;
    }
  }

  return (
    <div className="plans-card-root">
      <div className="plans-card-inner">
        <div className="plans-card-top">
          <div className="card-top-one">
            {plansName(planName)}
            <div>
              <h4>
                $
                {planPricing(
                  plansbillMonthly?.monthPrice,
                  plansbillAnnually?.monthPrice
                )}
                /month
              </h4>
              <p>
                {subScription(
                  plansbillMonthly?.monthPrice,
                  plansbillAnnually?.monthPrice
                )}
              </p>
            </div>
          </div>
          <div className="card-top-two">
            {Action(planName)}
            {planName === "basic" && <p>(No credit card required)</p>}
          </div>
          {planName === "advance" && (
            <div className="best-value">
              <img src={bestValue} alt="bestValue" />
            </div>
          )}
        </div>
        <div className="separetor"></div>
        <div className="plans-card-bottom">
          <ul>
            {featues?.map((obj) => (
              <li>{obj}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
