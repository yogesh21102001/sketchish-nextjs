import { images } from "@/assets/images";
import { SectionHeader } from "@/components";
import CommonStyles from "@/utils/commonStyles.module.css";
import Image from "next/image";
import Styles from "./style.module.css";

const OurServicesSection = () => {
  const Service = ({ icon, heading, para }) => {
    return (
      <div className={`${Styles.service_card} ${CommonStyles.body_padding}`}>
        <div className={Styles.service_wraper}>
          <div className={Styles.service_card_lft}>
            <Image alt='icon' src={icon} />
            <p className={`${Styles.link} ${Styles.link_arrow_cont}`}>
              {heading}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="16"
                viewBox="0 0 50 16"
                fill="none"
              >
                <path d="M0 8H49M49 8L41.5 0.5M49 8L41.5 15.5" stroke="white" />
              </svg>
            </p>
          </div>
          <div className={Styles.service_card_rgt}>
            <p className={`${Styles.txt} ${Styles.link}`}> {para}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={Styles.section_cont}>
      <SectionHeader
        color={"white"}
        heading={"Digital services"}
        gradient={"Powered by humans"}
        paraWidth={"65%"}
        para={
          "Our philosophy behind designing experiences is that they should feel state-of-the-art. Like someone has already thought about them. Not painful to use. Not random."
        }
      />
      <div className={Styles.services_cont}>
        <Service
          icon={images.digital_product_design}
          heading={"Digital Product Design"}
          para={
            "Crafting products is crafting relationships with users. It's our passion, creating meaningful connections through design."
          }
        />
        <Service
          icon={images.software_engineering}
          heading={"Software Engineering"}
          para={
            "Pixel creation to seamless deployment, we handle it all with the finest tech stack expertise."
          }
        />
        <Service
          icon={images.quality_engineering}
          heading={"Quality Engineering"}
          para={
            "Elevating excellence through meticulous quality engineering and innovative solutions."
          }
        />
        <Service
          icon={images.branding}
          heading={"Branding"}
          para={
            "Unlocking your brand's potential through our expertly Showcasing your identity to the world with effortless expertise."
          }
        />
        <Service
          icon={images.digital_marketing}
          heading={"Digital Marketing"}
          para={
            "Strategic digital marketing solutions tailored for optimal visibility and unrevealed business growth."
          }
        />
      </div>
       
    </section>
  );
};

export default OurServicesSection;
