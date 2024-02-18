import { images } from "@/assets/images";
import {
  BlogsList,
  FooterSection,
  MainSection
} from "@/sections";
import { useRouter } from "next/navigation";

import CommonStyles from "@/utils/commonStyles.module.css";
import Image from "next/image";
import Styles from "./style.module.css";

const BlogCard = ({ heading, date, img }) => {
  return (
    <div className={Styles.blog_card}>
      <div className={Styles.thumbnail}>
        <Image alt="decoration" src={img} className={Styles.img} />
      </div>
      <div className={Styles.text_cont}>
        <p className={Styles.date}>{date}</p>
      </div>
    </div>
  );
};

const page = () => {

  return (
    <>
      <MainSection
        animation={false}
        color="black"
        heading="Latest Blogs"
        secondHeading="deserves its own"
        gradient={"spotlight"}
        para={
          "Join forces with top-tier brands. Explore exclusive\n guides, frameworks, and real-world insights on how\n Skethish transforms everyday operations."
        }
        contactLinkMod="black"
        contactLinkText=""
      />

      <section className={`${Styles.sec_cont} ${CommonStyles.body_padding}`}>
        <div className={Styles.wraper}>
          <div className={Styles.card_cont}>
            <BlogCard
              heading={
                "What are the trending technology used now a days for software development?"
              }
              date={"Jaunary 4, 2024"}
              img={images.blog_1}
            />
            <BlogCard
              heading={
                "How to match fonts to your design: a comprehensive guide for designers "
              }
              date={"August 23, 2023"}
              img={images.blog_2}
            />
          </div>
          <BlogsList/>
        </div>
      </section>
      <FooterSection background={"#F7EDCF"} />
    </>
  );
};

export default page;
