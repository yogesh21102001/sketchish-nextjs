import { svg } from "@/assets/icons";
import { AnimatedDiv, ParticlesJs } from "@/components";
import ContactArrow from "@/components/ContactArrow/ContactArrow";

import Styles from "./style.module.css";

const MainSection = ({
  animation = true,
  color = "white",
  heading,
  secondHeading,
  gradient,
  para,
  backgroundColor,
  contactLinkMod,
  contactLinkText,
}) => {
  return (
    <div className={Styles.main_sec_cont} style={{ backgroundColor: backgroundColor }}>
      {animation && (
        <>
          <ParticlesJs />
          {/* <div className={Styles.animated_cursors}>
            <AnimatedDiv className={"a"} img={svg.CursorA} />
            <AnimatedDiv className={"b"} img={svg.CursorB} />
            <AnimatedDiv className={"c"} img={svg.CursorC} />
            <AnimatedDiv className={"d"} img={svg.CursorD} />
          </div> */}
        </>
      )}
      <div className={Styles.text_wraper}>
        <h1 className={Styles.main_heading} style={{ color: color }}>
          {heading} <br />{" "}
          {secondHeading ?
            <span style={{ color: color }}>
              {secondHeading + " "}
            </span> : null
          }
          <span className={Styles.gredient_animation}>
            {gradient}
          </span>
        </h1>
        <p className={Styles.para_line} style={{ color: color }}>
          {para}
        </p>
        
        {contactLinkMod && contactLinkText &&
          <ContactArrow
            color={color}
            contactLinkMod={contactLinkMod}
            contactLinkText={contactLinkText}
          />
        }
      </div>
    </div>
  );
};

export default MainSection;
