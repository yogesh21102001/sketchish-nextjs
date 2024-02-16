import Image from "next/image";

import {
  FooterSection,
  MainSection,
} from "@/sections";
import CaseStudyInformation from "@/sections/CaseStudyInformation/CaseStudyInformation";
import CaseStudyChallenge from "@/sections/CaseStudyChallenge/CaseStudyChallenge";
import Review from "@/sections/Review/Review";

import { studyCases } from "../StudyCase/data";
import StudyCase from "../StudyCase/StudyCase";

import phoneInterface from './phoneInterface.webp'
import pcInterface from './pcInterface.webp'
import screenshot from './screenshot.webp'

import Styles from './style.module.css'
import WhatWeDid from "@/sections/WhatWeDid/WhatWeDid";
import Result from "@/sections/Result/Result";
import OtherCaseStudies from "@/sections/OtherCaseStudies/OtherCaseStudies";

export const metadata = {
  title: 'Hey Arrow service',
  description: 'Hey Arrow service',
}

const GoDaddy = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading={"Streamline deal\nclosing process easy and fast."}
        para={'Design, Development, Store Front, Branding, Advertising,\nHybrid mobile app'}
      />
      <div className={Styles.interface}>
        <Image alt='PC interface' className={Styles.pc_interface} src={pcInterface} />
        <Image alt='Phone interface' className={Styles.phone_interface} src={phoneInterface} />
      </div>
      <CaseStudyInformation
        texts={[
          'Arrow is leading CRM software focusing on heavy equipment industry and made sales process easy. It is a modern platform to manage Inventory, search inventory, Internal feed where team member can post images, video, share product, news, marketing campaigns, custom invoice templates, esign docs, eCommerce experience, finance, closing big deals, reserve online facility, internal chat (team members), external chat (customers) and much more.',
          'The platform focusing on B2B, and B2C. All uploaded heavy equipment products can be avail to marketplace called CloudStore.',
          'CloudStore was a store front for the client and end customer can place the order online just like the way placing an order on amazon.'
        ]}
        keydata={[
          {
            numbers: '38+',
            information: 'Onboarded customers'
          },
          {
            numbers: '68%',
            information: 'Positive response'
          },
          {
            numbers: '35%',
            information: 'Revenue increased'
          },
          {
            numbers: '1.2 sec',
            information: 'API performance'
          },
        ]}
        industry='Heavy equipment machinery'
        services='Design, Development, Store Front, Branding, Advertising, Hybrid mobile app, Branding, Design System, Marketing Website'
      />
      <CaseStudyChallenge
        texts={['Arrow was at very early stage with a great vision when we dive in. Our challege was to streamline the deal closing process easy, and can close from anywhere. Sales people are using 22+ different tools and technology to close one big deal. Our big challenge was to make it one platform replace all tools.']}
        picture={screenshot}
        description='Rough concept shared by client before we started'
      />
      <Review
        score={5}
        text='This is an elite and talented group of people that have the rare combination of engineering and design skills. They really try to understand the end user solution and are great collaborative partners.'
        reviewer='Co-Founder / COO at HeyArrow Logan M.'
      />
      <WhatWeDid
        texts={[
          {
            paragraph: '',
            text:'The first thing first, as always to understand the business goals and customers goal and create a first bridge that connects both and create a healthy relationship. As we always think from the human centred perspective, we worked closely with stack holders to have better understanding of the product, team working methodology, sales process, and customer buying phycology.',
          },
          {
            paragraph: '',
            text:'We quickly identified the opportunity to build the v1 and plan the sprint to kick start development while our design team cover up the product discovery module. We have relied on low-fidelity mockups to propose our initial solutions and iterate on them based on the client feedback.',
          },
          {
            paragraph: '',
            text: 'There were many faces of the product such as Super admin, Client admin, Role based environment, and Buyer side web and mobile experience.',
          },
          {
            paragraph: '',
            text: 'The core task was to allow sales rep to create a deal with their assigned customers, and get close on time. This enabled the simple 5 steps process to complete to close the big deal online from anywhere.',
          },
          {
            paragraph: '',
            text: 'We were responsible for end to end solutions. Further we also worked closely with third party clients like JohnDeere - C&B operations, a big dealer of John Deere, Aerial Titans, Bobcat, Caterpillar and major heavy equipment players.',
          },
        ]}
      />
      <Result
        texts={[
          'We onboarded 5 clients having 60+ team members within 4 months of launch. Our API performance was 1.2sec compare to 6.5sec to our competitor. The sales team growth was up by 35%. The revenue was up by 22% and customer satisfaction we have got upto 55%.',
          'On this strong heavy equipment industry star-up, we continue to build out requested features and make the product better useful to our clients and their customers.'
        ]}
      />
      <OtherCaseStudies />
      <StudyCase
        name={studyCases[0].name}
        focusPoints={studyCases[0].focusPoints}
        title={studyCases[0].title}
        description={studyCases[0].description}
        services={studyCases[0].services}
        backgroundColor={studyCases[0].backgroundColor}
        href={studyCases[0].href}
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
