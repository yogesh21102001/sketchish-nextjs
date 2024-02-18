import {
    Brands,
    FooterSection,
    MainSection,
  } from "@/sections";
  
  import { cards, stages } from "./data";
  
  import Description from "../digital-product-design/Description/Description";
  import ServicesBlog from "../digital-product-design/ServicesBlog/ServicesBlog";
  import WhatWeDo from "../digital-product-design/WhatWeDo/WhatWeDo";
  import WorkingSides from "../digital-product-design/WorkingSides/WorkingSides";
  
  export const metadata = {
    title: 'Quality Engineering services',
    description: 'Quality Engineering services',
  }
  
  const SoftwareEngineering = () => {
  
    return (
      <>
        <MainSection
          animation={false}
          color="black"
          heading="Quality Engineering services"
          gradient="for startups and successful tech businesses"
          para="We are your remote partner with deep channel expertise."
        />
        <Brands />
  
        <Description
          title='Quality Engineering services'
          paragraph='Elevating excellence through meticulous quality engineering and innovative solutions.'
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
  
  export default SoftwareEngineering;
  