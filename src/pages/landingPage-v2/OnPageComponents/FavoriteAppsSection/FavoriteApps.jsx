import React from 'react'
import Styles from "./style.module.css"
import CommonStyle from "../../../../style/commonStyle.module.css"
import { HeaderText } from '../Header/HeaderText';

// Assets
import {
  BrandLogo1,
  BrandLogo2,
  BrandLogo3,
  BrandLogo4,
  BrandLogo5,
  BrandLogo6,
  BrandLogo7,
  BrandLogo8,
  BrandLogo9,
  BrandLogo10,
  BrandLogo11,
  BrandLogo12,
  BrandLogo13,
  BrandLogo14,
} from "../../assets/icons";

const FavoriteApps = () => {

  const BRAND_LOGOS = [
    BrandLogo1,
    BrandLogo2,
    BrandLogo3,
    BrandLogo4,
    BrandLogo5,
    BrandLogo6,
    BrandLogo7,
    BrandLogo8,
    BrandLogo9,
    BrandLogo10,
    BrandLogo11,
    BrandLogo12,
    BrandLogo13,
    BrandLogo14,
  ];

  return (
    <div className={Styles.favorite_apps_cont}>
      <HeaderText
        heading={"Works with all your favorite apps"}
        message={"Simply copy and paste svg to any of your favorite app."}
      />
      <div className={`${Styles.fav_tools_cont} ${CommonStyle.body_padding}`}>
        <div className={Styles.fav_tools}>
          {BRAND_LOGOS.map((Item) => (
            <Item />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteApps;