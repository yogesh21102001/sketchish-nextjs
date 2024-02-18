import React from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";

import { index } from "../../assets/images/images";

// Hooks
import useProduct from "../../../../hooks/product/useProduct";
import { useState, useEffect } from "react";

const FigureSection = () => {
  const [statistics, setStatistics] = useState({});
  const { UseGetStatistics } = useProduct();

  useEffect(() => {
    getAllStyleSet();
  }, []);

  // Handler

  const getAllStyleSet = async () => {
    const getStatistics = await UseGetStatistics();
    setStatistics(getStatistics);
  };

  const DATA = [
    {
      figure: statistics?.productsCount?.toLocaleString() || 0,
      text: "Total emotionally charged icons crafted by designers.",
    },
    {
      figure: statistics?.freeProductsCount?.toLocaleString() || 0,
      text: "Free open-source icons with personal & commercial use.",
    },
    {
      figure: "1,612",
      text: "Recently added new icons. We keep adding every week!",
    },
    {
      figure: statistics?.styleSetsCount || 0,
      text: "Classic & Sharp + unique styles to deliver consistency.",
    },
    {
      figure: statistics?.categoriesCount || 0,
      text: "Fine tuned categories to explore and filter our icons to best match.",
    },
    {
      figure: "30",
      text: "Crafted by 6 Icon Designers team at Openstroke Icons.",
    },
  ];

  return (
    <div className={Styles.figure_section}>
      <div className={`${Styles.figures_cont} ${CommonStyles.body_padding}`}>
        {DATA.map((item, i) => (
          <div className={Styles.figures} key={i}>
            <div className={Styles.figure_av}>
              <h3>{item.figure}</h3>
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FigureSection;
