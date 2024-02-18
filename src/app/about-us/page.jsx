import {
  Brands,
  FooterSection,
  MainSection,
  ReviewsSection,
  StatisticsSection,
} from "@/sections";

import AboutTeam from "./AboutTeam/AboutTeam";
import Foundations from "./Foundations/Foundations";

export const metadata = {
  title: 'About us',
  description: 'About us',
}

const AboutUs = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading="Your growth & success"
        secondHeading="is"
        gradient="our mission"
        para={'It starts with an idea and ends with an rich experience \n design, filled with a human-centred approach.'}
        backgroundColor='#F7D56E'
        contactLinkMod='black'
        contactLinkText='partner with us'
      />
      <AboutTeam />
      <Foundations />
      <Brands />
      <StatisticsSection />
      <ReviewsSection />
      <FooterSection background="white" />
    </>
  );
};

export default AboutUs;
