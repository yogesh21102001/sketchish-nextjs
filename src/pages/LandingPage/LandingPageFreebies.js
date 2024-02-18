import LandingPageFooter from "./LandingPageFooter";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import interfaceimg from "./assets/images/interface.svg";
import freshFruits from "./assets/images/freshFruits.svg";
import freshVegetables from "./assets/images/freshVegetables.svg";
import flatEmojis from "./assets/images/flatEmojis.svg";
import socialLogos from "./assets/images/socialLogos.svg";
import countryFlag from "./assets/images/countryFlag.svg";
import colorine from "./assets/images/color-line.svg";
import { Helmet } from "react-helmet";
import "./css/landingpagestyle.css";
import "./css/responsive.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VerifyMail, Login, ForgotPassword } from "../../components/AUTH";
import { ResponsiveModal } from "../../components/ResponsiveModal";

export function LandingPageFreebies() {
  const navigate = useNavigate();
  const [menuOpenState, setMenuOpenState] = useState(true);
  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [, setVerifyMailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);

  const [, setExistingEmail] = useState("");

  return (
    <div
      className="freebies-root"
      onClick={(e) => {
        // eslint-disable-next-line no-var
        var container = document.getElementById("header");
        var container2 = document.getElementById("mobile-header");
        if (!container?.contains(e.target)) {
          setMenuOpenState(false);
        }
        if (!container2?.contains(e.target)) {
          setMobileMenuOpenState(false);
        }
      }}
    >
      <Helmet>
        <meta name="description" content="Trending style sets, animated, svg, open-stroke, solid, button, design, color, flat, ios 17, apple, google-material, duel, 3D, Figma, XD, Software supported" />
        <title>Explore thousands of free icons for your projects</title>
      </Helmet>
      <div className="freebies-header">
        <div className="landingPage-Container">
          <LandingPageHeader
            menuOpenState={menuOpenState}
            setMenuOpenState={setMenuOpenState}
            mobileMenuOpenState={mobileMenuOpenState}
            setMobileMenuOpenState={setMobileMenuOpenState}
          />
        </div>
        <div className="colior-line">
          <img src={colorine} alt="Bluroverlay" />
        </div>
        <div className="freebies-section1">
          <div className="landingPage-Container">
            <div className="freebies-inner">
              <h1>Freebies</h1>
              <div className="freebies-grid">
                <div
                  className="freebies-grid-item"
                  onClick={() => { navigate("/icons/Stroke-Icons"); }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={interfaceimg} alt="interfaceimg" />
                    <div>
                      <p>Interface Essential</p>
                      <span>21 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
                <div
                  className="freebies-grid-item"
                  onClick={() => { navigate("/icons/Dueltone-Icons"); }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={freshFruits} alt="freshFruits" />
                    <div>
                      <p>Fresh Fruits</p>
                      <span>164 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
                <div
                  className="freebies-grid-item"
                  onClick={() => { navigate("/icons/Solid-Icons"); }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={freshVegetables} alt="freshVegetables" />
                    <div>
                      <p>Fresh Vegetables</p>
                      <span>164 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
                <div
                  className="freebies-grid-item"
                  onClick={() => {
                    navigate("/icons/Monochrome-Icons"); 
                  }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={flatEmojis} alt="flatEmojis" />
                    <div>
                      <p>Flat Emojis</p>
                      <span>176 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
                <div
                  className="freebies-grid-item"
                  onClick={() => { navigate("/icons/Color-Icons"); }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={socialLogos} alt="socialLogos" />
                    <div>
                      <p>Social Logos</p>
                      <span>196 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
                <div
                  className="freebies-grid-item"
                  onClick={() => { navigate("/icons/Color-Icons"); }}
                >
                  <div className="freebies-grid-item-inner">
                    <img src={countryFlag} alt="countryFlag" />
                    <div>
                      <p>Country Flag</p>
                      <span>196 icons</span>
                    </div>

                  </div>
                  <div className="bottom-text">
                    <h5>
                      Icons set for free but please credit us with a link.
                      Licensed under the CC 4.0 (creative commons).
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <ResponsiveModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        closeOnOverlayClick={false}
        component={
          <Login
            setOpen={setIsLoginOpen}
            ForgotPassword={setForgotPassword}
            CreateAccount={setIsVerifyOpen}
          />
        }
      />
      <ResponsiveModal
        isOpen={isForgotPassword}
        onClose={() => setForgotPassword(false)}
        closeOnOverlayClick={false}
        component={
          <ForgotPassword
            setOpen={setForgotPassword}
            setVerifyMailOpen={setVerifyMailOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
        }
      />
    </div>
  );
}
