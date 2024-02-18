import React, { useEffect } from 'react'
import Styles from "./styles.module.css"
import CommonStyles from "../../../../style/commonStyle.module.css"

import { HeaderText } from '../Header/HeaderText'
import { Grid, FileSvg, IconDetails, IconVarients } from "../../assets/images";

const KeyFeatureSection = () => {

    useEffect(()=>{
    console.log(":::::::::::::: Loaded ::::::::::::");
  },[])
  
  return (
    <div className={`${Styles.wraper}`}>
      <div className={`${CommonStyles.body_padding}`}>
        <HeaderText
          heading={"Discover the key features in more details"}
          message={
            "We love details and crafted 90,000+ beautiful icons carefully. No matter how your design style is our icon styles are going to blend straight."
          }
          headingColor={"#FFF"}
          messageColor={"#FFFFFF"}
        />
        <div className={Styles.item_cont}>
          <div className={Styles.item}>
            <div className={Styles.content_wraper}>
              <div className={Styles.txt_cont}>
                <h3>Base Grid</h3>
                <p>
                  Our icons are built on a grid where we follow a strict
                  guidelines, so we design consistent, accessible, beautiful and
                  unique icons.
                </p>
              </div>
            </div>
            <div className={Styles.content_wraper}>
              <div className={Styles.grid_wraper}>
                <Grid />
                <FileSvg className={Styles.file_svg} />
              </div>
            </div>
          </div>
          <div className={Styles.item}>
            <div className={Styles.content_wraper}>
              <div className={Styles.icon_details_wraper}>
                <IconDetails />
                <p className={Styles.icon_details_description}>
                  This is very soft style so we try to ignore the sharp corner,
                  straight lines, and stroke cap square.
                </p>
              </div>
            </div>
            <div className={Styles.content_wraper}>
              <div className={Styles.txt_cont}>
                <h3>Consistent guidelines</h3>
                <p>
                  Each shape of icons carefully nailed down in order to build
                  icon harmony such as stroke size, curve, padding, stroke cap
                  etc.
                </p>
              </div>
            </div>
          </div>
          <div className={`${Styles.item} ${Styles.icon_size_represent}`}>
            <div className={Styles.content_wraper}>
              <div className={Styles.txt_cont}>
                <h3>Visible at even at smallest sizes</h3>
                <p>
                  No matter how smallest and biggest icon size you used, our
                  icons are going to visible at even smallest size and beautiful
                  at biggest size.
                </p>
              </div>
            </div>
            <div className={Styles.content_wraper}>
              <IconVarients />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyFeatureSection;