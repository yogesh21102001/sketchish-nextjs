import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";
import { CloseIcon, OsBlueIcon } from "../../assets/svg";
import { ToggleSwitch } from "../../components/FormControles";
import { useLocation } from "react-router-dom";
import usePricing from "../../hooks/pricing/usePricing";
import { isAuthenticated } from "../../utils/helpers";
import Modal from "../../containers/modal/modals";
import logFaEvent from "../../firebaseConfig";
import { notifySuccess } from "../../utils/notify";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { VerifyMail } from "../../components/AUTH";
import PlansCard from "./PlansCard";
import { plansArray } from "./PlansArray";
import open from "../LandingPage/assets/images/open.svg";
import Rotate from "../LandingPage/assets/images/Rotate.svg";
import support from "../LandingPage/assets/images/support.svg";
import customColor from "../LandingPage/assets/images/customColor.svg";
import customBg from "../LandingPage/assets/images/customBg.svg";
import custom from "../LandingPage/assets/images/custom.svg";
import bucket from "../LandingPage/assets/images/bucket.svg";
import broken from "../LandingPage/assets/images/broken.svg";
import allfil from "../LandingPage/assets/images/allfil.svg";
import invisionIcon from "../LandingPage/assets/images/invisionIcon.svg";
import mediumIcon from "../LandingPage/assets/images/mediumIcon.svg";
import notionIcon from "../LandingPage/assets/images/notionIcon.svg";
import zoomIcon from "../LandingPage/assets/images/notionIcon.svg";
import slackIcon from "../LandingPage/assets/images/slackIcon.svg";
import anyDeskIcon from "../LandingPage/assets/images/anyDeskIcon.svg";
import TestinomialSlider from "../LandingPage/TestinomialSlider";
import { testinomialData } from "../LandingPage/LandingPageUtils";
import { HashScroll } from "react-hash-scroll";
import { useSubscriptionPlans } from "../../hooks/subscription-plans/useSubscriptionPlans";
import { Helmet } from "react-helmet";
export function Pricing() {
  const { ModalMain, setIsLoginOpen } = Modal();
  const [billMothly, setBillMonthly] = useState(true);
  const [discount, setDiscount] = useState(true);

  const { getSubscription, getProdPurchaseStatus } = usePricing();
  let location = useLocation();
  const [menuOpenState, setMenuOpenState] = useState(true);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const openModalVerifyMail = async () => setIsVerifyOpen(true);
  const [, setVerifyMailOpen] = useState(false);

  const [, setExistingEmail] = useState("");

  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    logFaEvent("price_page_visited");
    const sessionId = params.getAll("session_id")[0];

    if (sessionId) {
      getProdPurchaseStatus({ session_id: sessionId }).then((res) => {
        notifySuccess("you subscribed to plan successfully.");
        const user = JSON.parse(localStorage.getItem("user"));
        user.subscription = res.user.subscription;
        localStorage.setItem("user", JSON.stringify(user));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelProSub = async () => {
    if (isAuthenticated()) {
      const res = await getSubscription({
        plan: "pro",
        opt: billMothly ? "yearly" : "monthly",
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
        opt: billMothly ? "yearly" : "monthly",
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

  useEffect(() => {
    if (!location.hash.includes("#hash-section-2")) window.scrollTo(0, 0);
  }, [location]);

  const { plansList } = useSubscriptionPlans();

  const mergedArray = plansList?.map((item) => ({
    ...item,
    ...plansArray.find((i) => i.name === item.name),
  }));

  return (
    <>
      <div className="pricing-main">
        <Helmet>
          <meta name="description" content="Multiple formats: Static SVG, Animated SVG, PDF, and PNG. Daily updates" />
          <title>Experience premium collection in static and animated SVG and PNG</title>
        </Helmet>
        <div className="pricing-header">
          <div className="landingPage-Container">
            <LandingPageHeader
              menuOpenState={menuOpenState}
              setMenuOpenState={setMenuOpenState}
              mobileMenuOpenState={mobileMenuOpenState}
              setMobileMenuOpenState={setMobileMenuOpenState}
            />
          </div>
        </div>
        {discount && (
          <div className="offer-line">
            <p>
              We are giving away 50% flat discount for early birds. Use code
              “early50” to get flat 50% OFF. Offer is for limited time only.
            </p>
            <div className="close-icon" onClick={() => setDiscount(false)}>
              <CloseIcon />
            </div>
          </div>
        )}
        <div className="plans-details-section">
          <div className="landingPage-Container">
            <div className="inner-plans-container">
              <div className="plans-title">
                <OsBlueIcon />
                <h1>Plans & Features for Quality Hand Crafted Icons</h1>
              </div>
              <div className="plans-toggle">
                <div
                  className={billMothly ? "switch-active" : "switch-inactive"}
                >
                  <p>Billed Monthly</p>
                  <ToggleSwitch
                    isOn={billMothly}
                    id={"set-renew"}
                    onChange={(e) => setBillMonthly(e.target.checked)}
                  />
                  <p>Billed Annually (save 50%)</p>
                </div>
              </div>
              <div className="plans-grid">
                {mergedArray?.map((obj) => (
                  <PlansCard
                    planName={obj?.name}
                    planPrice={obj?.planPrice}
                    subscrption={obj?.subscrption}
                    featues={obj?.featues}
                    billMothly={billMothly}
                    setBillMonthly={setBillMonthly}
                    planPriceYearly={obj?.planPriceYearly}
                    planPriceMonthly={obj?.planPriceMonthly}
                    handelProSub={handelProSub}
                    handelAdvncSub={handelAdvncSub}
                    plansbillAnnually={obj?.billAnullay}
                    plansbillMonthly={obj?.billMonthly}
                  />
                ))}
              </div>
              <div className="plams-grid-bottom">
                <p> All prices are in US dollars.</p>
                <h5>
                  Enterprise plan coming soon!{" "}
                  <a href="/contactus">Contact Sales</a>
                </h5>
              </div>
              <div className="included-feature">
                <div className="includ-title">
                  <h2>All paid subscription include features</h2>
                </div>
                <div className="included-feature-grid">
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={support} alt="support" />
                      <div>
                        <h5>Priority support</h5>
                        <p>
                          Our support team will answer your query within 24
                          hours.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={bucket} alt="bucket" />
                      <div>
                        <h5>Add to bucket (soon)</h5>
                        <p>
                          You can add any icon or asset to created folder for
                          better org.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={Rotate} alt="rotate" />
                      <div>
                        <h5>Rotate (soon)</h5>
                        <p>Rotate icon 360 degree to experiment and use it.</p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={open} alt="open" />
                      <div>
                        <h5>OpenStroke</h5>
                        <p>
                          Allow manage the stroke thickness to have greater
                          control over the appearance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={broken} alt="broken" />
                      <div>
                        <h5>Broken stroke</h5>
                        <p>
                          Allow manage the stroke thickness to have greater
                          control over the appearance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={custom} alt="custom" />
                      <div>
                        <h5>Custom stroke</h5>
                        <p>
                          Set stroke as desired to match with your brand
                          tonality.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={allfil} alt="allfile" />
                      <div>
                        <h5>All file formats</h5>
                        <p>
                          Available formats are high quality png, full vector
                          support svg, and pdf file format.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={customColor} alt="custm" />
                      <div>
                        <h5>Custom color</h5>
                        <p>
                          Get all the icons to match the project you are
                          working. You just have to provide the primary color,
                          rest we'll manage.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="included-feature-item">
                    <div className="included-feaeture-item-inner">
                      <img src={customBg} alt="custombg" />
                      <div>
                        <h5>Custom background</h5>
                        <p>
                          Tweak with the icon using background shape, color to
                          build a consistent icon library.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <HashScroll hash="#hash-section-2">
                <div className="fequently-ask-question">
                  <div className="frequently-ask-question-inner">
                    <h2>Frequently asked questions</h2>
                    <div className="frequetly-questoin-grid">
                      <div className="frequnel-question-list">
                        <h5>What is OpenStroke®?</h5>
                        <p>
                          OpenStroke is basically an open path with stroke
                          weight applied to it which can modify without
                          recreating from scratch.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>What is a BrokenStroke?</h5>
                        <p>
                          Stroke converted to a shape is a broken stroke. Many
                          popular design software provides these features and
                          the general term used is outline stroke.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>Do you make custom icons?</h5>
                        <p>
                          Yes, We do provide custom icons services. If you want
                          to make a rough idea about the price and actual time
                          needed to create them, please drop a line on the
                          <a href="/contactus"> contact us</a> page.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>Can I modify icons?</h5>
                        <p>
                          Yes, We understand it very well and we do allow you to
                          modify icons as per need. You can adjust icons so they
                          fit in your project by changing their color, size, or
                          even by combining them together. Just avoid
                          manipulation of their shape. For example, if you need
                          to change the time shown by the clock icon, it's fine.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>How do I get about the new icons collection?</h5>
                        <p>
                          You'll get an email as soon as the new version is out
                          or if we add some great collection, you do not have to
                          do anything extra in order to get these emails.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>Will I get an invoice for my purchase?</h5>
                        <p>
                          Of course! Kindly go to your profile by clicking your
                          avatar on top right. Navigation from profile tab to
                          Invoices and download your invoice.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>What are the payment methods?</h5>
                        <p>
                          We are accepting Stripe as a payment method. Once
                          payment is made successfully, enjoy our premium icons
                          library or download the icon that you need.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>
                          Can I use downloaded icons to create work for a
                          client?
                        </h5>
                        <p>
                          You can use our icons for your projects as long as
                          they comply with our usage{" "}
                          <a href="/privacypolicy"> policy.</a>
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>
                          Is my subscription automatically renewed every month?
                        </h5>
                        <p>
                          Yes. Your subscription will renew automatically unless
                          you cancel this option (always with the original
                          price, no discounts apply for renewals). To cancel the
                          automatic renewal of your subscription and avoid
                          future non-desired payments, you must cancel your
                          subscription from your user’s profile.
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>
                          Can I cancel my subscription and ask for a refund of
                          my purchase?
                        </h5>
                        <p>
                          We want you to be happy. So, if you are not completely
                          satisfied with our services, we offer a 7-day refund
                          guarantee. You can get the full refund within 7 days
                          from the purchase date. You didn’t get to use the
                          service, that is, you haven’t downloaded any icon.
                        </p>
                        <p className="innerp">
                          {" "}
                          If that is your case, you can request the refund
                          through{" "}
                          <a href="mailto:hello@sketchish.com">
                            {" "}
                            hello@sketchish.com
                          </a>{" "}
                          You can only request a refund for the current billing
                          period. Please note that previous subscriptions cannot
                          be refunded. For more information, read our{" "}
                          <a href="/termsandconditions"> Terms of use.</a>
                        </p>
                      </div>
                      <div className="frequnel-question-list">
                        <h5>Do you have any other questions?</h5>
                        <p>
                          If you didn't find the answer to your question, please
                          <a href="mailto:hello@sketchish.com">
                            {" "}
                            drop an email.
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </HashScroll>
              <div className="company-overview-section">
                <div className="landingPage-Container">
                  <div className="company-overview-inner">
                    <p>You’re in a good company</p>
                    <div className="company-overview-grid">
                      <div className="brands-item-img">
                        <img src={invisionIcon} alt="brands-logo" />
                      </div>
                      <div className="brands-item-img">
                        <img src={mediumIcon} alt="brands-logo" />
                      </div>
                      <div className="brands-item-img">
                        <img src={notionIcon} alt="brands-logo" />
                      </div>
                      <div className="brands-item-img">
                        <img src={slackIcon} alt="brands-logo" />
                      </div>
                      <div className="brands-item-img">
                        <img src={zoomIcon} alt="brands-logo" />
                      </div>
                      <div className="brands-item-img">
                        <img src={anyDeskIcon} alt="brands-logo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testionomial-sldier-section">
          <div className="testionomial-sldier-section-container">
            <div className="testinomail-title">
              <h5>Voice of customers</h5>
              <h2>Tons of love around the world</h2>
            </div>
            <TestinomialSlider sliderData={testinomialData} />
          </div>
        </div>
      </div>
      {ModalMain()}
      <ResponsiveModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        closeOnOverlayClick={false}
        component={
          <VerifyMail
            setOpen={setIsVerifyOpen}
            setVerifyMailOpen={setVerifyMailOpen}
            setLoginOpen={setIsLoginOpen}
            setExistingEmail={setExistingEmail}
          />
        }
      />
    </>
  );
}
