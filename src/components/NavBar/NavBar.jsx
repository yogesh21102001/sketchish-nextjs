import React, { useRef } from "react";
import Styles from "./styles.module.css";
import "./styles.scss";

import { useContext, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button } from "../../ui";
import { ResponsiveModal } from "../ResponsiveModal";

import { ForgotPassword } from "../AUTH";

import { Login, SetNewPassword, CongPopUp } from "../Auth-v3";

import OutsideClickHandler from "react-outside-click-handler";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/common/useAuth";
import useUser from "../../hooks/user/user";
import {
  isAuthenticated,
  isEmpty,
  replaceHyphensWithSpaces,
} from "../../utils/helpers";
import { notifySuccess } from "../../utils/notify";

import SearchBar from "../Searchbar-v2/SearchBar";

// assets
import {
  BrandLogo,
  BrandName,
  BrandNameWhite,
  CloseMenu,
  MenuSvg,
  TrilSvg,
} from "./assets/images";

const NavBar = ({ setIsBcket, isBucket }) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { userLimit } = auth;
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
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const style = searchParams.get("s");

  const { search } = useParams();
  const keyWord = replaceHyphensWithSpaces(search);
  const q = searchParams.get("search");

  const windowWidth = useRef(window.innerWidth);

  let location = useLocation();
  const path = location?.pathname?.split("/");

  const { setUpdateNewEmail } = useUser();
  function handleLogout() {
    navigate("/");
    localStorage.removeItem("user");
    setAuth({});
    setShowDropDown(false);
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
      console.log(">>>>", JSON.parse(localStorage.getItem("user")));
      if (isEmpty(user.firstName) && isEmpty(user.lastName)) {
        setSetupProfile(true);
      } else {
        setSetupProfile(false);
      }
    } else {
      setCurrentUser({});
    }
  }, [auth, path[1]]);

  useEffect(() => {
    if (path[1] === "accountvrfi") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("CREATE_NEW_ACCT");
        verifyMail({ hash, type: "CREATE_NEW_ACCT" });
        // setSetupNewPassword(true);
      }
    } else if (path[1] === "emailinvite") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("INVITE_EMAIL");
        setSetupNewPassword(true);
      }
    } else if (path[1] === "accountresetpass") {
      const hash = path[2];
      if (hash && hash.length === 24) {
        setResetHash(hash);
        setPassResetType("RESET_PASSWORD");
        setSetupNewPassword(true);
      }
    } else if (path[1] === "emailupdate") {
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
      setSetupNewPassword(false);
      setVerifyMailOpen(false);
      setForgotPassword(false);
    }
  }, []);

  if (path[1] === "signin") {
    return (
      <div
        className={`${Styles.nav_wraper}`}
        style={{
          border: "none",
        }}
      >
        <div className={`${Styles.nav_cont}`}>
          <div className={Styles.lft}>
            <div
              className={Styles.brandLogo_cont}
              onClick={() => navigate("/")}
            >
              <BrandLogo className={Styles.brand_icon} />
              {isAuthenticated() ? (
                <BrandNameWhite className={Styles.brand_name} />
              ) : (
                <BrandName className={Styles.brand_name} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`${Styles.nav_wraper}`}>
        <div
          className={`${Styles.nav_cont}  ${
            isAuthenticated() && Styles.nav_black
          }`}
        >
          <div className={Styles.lft}>
            <div
              className={Styles.brandLogo_cont}
              onClick={() => navigate("/")}
            >
              <BrandLogo className={Styles.brand_icon} />
              {isAuthenticated() ? (
                <BrandNameWhite className={Styles.brand_name} />
              ) : (
                <BrandName className={Styles.brand_name} />
              )}
            </div>
            <div className={Styles.link_cont}>
              <Link
                to={"/icons"}
                className={`${Styles.link} ${Styles.icons} ${
                  path[1] == "icons" && isAuthenticated() && Styles.active_link
                }`}
              >
                Icons
              </Link>
              {isAuthenticated() && (
                <Link
                  to={"/bucket"}
                  className={`${Styles.link} ${Styles.icons} ${
                    path[1] == "bucket" &&
                    isAuthenticated() &&
                    Styles.active_link
                  }`}
                >
                  My Bucket
                </Link>
              )}
              {!isAuthenticated() && (
                <>
                  <Link
                    to={"/pricing"}
                    className={`${Styles.link} ${Styles.pricing}`}
                  >
                    Pricing
                  </Link>
                  <Link
                    onClick={() => {
                      window.open(
                        "https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos",
                        "_blank"
                      );
                    }}
                    className={Styles.link}
                  >
                    Figma Plugin
                  </Link>
                  <Link
                    onClick={() => {
                      window.open("https://discord.com/invite/QN3Zwf4KWK");
                    }}
                    className={Styles.link}
                  >
                    Icon Request
                  </Link>
                </>
              )}
              <a
                className={Styles.product_launch_bedg}
                href="https://www.producthunt.com/posts/openstrokeicons?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-openstrokeicons"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=425836&theme=light"
                  alt="openstrokeicons - Join&#0032;one&#0032;icon&#0032;library&#0032;to&#0032;replace&#0032;all | Product Hunt"
                />
              </a>
            </div>
          </div>
          <div className={Styles.rgt}>
            <div className={Styles.search_bar_cont}>
              <SearchBar
                className={Styles.black_nav_search}
                defaultValue={keyWord ? keyWord : !q ? "" : q}
              />
            </div>
            {isAuthenticated() ? (
              <div className={Styles.plane_info_and_profile}>
                <div className={Styles.text_cont}>
                  <h3>{userLimit?.planName?.toLowerCase()} plan</h3>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/pricing")}
                  >
                    Upgrade
                  </p>
                </div>
                <div
                  className={Styles.user_propile}
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  {currentUser?.firstName && currentUser?.lastName
                    ? currentUser?.firstName[0] + currentUser?.lastName[0]
                    : currentUser?.fullName
                    ? currentUser?.fullName[0]
                    : currentUser?.firstName
                    ? currentUser?.firstName[0]
                    : ""}
                </div>
                {showDropDown && (
                  <div className="header_new__drop-down-menu_block">
                    <OutsideClickHandler
                      onOutsideClick={() =>
                        setTimeout(() => setShowDropDown(false), 100)
                      }
                    >
                      <div className="header_new__drop-down-menu">
                        {!isEmpty(currentUser) && (
                          <div className="header_new__drop-down-menu_container">
                            {currentUser?.role == "admin" && (
                              <Link to="admin/icons">Admin</Link>
                            )}
                            <Link to="/profile">PROFILE</Link>
                            <span onClick={handleLogout}>LOGOUT</span>
                          </div>
                        )}
                        {!isEmpty(currentUser) && (
                          <div className="header_new__drop-down-menu_separator" />
                        )}
                        <div className="header_new__drop-down-menu_container">
                          <span
                            className="login_mobile mobile-only"
                            onClick={openModalLogin}
                          >
                            LOGIN
                          </span>
                          <Link to="/pricing">PRICING</Link>
                          <Link to="https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos">
                            FIGMA PLUGIN
                          </Link>
                        </div>
                        <div className="header_new__drop-down-menu_separator" />
                        <div className="header_new__drop-down-menu_container">
                          <Link to="/free-licence">FREE LICENCE</Link>
                          <Link to="/pricing">PREMIUM LICENCE</Link>
                          <Link to="https://discord.gg/QN3Zwf4KWK">
                            ICON REQUEST
                          </Link>
                          <Link to="/contactus">CONTACT US</Link>
                        </div>
                      </div>
                    </OutsideClickHandler>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button className={Styles.login_btn} onClick={openModalLogin}>
                  Login
                </Button>
                <Button
                  className={Styles.update_button}
                  onClick={() => navigate("./pricing")}
                >
                  Try Free for 1 Month{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <g filter="url(#filter0_dif_13228_2166)">
                      <path
                        d="M15 4L17.7009 11.2991L25 14L17.7009 16.7009L15 24L12.2991 16.7009L5 14L12.2991 11.2991L15 4Z"
                        fill="url(#paint0_linear_13228_2166)"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_dif_13228_2166"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="1" />
                        <feGaussianBlur stdDeviation="2.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.996078 0 0 0 0 0.815686 0 0 0 0 0.0980392 0 0 0 0.4 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_13228_2166"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_13228_2166"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite
                          in2="hardAlpha"
                          operator="arithmetic"
                          k2="-1"
                          k3="1"
                        />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.992157 0 0 0 0 0.819608 0 0 0 0 0.121569 0 0 0 0.15 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="shape"
                          result="effect2_innerShadow_13228_2166"
                        />
                        <feGaussianBlur
                          stdDeviation="0.25"
                          result="effect3_foregroundBlur_13228_2166"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear_13228_2166"
                        x1="25"
                        y1="4"
                        x2="6.54271"
                        y2="25.3346"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.00428621" stop-color="#EAFF00" />
                        <stop offset="1" stop-color="#FFCF88" />
                      </linearGradient>
                    </defs>
                  </svg>
                </Button>

                {!showDropDown ? (
                  <MenuSvg
                    className={Styles.menu_svg}
                    onClick={() => setShowDropDown(!showDropDown)}
                  />
                ) : (
                  <CloseMenu
                    className={Styles.menu_svg}
                    onClick={() => setShowDropDown(!showDropDown)}
                  />
                )}

                {showDropDown && (
                  <div className="header_new__drop-down-menu_block">
                    <OutsideClickHandler
                      onOutsideClick={() =>
                        setTimeout(() => setShowDropDown(false), 100)
                      }
                    >
                      <div className="header_new__drop-down-menu">
                        {!isEmpty(currentUser) && (
                          <div className="header_new__drop-down-menu_container">
                            {currentUser?.role == "admin" && (
                              <Link to="admin/icons">Admin</Link>
                            )}
                            <Link to="/profile">PROFILE</Link>
                            <span onClick={handleLogout}>LOGOUT</span>
                          </div>
                        )}
                        {!isEmpty(currentUser) && (
                          <div className="header_new__drop-down-menu_separator" />
                        )}
                        <div className="header_new__drop-down-menu_container">
                          <span
                            className="login_mobile mobile-only"
                            onClick={openModalLogin}
                          >
                            LOGIN
                          </span>
                          <Link to="/pricing">PRICING</Link>
                          <Link to="https://www.figma.com/community/plugin/1271430140634481741/OpenStroke-Icons---Vector-file%2C-SVG-%2C-Emojis-%26-Brand-Logos">
                            FIGMA PLUGIN
                          </Link>
                        </div>
                        <div className="header_new__drop-down-menu_separator" />
                        <div className="header_new__drop-down-menu_container">
                          <Link to="/free-licence">FREE LICENCE</Link>
                          <Link to="/pricing">PREMIUM LICENCE</Link>
                          <Link to="https://discord.gg/QN3Zwf4KWK">
                            ICON REQUEST
                          </Link>
                          <Link to="/contactus">CONTACT US</Link>
                        </div>
                      </div>
                    </OutsideClickHandler>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={Styles.search_bar_cont_resp}>
        <SearchBar
          className={Styles.black_nav_search}
          defaultValue={keyWord ? keyWord : !q ? "" : q}
        />
      </div>
      <div>
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
};

export default NavBar;