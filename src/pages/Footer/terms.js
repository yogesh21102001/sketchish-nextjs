import terms from "../../assets/dummyData/terms";
import "./style.css";
import { useEffect, useState } from "react";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import colorine from "../LandingPage/assets/images/color-line.svg";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { VerifyMail } from "../../components/AUTH";
import Footer from "../../components/Footer-v2/Footer";
import NavBar from "../../components/NavBar/NavBar";

export function Terms() {
  const [menuOpenState, setMenuOpenState] = useState(true);

  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const openModalVerifyMail = async () => setIsVerifyOpen(true);
  const [, setVerifyMailOpen] = useState(false);
  const [, setIsLoginOpen] = useState(false);
  const [, setExistingEmail] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <NavBar />
      <div className="terms-root">
        <div className="colior-line">
          <img src={colorine} alt="Bluroverlay" />
        </div>

        <div className="pri-poli-section">
          <div className="pri-poli-container">
            <div>
              <h4 className="pri-poli-heading">Terms of Use</h4>
            </div>
            <div className="pri-pol-content">
              {terms.map((data) => (
                <div key={data.id}>
                  <div>
                    <div className="privacy-policy-que-text">
                      <p>{data.que}</p>
                    </div>
                    <div className="privacy-policy-ans-text">
                      <p>{typeof data != "string" && data.ans()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
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
