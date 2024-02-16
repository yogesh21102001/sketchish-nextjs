import {
  Brands,
  FooterSection,
  MainSection,
} from "@/sections";

import { cards, stages } from "./data";

import Description from "./Description/Description";
import ServicesBlog from "./ServicesBlog/ServicesBlog";
import WhatWeDo from "./WhatWeDo/WhatWeDo";
import WorkingSides from "./WorkingSides/WorkingSides";

export const metadata = {
  title: 'Digital Product Design',
  description: 'Digital Product Design',
}

const DigitalProductDesign = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading="Digital product design services"
        gradient="for startups and successful tech businesses"
        para="We are your remote partner with deep channel expertise."
      />
      <Brands />

      <Description
        title='Digital Product Design Services'
        paragraph='We believe that great design is crucial to Businesses. We’re a Design-centric studio and always emphasize on humanizing design.'
        cards={cards}
      />

      <WhatWeDo
        heading='Our simple process to develop'
        gradient='Software products'
        stages={stages}
      />

      <WorkingSides />
      <ServicesBlog />
      <FooterSection background="#F7EDCF" />
    </>
  );
};

export default DigitalProductDesign;
