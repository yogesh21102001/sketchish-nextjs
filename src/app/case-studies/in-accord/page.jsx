import Image from "next/image";

import {
  FooterSection,
  MainSection,
} from "@/sections";
import CaseStudyInformation from "@/sections/CaseStudyInformation/CaseStudyInformation";
import CaseStudyChallenge from "@/sections/CaseStudyChallenge/CaseStudyChallenge";
import Review from "@/sections/Review/Review";
import Result from "@/sections/Result/Result";
import OtherCaseStudies from "@/sections/OtherCaseStudies/OtherCaseStudies";
import WhatWeDid from "@/sections/WhatWeDid/WhatWeDid";

import StudyCase from "../StudyCase/StudyCase";
import { studyCases } from "../StudyCase/data";

import intro from './intro.webp'
import screenshot from './screenshot.webp'
// import graph from './graph.webp'
// import hierarchy from './hierarchy.webp'

import Styles from './style.module.css'

export const metadata = {
  title: 'InAccord service',
  description: 'InAccord service',
}

const InAccord = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading={"Project management system\nfor B2B sales"}
        para={'Branding, Design, Development'}
      />
      <div className={Styles.screenshot_container}>
        <Image alt='Intro' className={Styles.screenshot} src={intro} />
      </div>

      <CaseStudyInformation
        texts={['Accord is a project management platform, purpose-built for B2B sales. It’s like Asana, Trello, or Atlassian, but uniquely customer-facing, so sales reps and buyers can work together on the same platform and stay aligned during complex sales cycles.']}
        keydata={[
          {
            numbers: '$6M+',
            information: 'Secure seed fund'
          },
          {
            numbers: '9+',
            information: 'Onboarded customers'
          },
        ]}
        industry='Sales & Marketing'
        services='Branding, B2B, Web Application, UI Design, Front end development'
      />
      <CaseStudyChallenge
        texts={[
          'Buying technology is difficult. There are so many things decision makers who are involved in the decision making process. For the buyer leading the project, it involves a 3-24 month evaluation where they have to make a business case for why their company needs a product. Many times this buyer doesn’t have deep knowledge of the product they’re buying or how to buy it.',
          'For the seller, it involves a heroic feat of herding dozens of stakeholders at both the buying company and the selling company.',
        ]}
        picture={screenshot}
        description='Rough wireframe of the initial idea from the client.'
      />
      <Review
        score={5}
        text={'If you\'re looking for an incredibly talented team who happens to be thoughtful, responsive, and an all-around nice guys, then you\'ve found one.'}
        reviewer={"Founder / CRO at InAccord\nRyan K."}
      />
      <WhatWeDid
        texts={[
          {
            paragraph: '',
            text:'The core of Accord’s platform is an “Evaluation”. An Evaluation is created by a sales rep, and shared with all stakeholders on the buying team and selling team (sales rep, engineers evaluating the product, sales engineers, executive decision makers, legal teams, finance teams, and so on. In addition to evaluations, there are supporting features that better aid the sales teams in improving their buying process, documents management to keep both teams organized, automatic updates to keep both teams up to speed on the evaluation, evaluation directory so both parties understand who’s in an evaluation.',
          },
        ]}
      />
      <Result
        texts={[
          'We aimed to entry into Y-Combinator batch. We successfully helped to get secure seed round and continue to help. We plan and make a roadmap for further features request and continue designing and developing.',
          'Today\'s Accord have successfully onboarded clients like Figma, Netflix, AirTable, Stripe and many others.'
        ]}
      />
      <OtherCaseStudies />
      <StudyCase
        name={studyCases[1].name}
        focusPoints={studyCases[1].focusPoints}
        title={studyCases[1].title}
        description={studyCases[1].description}
        services={studyCases[1].services}
        backgroundColor={studyCases[1].backgroundColor}
        href={studyCases[1].href}
      />
      <StudyCase
        name={studyCases[2].name}
        focusPoints={studyCases[2].focusPoints}
        title={studyCases[2].title}
        description={studyCases[2].description}
        services={studyCases[2].services}
        backgroundColor={studyCases[2].backgroundColor}
        href={studyCases[2].href}
      />
      <FooterSection background={"white"}/>
    </>
  );
};

export default InAccord;
