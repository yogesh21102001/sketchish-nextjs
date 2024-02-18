import { gravity } from "sharp";
import CommonStyles from "../utils/commonStyles.module.css";

// Sections
import { BlogSection, Brands, FooterSection, MainSection, OurServicesSection, ReviewsSection, ShowCaseSection, StatisticsSection, TechnologySection, YourGrowthSection } from "@/sections";
import ServicesBlog from "./services/digital-product-design/ServicesBlog/ServicesBlog";

export const metadata = {
  title: 'Empower Your Business with Cutting-Edge IT Services | Sketchish',
  description: 'Transform your business with our comprehensive IT services. From seamless network solutions to advanced cybersecurity, Sketchish delivers tailored technology solutions for optimal efficiency and growth. Explore our expertise today!',
  locale: 'en_US',
  type: 'website',
}

export default function Home() {
  return (
    <>
    <MainSection contactLinkMod={"gradient"} contactLinkText={'let’s start talking'}
        heading={"A rare combination of"}
        gradient={"Software Engineering &\nExperience Designing"}
        para={"We’re human-centred team that help us to stand from the crowd."}
      />
      <div className={CommonStyles.show_container}>
        <Brands />
        <YourGrowthSection/>
        <OurServicesSection/>
        <StatisticsSection/>
        <ReviewsSection/>
        <ShowCaseSection />
        <TechnologySection/>
    
        {/* <BlogSection/> */}
        <ServicesBlog/>
        <FooterSection background="#F7EDCF" />

      </div>
    </>
  );
}
