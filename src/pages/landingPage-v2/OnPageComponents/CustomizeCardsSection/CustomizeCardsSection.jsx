import React, {useRef} from "react";
import Styles from "./style.module.css";
import CommonStyles from "../../../../style/commonStyle.module.css";
import { motion, Variants } from "framer-motion";

import { HeaderText } from "../Header/HeaderText";
import { CustomiseCardRgt, CustomiseCardLft, CustomiseCardMid } from "../../assets/images";

const Cards = ({Data}) => {

   const windowWidth = useRef(window.innerWidth);

  const cardVariants = {
    offscreen: {
      y: 50,
    },
    onscreen: {
      y: Number(Data?.y),
      x: Number(Data?.x),
      rotate: Number(Data?.rotate),
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      className={`${Styles.card} ${Styles[Data?.cardClass]}`}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 1 }}
      variants={cardVariants}
    >
      <motion.div
        // className={`${Styles.card} ${Styles[Data?.cardClass]}`}
        className={Styles.innerCard}
      >
        <Data.CardSvg />
      </motion.div>
    </motion.div>
  );
};

const CustomizeCardsSection = () => {

  const mediaQuery = window.matchMedia("(max-width: 1024px)");
  const mediaQueryTab = window.matchMedia("(max-width: 900px)");

   const windowWidth = useRef(window.innerWidth);
  

  const cardData = [
    {
      rotate: "-20",
      x:
        windowWidth.current > 900 && windowWidth.current < 1045
          ? "-230"
          : windowWidth.current > 600 && windowWidth.current < 900
          ? "-188"
          : "-300",
      y: "0",
      CardSvg: CustomiseCardLft,
      cardClass: "card_first",
    },
    {
      rotate: "0",
      x: "0",
      y: windowWidth.current <= 900 ? "-31" : "-55",
      CardSvg: CustomiseCardMid,
      cardClass: "card_second",
    },
    {
      rotate: "20",
      x:
        windowWidth.current > 900 && windowWidth.current < 1045
          ? "230"
          : windowWidth.current > 600 && windowWidth.current < 900
          ? "188"
          : "300",
      y: "0",
      CardSvg: CustomiseCardRgt,
      cardClass: "card_third",
    },
  ];

  const cardDataMobile = [
    {
      rotate: "0",
      x: "0",
      y: "-55",
      CardSvg: CustomiseCardLft,
      cardClass: "card_first",
    },
    {
      rotate: "0",
      x: "0",
      y: "-55",
      CardSvg: CustomiseCardMid,
      cardClass: "card_second",
    },
    {
      rotate: "0",
      x: 0,
      y: "-55",
      CardSvg: CustomiseCardRgt,
      cardClass: "card_third",
    },
  ];

  return (
    <div className={`${Styles.wraper}`}>
      <div className={Styles.cont}>
        <HeaderText
          heading={"Customise is Get, Set, Go"}
          message={
            "Customisation is insanely easy. There are just 3 steps to go. Choose your style, set stroke, and align the icon with your brand color. Easy right?"
          }
        />
        <div className={`${Styles.main_cont} ${CommonStyles.body_padding}`}>
          <div className={Styles.card_counting}>
            {cardData.map((e, i) => (
              <div key={i} className={Styles.count_cont}>
                <div className={`${Styles.count} ${Styles[e.cardClass]}`}>
                  {i + 1}
                </div>
                <p>{i == 0 ? "STYLE" : i == 1 ? "STROKE" : "COLOR"}</p>
              </div>
            ))}
          </div>
          <div className={Styles.motion_card_cont}>
            {windowWidth.current <= 600
              ? cardDataMobile.map((e, i) => <Cards key={i} Data={e} />)
              : cardData.map((e, i) => <Cards key={i} Data={e} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCardsSection;