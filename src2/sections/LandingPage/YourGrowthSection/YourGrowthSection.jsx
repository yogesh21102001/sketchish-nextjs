"use client"
import { images } from "@/assets/images";
import { Button } from "@/components";
import Image from "next/image";
import Styles from "./style.module.css";
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

const YourGrowthSection = () => {

  const router = useRouter();
  const LearnMoreClick = () => {
    router.push('/about-us');
  };

  return (
    <section className={`${Styles.cont}`}>
      <div className={Styles.arch_bg}>
        <div className={Styles.content_wraper}>
          <Image alt='Sketchish logo' src={images.SketchishLogo} />
          <div className={Styles.text_cont}>
            <h3 className={Styles.heading}>Your growth is our mission</h3>
            <h4 className={Styles.heading}>
              We’re human-centred and so our approach.
            </h4>
            <p className={Styles.heading}>
              We revolve around people, ensuring every interaction reflects
              empathy, understanding, and a commitment to enriching the human
              experience. We share the top 1% of talent across global markets.{" "}
              <br /> <br />
              It starts with an idea and ends with an rich experience design,
              filled with a human-centred approach.
            </p>
          </div>
            <Button onClick={LearnMoreClick} animate={true}>learn more</Button>
        </div>
      </div>
    </section>
  );
};

export default YourGrowthSection;
