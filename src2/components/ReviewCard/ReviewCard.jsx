import React from "react";
import Styles from "./style.module.css";
import Image from "next/image";
import { images } from "@/assets/images";

const ReviewCard = ({ backgroundColor, heading, review, position, name, industry }) => {
  return (
    <div
      className={Styles.card_wraper}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={Styles.stars_cont}>
        <Image alt='Star' src={images.star} height={20} width={20} />
        <Image alt='Star' src={images.star} height={20} width={20} />
        <Image alt='Star' src={images.star} height={20} width={20} />
        <Image alt='Star' src={images.star} height={20} width={20} />
        <Image alt='Star' src={images.star} height={20} width={20} />
      </div>
      <div className={Styles.text_cont}>
        <div className={Styles.top_text}>
          <h4>{heading}</h4>
          <p>
            {review}
          </p>
        </div>
        <div className={Styles.btm_text}>
          <p><span>{position} <br /> {name}</span> <br /> Industry: {industry}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
