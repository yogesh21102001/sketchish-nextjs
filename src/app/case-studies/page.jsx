import {
  Brands,
  FooterSection,
  MainSection,
  ReviewsSection,
  StatisticsSection
} from "@/sections";

import StudyCase from "./StudyCase/StudyCase";
import { studyCases } from "./StudyCase/data";
import Partners from "./Partners/Partners";

export const metadata = {
  title: 'Case studies',
  description: 'Case studies',
}

const CaseStudies = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading="Outstanding work"
        secondHeading="deserves its own"
        gradient={"spotlight"}
        para={"We do less but impactful, bold with passion. Each one\ndeserves its spotlight. ★★★"}
        contactLinkMod="black"
        contactLinkText="partner with us"
      />

      {studyCases.map((studyCase, i) => (
        <StudyCase
          key={i}
          name={studyCase.name}
          focusPoints={studyCase.focusPoints}
          title={studyCase.title}
          description={studyCase.description}
          services={studyCase.services}
          backgroundColor={studyCase.backgroundColor}
          href={studyCase.href}
        />
      ))}
      <Partners />
      <Brands />
      <StatisticsSection />
      <ReviewsSection />
      <FooterSection background={"white"}/>
    </>
  );
};

export default CaseStudies;
