import React, { useState, useEffect } from "react";
import Styles from "./style.module.css";
import CommonStyle from "../../style/commonStyle.module.css";

// Components
import { Helmet } from "react-helmet";
import { SearchBar } from "../IconResult/components";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";

import useProduct from "../../hooks/product/useProduct";

import {
  FigureSection,
  PluginSection,
} from "../landingPage-v2/OnPageComponents";
import { StylesSection, IconSection } from "./components";

// assets
import { Sharp, Classic } from "./assets/icons";
import {
  SharpStandard,
  SharpDuoTone,
  SharpFill,
  SharpLight,
  SharpSolid,
  ClassicFill,
  BrandLogos,
} from "./assets/images";
import NavBar from "../../components/NavBar/NavBar";

export const StyleSet = () => {
  const [statistics, setStatistics] = useState({});
  const { UseGetStatistics } = useProduct();

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    };

  useEffect(() => {
    getAllStyleSet();
    scrollTop();
  }, []);

  // Handler

  const getAllStyleSet = async () => {
    const getStatistics = await UseGetStatistics();
    setStatistics(getStatistics);
  };

  const SHARP_ICONS = {
    style_icon: Sharp,
    title: "The Sharp Icons",
    text: "These style is shaping sharp corners and line edges. It is best goes with sharp or curve design style. All of our icons are available with classic icon type.",
    navigate: {
      title: " free and open-source icons",
      tag: statistics?.freeProductsCount,
      location: "/icons?t=Sharp&s=standard",
    },
    icon_styles: [
      {
        style_image: SharpStandard,
        style: "standard",
        navigate: "/icons?t=Sharp&s=standard",
      },

      {
        style_image: SharpSolid,
        style: "Solid",
        navigate: "/icons?t=Sharp&s=solid",
      },
      {
        style_image: SharpDuoTone,
        style: "Duotone",
        navigate: "/icons?t=Sharp&s=duotone",
      },
      {
        style_image: SharpFill,
        style: "Fill",
        navigate: "/icons?t=Sharp&s=fill",
      },
    ],
  };

  const CLASSIC_ICONS = {
    style_icon: Classic,
    title: "The Classic Icons",
    text: "These style is shaping soft corners and line edges. It is best goes with rounded or curve design style. All of our icons are available with classic icon type.",
    navigate: {
      title: " free and open-source icons",
      tag: statistics?.freeProductsCount,
      location: "/icons?t=Classic&s=standard",
    },
    icon_styles: [
      {
        style_image: SharpStandard,
        style: "standard",
        navigate: "/icons?t=Classic&s=standard",
      },
      {
        style_image: SharpSolid,
        style: "Solid",
        navigate: "/icons?t=Classic&s=solid",
      },
      {
        style_image: SharpDuoTone,
        style: "Duotone",
        navigate: "/icons?t=Classic&s=duotone",
      },
      {
        style_image: ClassicFill,
        style: "Fill",
        navigate: "/icons?t=Classic&s=fill",
      },
    ],
  };

  const BRAND_LOGOS = {
    title: "brand logos",
    text: "Those brand logos largely used with user interface design. We have choose it wisely and added to our library for you. It has a public licence. Use it and tweak it how ever you like. Spread the love!",
    navigate: {
      title: " public licence icons",
      tag: statistics?.brandProductsCount,
      location: "/icons/?t=Brand&s=standard",
    },
    icon_styles: [
      {
        style_image: BrandLogos,
        style: "brand logos",
        navigate: "/icons/?t=Brand&s=standard",
      },
    ],
  };

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Download static and animated SVG, PNG, and PDF file format icons | Free consistent quality trending icons for UI, UX, designer, social-media, web & mobile"
        />
        <title>Openstrokeicons | The timeless icons styles</title>
      </Helmet>
      <NavBar />
      <div className="landingPage-Container">{/* <LandingPageHeader /> */}</div>
      <div className="search-icon-deail-top">
        <div className="search-icon-detail-inner">
          <div className="seach-icon-link">
            <SearchBar placeholder="Search..." isHeader></SearchBar>
          </div>
        </div>
      </div>
      <div className={Styles.heading_cont}>
        <div className={Styles.text_cont}>
          <h1>timeless styles</h1>
          <p>
            Our most basic styles are timeless that blends so well with any of
            your design.
          </p>
        </div>
      </div>
      <div className={CommonStyle.body_padding}>
        <StylesSection data={SHARP_ICONS} />
        <StylesSection data={CLASSIC_ICONS} />
        <StylesSection data={BRAND_LOGOS} />
      </div>
      <FigureSection />
      <div className={CommonStyle.body_padding}>
        <IconSection totalCategories={statistics?.categoriesCount} />
      </div>
      <div className={`${Styles.bottom_padding} ${CommonStyle.body_padding}`}>
        <PluginSection />
      </div>
      {/* <LandingPageFooter /> */}
    </div>
  );
};
