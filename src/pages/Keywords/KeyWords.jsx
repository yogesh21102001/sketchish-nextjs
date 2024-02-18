import React, { useEffect, useState } from "react";

import Styles from "./style.module.css";

import { Helmet } from "react-helmet";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";

import useKeywords from "../../hooks/keywords/useKeywords";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/spinner/spinner";
import NavBar from "../../components/NavBar/NavBar";

export const KeyWords = () => {
  const { UseKeyword } = useKeywords();
  const [keyWordsData, setKeyWordsData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const keywordApiCall = async () => {
    setLoading(true);
    const resp = await UseKeyword();
    const groupedObjects = resp.reduce((result, obj) => {
      const key = obj.name;
      if (!key.startsWith(",") && !key.startsWith("0")) {
        const firstLetter = key[0].toUpperCase(); // Get the first letter and convert to uppercase
        if (!result[firstLetter]) {
          result[firstLetter] = [];
        }
        result[firstLetter].push(obj);
      }
      return result;
    }, {});

    // Sort groups alphabetically
    const sortedGroups = Object.entries(groupedObjects).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    // Create the final data array
    const data = sortedGroups.map(([alphabet, keywords]) => ({
      alphabet,
      keywords,
    }));
    setKeyWordsData(data);
    setLoading(false);
  };

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    };


  useEffect(() => {
    keywordApiCall();
    scrollTop();
  }, []);

  const inLineStyle = {
    overflow: loading ? "hidden" : "auto",
    height: loading ? "100vh" : "initial",
  };

  return (
    <div style={inLineStyle}>
      {loading ? (
        <div class="loader">
          <Spinner></Spinner>
        </div>
      ) : (
        ""
      )}
      <Helmet>
        <meta
          name="description"
          content="Download static and animated SVG, PNG, and PDF file format icons | Free consistent quality trending icons for UI, UX, designer, social-media, web & mobile"
        />
        <title>Download Free Vector Icons in SVG and PNG file format</title>
      </Helmet>
      <NavBar />
      <div className={Styles.main_cont}>
        <h1 className={Styles.headline}>
          Discover Icons Stored Alphabetically By Tags
        </h1>
        <div className={Styles.all_tags_wraper}>
          {keyWordsData.map((item, index) => (
            <div key={index} className={Styles.tags_cont}>
              <div className={Styles.tag}>
                <p>{item?.alphabet}</p>
              </div>
              <div className={Styles.tag_links_cont}>
                {item.keywords.map((elm, i) => (
                  <div
                    data-tooltip-id="stroke"
                    data-tooltip-content={`${elm.name} icons`}
                    key={i}
                    className={Styles.tag_link}
                    onClick={() => navigate(`/icons/dictionary/${elm.name}`)}
                  >
                    <p>{elm.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
