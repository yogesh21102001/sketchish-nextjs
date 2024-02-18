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
import graph from './graph.webp'
import hierarchy from './hierarchy.webp'

import Styles from './style.module.css'

export const metadata = {
  title: 'GoDaddy service',
  description: 'GoDaddy service',
}

const GoDaddy = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading={"To build the product for SMB’s\nto help them grow."}
        para={'Design, Development, Branding, Hybrid mobile app'}
      />
      <div className={Styles.screenshot_container}>
        <Image alt='intro' className={Styles.screenshot} src={intro} />
      </div>

      <CaseStudyInformation
        texts={[
          'Spark app was designed to help Small Medium Business’s in day to day business operation. SMBs can create the central product catalog using the Spark App and share via WhatsApp and others on social media channels to generate leads, manage inquiries, and sell the products easily.',
          'Due to the confidentiality agreement I have omitted the confidential information. These designs are a reinterpretation of the original.',
        ]}
        keydata={[
          {
            numbers: '1500+',
            information: 'Quantitive Data'
          },
          {
            numbers: '9+',
            information: 'Tested Value Propositions'
          },
          {
            numbers: '20+',
            information: 'User Interviews'
          },
          {
            numbers: '78%',
            information: 'Users ready to Pay'
          },
        ]}
        industry='e-Commerce'
        services='User Research, User Testing, UI Design, Wireframe, User Interviews, Backend Development, Frontend Development'
      />
      <CaseStudyChallenge
        texts={['To build the product for SMB’s to help them grow. Our challenge was to evolve with SMBs and explore the opportunity to build a product that helps them to grow their business and keep the customers engaged.']}
        picture={screenshot}
        description='The loud noice from the focused users'
      />
      <Review
        score={5}
        text='They did a lot of research and provides a lot of options to make the product design user friendly. Team is super professional and always deliver good quality work. We are super lucky to have sketchish as a partner.'
        reviewer={"Product Manager at GoDaddy \n Yun Kao"}
      />
      <WhatWeDid
        texts={[
          {
            paragraph: '',
            text:'First, We need to understand SMBs needs, problems, current solutions they are using, social channels usage, Industry they belong too, and online vs offline. Since quantitative research was already done, we started to use insights for qualitative research.',
          },
          {
            paragraph: 'Quantitative Research',
            text:'This was helpful to decide to come up with value proposition that we can test with the users and get insights. Below was the outcome of quantitative user research.',
          },
          {
            paragraph: 'What We Know',
            text: '- Most SMBs having less than 10 employees\n- Social media channels are widely used\n- Heavy usage of WhatsApp for personal and business medium\n- WordSwag, Canva, Adobe Spark, PicsArt helpful for a creative post on Social channels\n- They do invest more time and money online than offline',
          },
          {
            paragraph: '',
            text: 'We’d enough data to brainstorming and start building the possible concepts based on the gathered data from the multiple user research. We aimed to present ideas to the users and validate the it to nail it down further.',
          },
        ]}
        schemes={[
          {
            picture: graph,
            description: 'Value Propositions graph',
          },
          {
            picture: hierarchy,
            description: 'Frequent actions hierarchy',
          },
        ]}
      />
      <Result
        texts={[
          'We aimed to launch MVP 1.0. We decided to only focus on the primary solving problems and did the visual design. We consider all the aspects and define the context in terms of technology, mobile data usage, data plan, usage, mobile phones, number of products they share so on.',
          'We did the Diary study for 15 days with 10 focused users. We got 65% engagement. They were a few errors we wanted to address in next version.'
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

export default GoDaddy;
