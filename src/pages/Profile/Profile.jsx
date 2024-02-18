import React, { useState, useContext, useEffect } from "react";
import Styles from "./style.module.css";
import NavBar from "../../components/NavBar/NavBar";

import { User, History, Invoices, Setting, Edit, Stars } from "./assets";

import useProduct from "../../hooks/product/useProduct";

import { useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { UpdateEmail } from "../../components/updateEmail/updateEmail";
import UpdateProfile from "./EditProfile";
import EditProfile from "./EditProfile/EditProfile";
import useUser from "../../hooks/user/user";
import AuthContext from "../../context/AuthProvider";
import { formatDate, isAuthenticated } from "../../utils/helpers";
import ProfileInterface from "./ProfileInterface/ProfileInterface";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import pencil from "./pictures/pencil.svg";
import rocket from "./pictures/rocket.svg";
import HistoryTab from "./ProfileInterface/HistoryTab/HistoryTab";
import arrow from "./assets/arrow.svg";
import InvoicesTab from "./ProfileInterface/InvoicesTab/InvoicesTab";
import SettingsTab from "./ProfileInterface/SettingsTab/SettingsTab";
import { Button } from "../../ui";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ProfileNew = () => {
  const { auth } = useContext(AuthContext);
  const { userLimit } = auth;
  // modal states
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [getDisabled, setIsDisabled] = useState(true);

  const { getDownloadProduct } = useProduct();
  const navigate = useNavigate();
  const { useGetProfile, UseDownloadHistory, useGetInvoice } = useUser();
  const { invoice } = useGetInvoice();
  console.log(invoice);
  const { userDet, mutate } = useGetProfile();
  const handelEdit = () => {
    setIsDisabled(!getDisabled);
  };
  const [userHis, setUserHis] = useState([]);
  const getUserHistory = async () => {
    try {
      const data = await UseDownloadHistory();
      setUserHis(data);
      console.log(data);
    } catch (err) {}
  };

  const hendleDownload = async ({
    id,
    isCopy,
    label,
    isFileType,
    styleset,
  }) => {
    const setPreferences = {
      id,
      name: label,
      type: isFileType,
      size: 48,
      isCopy,
      searchKeyword: null,
      strokeWidth:
        styleset.toLowerCase() == "slim"
          ? 1.0
          : styleset.toLowerCase() == "light"
          ? 1.5
          : 2.0,
      bgColor: "notset",
      brokeStroke: false,
      oldColors: "rgb(30, 48, 80)",
      // newColors: [],
      animated: false,
    };
    getDownloadProduct(setPreferences);
  };

  const [activeTab, setActiveTab] = useState("history");
  const [openTabs, setOpenTabs] = useState(0);
  const [paginationLength, setPaginationLength] = useState(0);
  const [length, setLength] = useState(0);

  const handleNext = () => {
    if (openTabs + 1 < paginationLength) {
      setOpenTabs(openTabs + 1);
    }
  };
  useEffect(() => {
    if (activeTab === "history") {
      setPaginationLength(Math.ceil(userHis?.length / 50));
      setLength(userHis?.length);
    }

    if (activeTab === "invoices") {
      setPaginationLength(Math.ceil(invoice?.length / 50));
      setLength(invoice?.length);
    }
  }, [activeTab, userHis, invoice]);

  useEffect(() => {
    if (isAuthenticated()) {
      getUserHistory();
    }
    if (userDet && userDet.photo) {
      localStorage.setItem("profileImg", userDet?.photo);
    }
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div className={Styles.wraper}>
      <NavBar />
      <div className={Styles.cont}>
        <div className={Styles.lft}>
          <div className={Styles.profile_sec}>
            <div className={Styles.profile_img_cont}>
              <div className={Styles.profile_img}>
                {[
                  userDet?.firstName?.charAt(0)?.toUpperCase(),
                  userDet?.lastName?.charAt(0)?.toUpperCase(),
                ].join("")}
              </div>
              <Edit
                className={Styles.edit_svg}
                onClick={() => setIsUpdateProfileOpen(true)}
              />
            </div>
            <div className={Styles.name_and_email}>
              <div className={Styles.txt}>
                <h3>
                  {userDet?.firstName} {userDet?.lastName}
                </h3>
                <p>{userDet?.email}</p>
              </div>
              <Edit
                className={Styles.edit_svg}
                onClick={() => setIsUpdateEmailOpen(true)}
              />
            </div>
            <div className={Styles.cradit_bar_cont}>
              <div className={Styles.cradit_bar}>
                <div
                  className={Styles.bar}
                  style={{
                    width: `${
                      (Number(userLimit?.userLimit) /
                        Number(userLimit?.planLimit)) *
                      100
                    }%`,
                    height: "100%",
                    background: "#7238FA",
                  }}
                ></div>
              </div>
              <p>{userLimit?.userLimit} credit used</p>
            </div>
            <div className={Styles.plane_info_cont}>
              <div className={Styles.plane_info}>
                <p>Plan</p>
                <p>{userLimit?.planName?.toLowerCase()}</p>
              </div>
              <div className={Styles.plane_info}>
                <p>Credits</p>
                <p>{Number(userLimit?.planLimit)}</p>
              </div>
              <div className={Styles.plane_info}>
                <p>Renewal</p>
                <p>{formatDate(userLimit?.planExpiry)}</p>
              </div>
            </div>
          </div>
          <div className={Styles.tab_cont}>
            <div
              className={`${Styles.tabs} ${
                activeTab == "history" && Styles.activ
              }`}
              onClick={() => {
                setActiveTab("history");
              }}
            >
              <History />
              <p>History</p>
            </div>
            <div
              className={`${Styles.tabs} ${
                activeTab == "invoices" && Styles.activ
              }`}
              onClick={() => {
                setActiveTab("invoices");
              }}
            >
              <Invoices />
              <p>Invoices</p>
            </div>
            <div
              className={`${Styles.tabs} ${
                activeTab == "settings" && Styles.activ
              }`}
              onClick={() => {
                setActiveTab("settings");
              }}
            >
              <Setting />
              <p>Settings</p>
            </div>
          </div>
          <div className={Styles.btn_cont}>
            <Button
              width={"100%"}
              style={{
                background: "linear-gradient(90deg, #5EA6E8 0%, #6D56FB 100%)",
                color: "white",
              }}
              onClick={() => navigate("/pricing")}
            >
              Upgrade to Advance <Stars />
            </Button>
            <p>50 credits daily + Animate icons</p>
          </div>
        </div>
        <div className={Styles.rgt}>
          <h3 className={Styles.tab_name}>{activeTab}</h3>
          {activeTab == "history" && (
            <HistoryTab
              userHis={userHis}
              openTabs={openTabs}
              hendelDownload={hendleDownload}
            />
          )}

          {activeTab === "invoices" && (
            <InvoicesTab userInvoices={invoice} openTabs={openTabs} />
          )}

          {activeTab === "settings" && <SettingsTab email={userDet?.email} />}

          {(activeTab === "invoices" || activeTab === "history") &&
            paginationLength > 1 && (
              <>
                <div className="profile-interface__pagination">
                  {Array.from({ length: paginationLength }, (_, index) =>
                    index === 0 ||
                    index === paginationLength - 1 ||
                    (index + 4 > openTabs && index - 4 < openTabs) ? (
                      <div
                        key={index}
                        className={`profile-interface__pagination_button ${
                          openTabs === index
                            ? "profile-interface__pagination_active-button"
                            : ""
                        }`}
                        onClick={() => setOpenTabs(index)}
                      >
                        {index + 1}
                      </div>
                    ) : index + 4 === openTabs || index - 4 === openTabs ? (
                      <span
                        key={index}
                        className="profile-interface__three-dots"
                      >
                        ...
                      </span>
                    ) : null
                  )}

                  <div
                    className="profile-interface__next-button"
                    onClick={handleNext}
                  >
                    <span>Next</span>

                    <img alt="arrow" src={arrow} />
                  </div>
                </div>

                <span className="profile-interface__counter">
                  {/* {openTabs * 10 + 1}-{openTabs * 10 + 10} of {length} */}
                </span>
              </>
            )}
        </div>
      </div>
      <ResponsiveModal
        isOpen={isUpdateEmailOpen}
        onClose={() => setIsUpdateEmailOpen(true)}
        showCloseIcon={false}
        component={
          <UpdateEmail setOpen={setIsUpdateEmailOpen} user={userDet} />
        }
      />
      <ResponsiveModal
        isOpen={isUpdateProfileOpen}
        onClose={() => setIsUpdateProfileOpen(true)}
        showCloseIcon={false}
        component={
          <UpdateProfile
            mutate={mutate}
            setOpen={setIsUpdateProfileOpen}
            user={userDet}
          />
        }
      />
    </div>
  );
};
