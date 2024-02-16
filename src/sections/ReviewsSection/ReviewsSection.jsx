import Image from "next/image";

import { images } from "@/assets/images";
import { Button, ReviewCard, SectionHeader } from "@/components";
import CalendlyEmbed from "../../components/CalendlyEmbed/CalendlyEmbed";

import Styles from "./style.module.css";

const ReviewsSection = () => {
  return (
    <section className={`${Styles.section_cont}`}>
      <SectionHeader
        heading={"Verified by experts,"}
        gradient={"valued by customers"}
      />
      <div className={Styles.cards_cont}>
        <ReviewCard backgroundColor={"#FEF2E7"} heading={"Rare combination of engineering and design skills"} review={"This is an elite and talented group of people that have the rare combination of engineering and design skills. They really try to understand the end user solution and are great collaborative partners."} position={"Co-Founder / COO at HeyArrow"} name={"Logan M."} industry={"Agriculture + Construction"}/>
        <ReviewCard backgroundColor={"#FEE7FD"} heading={"Talented, thoughtful and responsive team"} review={"If you're looking for an incredibly talented team who happens to be thoughtful, responsive, and an all-around nice guys, then you've found one."} position={"Founder / CRO at InAccord"} name={"Ryan K."} industry={"Sales & Marketing"}/>
        <ReviewCard backgroundColor={"#E7F3FE"} heading={"Team is super professional & always deliver quality work"} review={"They did a lot of research and provides a lot of options to make the product design user friendly. Team is super professional and always deliver good quality work. We are super lucky to have sketchish as a partner."} name={"Yun K."} position={"Product Manager at GoDaddy"} industry={"Information Technology"}/>
      </div>
      <div className={Styles.btm_section}>
         <Image alt='clutch' src={images.clutch} height={54} width={257}/>
         <div className={Styles.btn_cont}>
            {/* <Button className={Styles.btn} width={"20%"} margin={0}>reviews on clutch</Button> */}
           
              <CalendlyEmbed className={Styles.btn} width={"20%"} margin={0} background={"linear-gradient(32deg, #000 72.14%, #E668E1 100%)"} text='reviews on clutch' />

              <CalendlyEmbed className={Styles.btn} width={"20%"} margin={0} background={"linear-gradient(32deg, #000 72.14%, #E668E1 100%)"} text='SCHEDULE A CALL' />
         </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
