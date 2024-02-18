import "./style.css";
import { Tab } from "../../containers/Tab";
import { ProfileTab, HistoryTab, InvoiceTab, SettingTab } from "../TabPages";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import logFaEvent from "../../firebaseConfig";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import MyBucket from "../TabPages/MyBucket";

export function Profile() {
  const navigate = useNavigate();
  const [menuOpenState, setMenuOpenState] = useState(true);
  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  useEffect(() => {
    logFaEvent("profile_page_visited");
    if (!isAuthenticated) navigate("/");
  });

  const TabValues = [
    {
      header: "Profile",
      page: <ProfileTab />,
    },
    {
      header: "My Bucket",
      page: <MyBucket />,
    },
    { header: "History", page: <HistoryTab /> },
    { header: "Invoice", page: <InvoiceTab /> },
    { header: "Settings", page: <SettingTab /> },
  ];
  return (
    <div
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
      <div className="landingPage-header profile-page-header">
        <div className="landingPage-Container">
          <LandingPageHeader
            menuOpenState={menuOpenState}
            setMenuOpenState={setMenuOpenState}
            mobileMenuOpenState={mobileMenuOpenState}
            setMobileMenuOpenState={setMobileMenuOpenState}
          />
        </div>
      </div>
      <div className="profile-con">
        <Tab TabProperties={TabValues} />
      </div>
    </div>
  );
}
