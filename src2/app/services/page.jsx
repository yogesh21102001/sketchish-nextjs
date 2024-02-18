import {
  FooterSection,
  MainSection,
  ReviewsSection,
  ServicesPageSection,
  StatisticsSection,
} from "@/sections";

import CommonStyles from "@/utils/commonStyles.module.css";

import { ServicePageNevigation } from "@/components";
import { data } from "./data";

export const metadata = {
  title: 'Services',
  description: 'Services',
}

const Services = () => {

  return (
    <>
      <MainSection  contactLinkMod={'black'} contactLinkText={'PARTNER WITH US'}
        animation={false}
        color="black"
        heading={"Your vision and our mission"}
        gradient={"is a great partnership"}
        para={"We are your remote partner with deep channel expertise."}
      />
      <div className={CommonStyles.show_container}>
        <ServicePageNevigation/>
        {
          data.map((data, index)=>  <ServicesPageSection id={data?.id} data={data}  key={index}/>)
        }
        <StatisticsSection />
        <ReviewsSection />
        <FooterSection background="white" />
      </div>
    </>
  );
};

export default Services;
