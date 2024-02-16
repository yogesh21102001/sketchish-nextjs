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

import Styles from './style.module.css'

export const metadata = {
  title: 'Faceoff service',
  description: 'Faceoff service',
}

const Faceoff = () => {

  return (
    <div>
      <MainSection
        animation={false}
        color="black"
        heading={"FaceOff The Emotion Capture\n& Guessing Game"}
        para={'Design, Development'}
      />
      <div className={Styles.screenshot_container}>
        <Image alt='intro' className={Styles.screenshot} src={intro} />
      </div>

      <CaseStudyInformation
        texts={[
          'FaceOff is an mobile application that combines the excitement of taking pictures with the mystery of guessing about emotions. The idea is straightforward yet really engaging. When the first user captures the moment, the second user must use their instincts to figure out what emotion is being conveyed in the picture. People are brought together in a fun and exciting way by this clash of emotions.',
        ]}
        industry='Gaming'
        services='UI Design, UX Design, Wireframe, Backend Development, Frontend Development, Branding'
      />
      <CaseStudyChallenge
        texts={['The challenge is in understanding the game\'s overall idea and its exact features. After understanding the structure of the game, We followed a simple design yet engaging interface, and design elements. Our main challenge is to create a visually appealing and outstanding user experience through removing unnecessary elements and utilising simple and traditional components.']}
        picture={screenshot}
      />
      <Review
        score={5}
        text={'\"Fast, professional, top quality work\"\n\nThe speed of response, the professionalism and the\nquality of their output. Unmatched. Highly reccomended.'}
        reviewer={"Founder at FaceOff\nScott Manthey"}
      />
      <WhatWeDid
        texts={[
          {
            paragraph: '',
            text:'We had discussions with the client about the FaceOff project and understood the key features and gameplay concepts. and after that, we prepared the game\'s rough wireframe, which allows the client to view the game\'s clear navigation structure and whole process of the game. Following the client\'s approval, we began to work on the design. We finished the visual design, color scheme, typeface, and other components of the user interface. Some essential features were added to the game in order to increase user enjoyment.',
          },
          {
            paragraph: '',
            text:'With our multiplayer option, for example, users may play via Facebook or email against friends or against random opponents. The game also has an area where players may view the games they are currently playing. Additionally, the leaderboard was introduced, enabling users to see their progress in many forms, such as friends, country, and global. The in-game purchase system enables users to buy coins, which they may use to get Chops. These chops are useful tools that you can use at certain points throughout the game.',
          },
          {
            paragraph: '',
            text: 'We also have included a notification area so that users receive notifications on time regarding their turn and friends\' game finishes. The basic concepts of the game, which center on identifying and gauging emotions, are beautifully simple. Coins are awarded to winning players in recognition of their wins. And we also have created a simple login and signup procedure to speed up user engagement and assure a smooth onboarding experience for every user.',
          },
        ]}
      />
      <Result
        texts={[
          'Our 15-day quick design and after that development process was validated by positive post-launch user feedback. Delivering a captivating gaming experience shows our team\'s flexible ability in achieving short deadlines and shows our commitment to quality.',
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
    </div>
  )
}

export default Faceoff