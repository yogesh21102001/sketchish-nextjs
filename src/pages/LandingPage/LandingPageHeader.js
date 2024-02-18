import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import {
  ForgotPassword,
  // Login,
  SetupNewPassword,
  SetupProfile,
  VerifyMail,
  VerifyMailSuccess,
} from "../../components/AUTH";

import { Signup } from "../../components/AUTH-v2";
import { Login } from "../../components/Auth-v3/Login/Login";
import { SetNewPassword } from "../../components/Auth-v3";

import useAuth from "../../hooks/common/useAuth";
import AuthContext from "../../context/AuthProvider";
import useUser from "../../hooks/user/user";
import { notifySuccess } from "../../utils/notify";
import { isEmpty } from "../../utils/helpers";
import OutsideClickHandler from 'react-outside-click-handler'

import loupe from './Header/pictures/loupe.svg'
import logo from './Header/pictures/logo.svg'
import close from './Header/pictures/close.svg'
import menu from './Header/pictures/menu.svg'
import './Header/styles.scss'
import { Button } from "../../ui";

export function LandingPageHeader({
  mobileMenuOpenState,
  setMobileMenuOpenState,
}) {

  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { setPassword } = useAuth();
  const openModalLogin = async () => setIsLoginOpen(true);
  const [currentUser, setCurrentUser] = useState({});
  const [profileImg, serProfileImg] = useState(false);
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
  const [showDropDown, setShowDropDown] = useState(false)

  let location = useLocation();
  const path = location?.pathname?.split("/");

  const { setUpdateNewEmail } = useUser();
  function handleLogout() {
    navigate('/')
    localStorage.removeItem("user");
    setAuth({});
  }
  const verifyMail = async ({ hash, type }) => {
    const res = await setPassword({
      hash,
      type,
    });
    if (res === "Password set successfully") {
      notifySuccess("email verified successfully.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem("profileImg")) serProfileImg(true);
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      if (isEmpty(user.firstName) && isEmpty(user.lastName)) {
        setSetupProfile(true);
      } else {
        setSetupProfile(false);
      }
    } else {
      setCurrentUser({})
    }
  }, [auth, navigate]);
  useEffect(() => {
    if (path[1] === "accountvrfi") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("CREATE_NEW_ACCT");
        verifyMail({ hash, type: "CREATE_NEW_ACCT" });
        // setSetupNewPassword(true);
      }
    }
    else if (path[1] === "emailinvite") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("INVITE_EMAIL");
        setSetupNewPassword(true);
      }
    }
    else if (path[1] === "accountresetpass") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("RESET_PASSWORD");
        setSetupNewPassword(true);
      }
    }
    else if (path[1] === "emailupdate") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("UPDATE_EMAIL");
        (async () => {
          await setUpdateNewEmail({ hash: hash });
          navigate("/profile");
        })();
      }
    } else {
      setSetupNewPassword(false)
      setVerifyMailOpen(false)
      setForgotPassword(false)
    }
  }, []);
  return (
    <>
      <div className='header_new extended-container'>
        <div className='header_new__section'>
          <Link to="/icons?t=Classic&s=standard" className='header_new__icons'>
            <img alt='loupe' src={loupe} className='header_new__loupe' />
            <span>
              ICONS
            </span>
          </Link>

          <Link to="/style-set" className='header_new__link'>
            STYLES
          </Link>
        </div>

        <Link to="/" style={{ marginBottom: '-5px' }}><img alt='logo' src={logo} /></Link>

        <div className='header_new__section header_new__left-section'>
          {
            auth?.userLimit && !auth?.userLimit?.isDownloadble ? (<button onClick={() => navigate("/pricing")} className={"header_new__upgrade_btn"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clip-path="url(#clip0_12287_20488)">
                  <path d="M2.607 4.01175L2.1223 3.72094C2.00426 3.65011 1.85316 3.66871 1.75582 3.76605L-0.212132 5.73398C-0.277455 5.7993 -0.30904 5.89108 -0.297753 5.98277C-0.286466 6.07446 -0.233565 6.15583 -0.154349 6.20336L1.57411 7.24044C1.69985 6.12277 2.04446 5.02322 2.607 4.01175Z" fill="black" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.18983 9.57635L4.18963 9.57602L2.27391 7.66032L2.27358 7.66012L2.24766 7.6342C2.1839 7.57044 2.1522 7.48138 2.16134 7.39167C2.26955 6.32923 2.58989 5.28257 3.12181 4.32064C3.47997 3.67292 3.93416 3.06368 4.48402 2.51382C6.05871 0.939154 8.12024 0.150298 10.1755 0.149902C10.5717 0.149833 10.9677 0.179062 11.3599 0.23761C11.4904 0.25709 11.5928 0.359537 11.6123 0.490028C11.9746 2.91678 11.2143 5.48768 9.33605 7.36593C8.56741 8.13456 7.68261 8.71605 6.73911 9.10996C6.00528 9.41633 5.23595 9.60924 4.45815 9.68846C4.36844 9.69759 4.27938 9.66589 4.21561 9.60213L4.18983 9.57635ZM8.57602 3.27408C7.91542 2.61349 6.84439 2.61349 6.18379 3.27408C5.5232 3.93467 5.5232 5.00569 6.18379 5.66627C6.84439 6.32686 7.91542 6.32686 8.57602 5.66627C9.23661 5.00569 9.23661 3.93467 8.57602 3.27408Z" fill="black" />
                  <path d="M4.60943 10.2757L5.6466 12.0042C5.69413 12.0835 5.77551 12.1364 5.8672 12.1477C5.95889 12.1589 6.05066 12.1274 6.11599 12.062L8.08394 10.0941C8.18128 9.99676 8.19988 9.84566 8.12906 9.72762L7.83814 9.24277C7.55527 9.40009 7.26548 9.54039 6.97028 9.66364C6.20997 9.98107 5.41435 10.1851 4.60943 10.2757Z" fill="black" />
                  <path d="M1.68809 8.61817C1.80525 8.50101 1.80525 8.31106 1.68809 8.1939C1.57093 8.07675 1.38098 8.07675 1.26382 8.1939L0.279843 9.17787C0.162684 9.29503 0.162684 9.48498 0.279843 9.60213C0.397002 9.71929 0.586954 9.71929 0.704112 9.60213L1.68809 8.61817Z" fill="black" />
                  <path d="M2.42607 9.84812C2.54323 9.73097 2.54323 9.54102 2.42607 9.42386C2.30891 9.3067 2.11896 9.3067 2.0018 9.42386L0.279843 11.1458C0.162685 11.263 0.162685 11.4529 0.279843 11.5701C0.397002 11.6872 0.586954 11.6872 0.704112 11.5701L2.42607 9.84812Z" fill="black" />
                  <path d="M3.65604 10.5861C3.7732 10.4689 3.7732 10.279 3.65604 10.1618C3.53888 10.0447 3.34893 10.0447 3.23177 10.1618L2.24779 11.1458C2.13063 11.263 2.13064 11.4529 2.24779 11.5701C2.36495 11.6872 2.5549 11.6872 2.67206 11.5701L3.65604 10.5861Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_12287_20488">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              upgrade
            </button>) : <Link to='/pricing' className='header_new__link'>
              PRICING
            </Link>
          }
   
          {isEmpty(currentUser) && (
            <Link className='header_new__link' onClick={openModalLogin}>
              LOGIN
            </Link>)}

          {!isEmpty(currentUser) && (
            <>
              {/* <Link to='/profile' className='header_new__link'>
                {auth?.userLimit?.planName} PLAN {auth?.userLimit?.userLimit}/{auth?.userLimit?.planLimit}
              </Link> */}
              <span onClick={() => setShowDropDown(!showDropDown)} className='header_new__user-name_container'>
                {currentUser?.firstName && currentUser?.lastName
                  ? currentUser?.firstName[0] +
                  currentUser?.lastName[0]
                  : currentUser?.firstName
                    ? currentUser?.firstName[0]
                    : "?"}
              </span>
            </>
          )}

          {isEmpty(currentUser) && (<img
            alt={showDropDown ? 'close' : 'menu'}
            src={showDropDown ? close : menu}
            onClick={() => setShowDropDown(!showDropDown)}
            className='header_new__drop-down-menu_button'
          />)}

          {showDropDown && (
            <div className='header_new__drop-down-menu_block'>
              <OutsideClickHandler onOutsideClick={() => setTimeout(() => setShowDropDown(false), 100)}>
                <div className='header_new__drop-down-menu'>

                  {!isEmpty(currentUser) && (
                    <div className='header_new__drop-down-menu_container'>
                      {currentUser?.role == 'admin' &&
                        <Link to='admin/icons'>
                          Admin
                        </Link>}
                      <Link to='/profile'>
                        PROFILE
                      </Link>
                      <span onClick={handleLogout}>
                        LOGOUT
                      </span>
                    </div>
                  )}
                  {!isEmpty(currentUser) && (<div className='header_new__drop-down-menu_separator' />)}
                  <div className='header_new__drop-down-menu_container'>
                    <span className='login_mobile mobile-only' onClick={openModalLogin}>
                      LOGIN
                    </span>
                    <Link to='/icons?t=Classic&s=standard'>
                      ICONS
                    </Link>
                    <Link to='/style-set'>
                      STYLES
                    </Link>
                    <Link to='/pricing'>
                      PRICING
                    </Link>
                    <Link to='https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos'>
                      FIGMA PLUGIN
                    </Link>
                  </div>
                  <div className='header_new__drop-down-menu_separator' />
                  <div className='header_new__drop-down-menu_container'>
                    <Link to='/free-licence'>
                      FREE LICENCE
                    </Link>
                    <Link to='/pricing'>
                      PREMIUM LICENCE
                    </Link>
                    <Link to='https://discord.gg/QN3Zwf4KWK'>
                      ICON REQUEST
                    </Link>
                    <Link to='/contactus'>
                      CONTACT US
                    </Link>
                  </div>
                </div>
              </OutsideClickHandler>
            </div>
          )}
        </div>
      </div>
      <div className="mobile-header">
        <ResponsiveModal
          isOpen={isLoginOpen}
          onClose={() => { 
            sessionStorage.removeItem("accountInfo")
            sessionStorage.removeItem("loaded");
            setIsLoginOpen(false) 
          }}
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
        {/* <ResponsiveModal
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          closeOnOverlayClick={false}
          component={
            <Signup
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
          isOpen={isSetupProfile}
          onClose={() => setSetupProfile(true)}
          showCloseIcon={false}
          component={<SetupProfile setOpen={setSetupProfile} />}
        />

         */}

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
          showCloseIcon={false}
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
    </>
  );
}
