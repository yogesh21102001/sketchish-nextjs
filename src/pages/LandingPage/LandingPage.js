/* global google */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import Aos from "aos";
import { LandingPageHeader } from "./LandingPageHeader";
import LandingPageFooter from "./LandingPageFooter";
import { SupportedOn } from './components/SupportOn/SupportOn'
import HeroSection from './components/HeroSection'
import StyleSection from './components/StyleSection'
// import PluginInfo from '../Pricing/PluginInfo/PluginInfo'
// import PluginSection from './components/PluginSection'
import ToolsSection from './components/ToolsSection'

import EmailSection from './components/EmailSection'
import { ResponsiveModal } from "../../components/ResponsiveModal";

import {
  ForgotPassword,
  Login,
  SetupNewPassword,
  SetupProfile,
  VerifyMail,
  VerifyMailSuccess,
} from "../../components/AUTH";


import AuthContext from "../../context/AuthProvider";

import { isEmpty } from "../../utils/helpers";
import useProduct from "../../hooks/product/useProduct";
import "./css/landingpagestyle.css";
import "./css/responsive.css";

export function LandingPage() {
  Aos.init({ duration: 1000 });
  const navigate = useNavigate();

  const [menuOpenState, setMenuOpenState] = useState(true);
  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  const [statistics, setStatistics] = useState({});
  const [styleSetAll, setStyleSetAll] = useState();

  const [authenticated, setAuthenticated] = useState(true);
  const [, setIsPopoverOpenOne] = useState(false);
  const [, setIsPopoverOpenTwo] = useState(false);
  const [, setIsPopoverOpenThree] = useState(false);
  const [, setCurrentUser] = useState({});
  const [, serProfileImg] = useState(false);
  const [resetHash, setResetHash] = useState("");
  const [passResetType, setPassResetType] = useState("CREATE_NEW_ACCT");

  // modal states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVerifyMailOpen, setVerifyMailOpen] = useState(false);
  const [isSetupNewPassword, setSetupNewPassword] = useState(false);
  const [isSetupProfile, setSetupProfile] = useState(false);
  const [getExistingEmail, setExistingEmail] = useState("");
  const [isForgotPassword, setForgotPassword] = useState(false);

  const { UseGetStyleSetAll, UseGetStatistics } = useProduct();

  const { auth } = useContext(AuthContext);

  const getAllStyleSet = async () => {
    const getData = await UseGetStyleSetAll();
    const getStatistics = await UseGetStatistics();
    setStatistics(getStatistics)
    const _data = []
    getData.map(_d => {
      if (_data.length < 4) {
        _data.push(_d)
      }
    })
    setStyleSetAll(_data);
  };



  useEffect(() => {
    getAllStyleSet();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      //if (user?.role === "admin") navigate("/admin/icons");
      setAuthenticated(true);

      if (localStorage.getItem("profileImg")) serProfileImg(true);
      setCurrentUser(JSON.parse(localStorage.getItem("user")));

      if (isEmpty(user.firstName) && isEmpty(user.lastName)) {
        setSetupProfile(true);
      } else {
        setSetupProfile(false);
      }
    } else {
      setAuthenticated(false);
      setIsPopoverOpenOne(false);
      setIsPopoverOpenTwo(false);
      setIsPopoverOpenThree(false);
    }
  }, [auth]);

  return (
    <div
      className="landingPage-root"
      onClick={(e) => {
        // eslint-disable-next-line no-var
        var container = document.getElementById("mobile-header");
        if (!container?.contains(e.target)) {
          setMobileMenuOpenState(false);
        }
      }}
    >
      <Helmet>
        <meta name="description" content="Download static and animated SVG, GIF, PNG, and PDF file format icons | Free consistent quality trending icons for UI, UX, designer, social-media, web & mobile" />
        <title>Download 100,000+ Free Vector SVG format Icons file and PNG</title>
      </Helmet>
      <div className="landingPage-header">
        <div className="landingPage-Container">
          <LandingPageHeader
            mobileMenuOpenState={mobileMenuOpenState}
            setMobileMenuOpenState={setMobileMenuOpenState}
          />
        </div>
      </div>
      <div className="containerWhite" ><HeroSection count={statistics?.productsCount}></HeroSection></div>
      <StyleSection navigate={navigate} styleSetAll={styleSetAll}></StyleSection>
      {/* <div className="containerWhite" style={{ padding: "50px 0px" }}> <PluginInfo /></div> */}
      <SupportedOn></SupportedOn>
      <div className="containerWhite"><ToolsSection></ToolsSection></div>
      <div className="containerWhite"><EmailSection></EmailSection></div>
      <ResponsiveModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        closeOnOverlayClick={false}
        component={
          <Login
            setOpen={setIsLoginOpen}
            ForgotPassword={setForgotPassword}
            userEmail={getExistingEmail}
            CreateAccount={setIsVerifyOpen}
          />
        }
      />

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
        isOpen={isVerifyMailOpen}
        onClose={() => setVerifyMailOpen(false)}
        closeOnOverlayClick={false}
        component={
          <VerifyMailSuccess
            setOpen={setVerifyMailOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
        }
      />

      <ResponsiveModal
        isOpen={isSetupNewPassword}
        onClose={() => {
          setSetupNewPassword(false);
          navigate("/");
        }}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        component={
          <SetupNewPassword
            hash={resetHash}
            setOpen={setSetupNewPassword}
            type={passResetType}
          />
        }
      />

      <ResponsiveModal
        isOpen={isSetupProfile}
        onClose={() => setSetupProfile(true)}
        showCloseIcon={false}
        component={<SetupProfile setOpen={setSetupProfile} />}
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
    </div >
  );
}
