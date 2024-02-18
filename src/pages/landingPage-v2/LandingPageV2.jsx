import React, { Suspense, lazy, useContext, useEffect, useState } from "react";

// Styles
import Styles from "./style.module.css";

import { Helmet } from "react-helmet";

// Components

import { isAuthenticated } from "../../utils/helpers";

import LazyLoader from "../../containers/lazyComopnentLoader/LazyLoader";

import MainLandingSection from "./OnPageComponents/MainLandingSection/MainLandingSection";

import { useNavigate } from "react-router-dom";

import Aos from "aos";

import { ResponsiveModal } from "../../components/ResponsiveModal";

import { ForgotPassword } from "../../components/AUTH";

import { CongPopUp, SetNewPassword } from "../../components/Auth-v3";
import { Login } from "../../components/Auth-v3/Login/Login";

import AuthContext from "../../context/AuthProvider";

import useProduct from "../../hooks/product/useProduct";
import { isEmpty } from "../../utils/helpers";
import NavBar from "../../components/NavBar/NavBar";

const IllustrationSection = lazy(() =>
  import("./OnPageComponents/IllustrationSection/IllustrationSection")
);
const UseCase = lazy(() => import("./OnPageComponents/UseCase/UseCase"));
const SliderSection = lazy(() =>
  import("./OnPageComponents/SliderSection/SliderSection")
);
const FigureSection = lazy(() =>
  import("./OnPageComponents/FigursSection/FigureSection")
);
const PluginSection = lazy(() =>
  import("./OnPageComponents/PluginSection/PluginSection")
);
const FavoriteApps = lazy(() =>
  import("./OnPageComponents/FavoriteAppsSection/FavoriteApps")
);
const KeyFeatureSection = lazy(() =>
  import("./OnPageComponents/KeyFeatureSection/KeyFeatureSection")
);
const CustomizeCardsSection = lazy(() =>
  import("./OnPageComponents/CustomizeCardsSection/CustomizeCardsSection")
);
const CustomizationExampleSection = lazy(() =>
  import(
    "./OnPageComponents/CustomizationExampleSection/CustomizationExampleSection"
  )
);
const ExperienceTheDiff = lazy(() =>
  import("./OnPageComponents/ExperienceTheDiff/ExperienceTheDiff")
);
const PricingSection = lazy(() =>
  import("./OnPageComponents/PricingSection/PricingSection")
);
const Footer = lazy(() => import("../../components/Footer-v2/Footer"));

export const LandingPageV2 = () => {
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
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const { UseGetStyleSetAll, UseGetStatistics } = useProduct();

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") navigate("/admin/icons");
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

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      //  navigate("/signin");
      setIsLoginOpen(true);
    }
  }, []);

  return (
    <div className={Styles.landing_page_wraper}>
      <Helmet>
        <meta
          name="description"
          content="90,000+ vector icons, 10,000+ free icons, 20+ unique styles, 7+ animated style, animated svg, social icons, brand logos and much more."
        />
        <title>Openstrokeicons | One icon library to replace them all</title>
      </Helmet>
      <NavBar />
      <MainLandingSection
        isAuthenticated={isAuthenticated}
        setIsLoginOpen={setIsLoginOpen}
      />
      <LazyLoader>
        <Suspense>
          <IllustrationSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <UseCase
            isAuthenticated={isAuthenticated}
            setIsLoginOpen={setIsLoginOpen}
          />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <SliderSection
            isAuthenticated={isAuthenticated}
            setIsLoginOpen={setIsLoginOpen}
          />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <FigureSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <PluginSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <FavoriteApps />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <KeyFeatureSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <CustomizeCardsSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <CustomizationExampleSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <PricingSection />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <ExperienceTheDiff />
        </Suspense>
      </LazyLoader>

      <LazyLoader>
        <Suspense>
          <Footer isAuthenticated={isAuthenticated} />
        </Suspense>
      </LazyLoader>

      {/* Modals */}

      <ResponsiveModal
        isOpen={isLoginOpen}
        onClose={() => {
          sessionStorage.removeItem("accountInfo");
          sessionStorage.removeItem("loaded");
          setIsLoginOpen(false);
        }}
        closeOnOverlayClick={false}
        component={
          <Login
            setOpen={setIsLoginOpen}
            ForgotPassword={setForgotPassword}
            userEmail={getExistingEmail}
            CreateAccount={setIsVerifyOpen}
            setIsSignUpSuccess={setIsSignUpSuccess}
          />
        }
      />

      <ResponsiveModal
        isOpen={isSignUpSuccess}
        onClose={() => {
          sessionStorage.removeItem("accountInfo");
          sessionStorage.removeItem("loaded");
          setIsSignUpSuccess(false);
        }}
        closeOnOverlayClick={false}
        component={<CongPopUp setOpen={setIsSignUpSuccess} />}
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

      <ResponsiveModal
        isOpen={isSetupNewPassword}
        onClose={() => {
          setSetupNewPassword(false);
          navigate("/");
        }}
        showCloseIcon={isSetupNewPassword}
        closeOnOverlayClick={false}
        component={
          <SetNewPassword
            hash={resetHash}
            setOpen={setSetupNewPassword}
            type={passResetType}
          />
        }
      />
    </div>
  );
};
