import React, { useEffect } from 'react'
import Styles from "./style.module.css"
import { HeaderText } from '../Header/HeaderText';

import { Illustrations } from '../../assets/images';

const IllustrationSection = () => {

  useEffect(()=>{
    console.log(":::::::::::::: Loaded ::::::::::::");
  },[])

  return (
    <div className={Styles.wraper}>
      <HeaderText
        heading={"UX Illustration"}
        message={
          "Increase user engagement by placing actionable illustration to help user  start fresh journey. Useful for empty state, emailers, widget, placement, empty data etc."
        }
        tag={true}
      />
      <div className={Styles.illustration_cont}>
        <div className={Styles.overlay}>
          <div className={Styles.gradient}></div>
          <div className={Styles.gradient}></div>
        </div>
        <div className={Styles.illustration_wraper}>
          <Illustrations className={Styles.motion} />
        </div>
      </div>
    </div>
  );
}

export default IllustrationSection;