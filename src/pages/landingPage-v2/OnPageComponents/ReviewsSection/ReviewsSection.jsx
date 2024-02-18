import React from 'react'
import Styles from "./style.module.css"
import { HeaderText } from '../Header/HeaderText';

import { Testimonials } from "../../assets/images";

const TestimonialCards = ()=>{
  return(
    <div className={Styles.testimonial_cards}>
       dfbv
    </div>
  )
}

export const ReviewsSection = () => {
  return (
    <div className={Styles.wraper}>
      <HeaderText
        heading={"Tones of love around the world"}
        headingColor={"#7238FA"}
      />
      <div className={Styles.illustration_cont}>
        <div className={Styles.overlay}>
          <div className={Styles.gradient}></div>
          <div className={Styles.gradient}></div>
        </div>
        {/* <Testimonials className={Styles.motion} style={{marginBottom:"1.88rem"}} /> */}
        <div className={`${Styles.testimonials} ${Styles.motion}`}></div>
      </div>
    </div>
  );
};