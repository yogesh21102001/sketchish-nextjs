import React, { useState } from "react";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "./LandingPageFooter";
import { Helmet } from "react-helmet";

export const LandingPageStory = (props) => {
    const [menuOpenState, setMenuOpenState] = useState(true);
    const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
    return (
        <div
            className="featurPage-root"
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
                <meta name="description" content="Discover the most consistent, clean, and organise icon sets. Experience the most trending icon design tool for free. Each asset created by designers carefully" />
                <title>Designing icons since 2009</title>
            </Helmet>
            <div className="feature-header">
                <div className="landingPage-Container">
                    <LandingPageHeader
                        menuOpenState={menuOpenState}
                        setMenuOpenState={setMenuOpenState}
                        mobileMenuOpenState={mobileMenuOpenState}
                        setMobileMenuOpenState={setMobileMenuOpenState}
                    />
                </div>
            </div>
            <h1>Story - under construction!</h1>
        </div>
    );
};