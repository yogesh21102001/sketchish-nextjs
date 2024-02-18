import { images } from "@/assets/images";
import { Button, SectionHeader } from "@/components";
import CommonStyles from "@/utils/commonStyles.module.css";
import Image from "next/image";
import Link from "next/link";
import Styles from "./style.module.css";

const BlogCard = ({heading, date, img})=>{
    return(
        <div className={Styles.blog_card}>
            <div className={Styles.thumbnail}>
               <Image alt='decoration' src={img} className={Styles.img}/>
            </div>
            <div className={Styles.text_cont}>
               <p className={Styles.date}>{date}</p>
               <Link href={"#"}>{heading}</Link>
            </div>
        </div>
    )
}

const BlogSection = () => {
  return (
    <section className={`${Styles.sec_cont} ${CommonStyles.body_padding}`}>
      <div className={Styles.wraper}>
        <SectionHeader
          heading={"See what’s new and"}
          gradient={"what’s next"}
          para={
            "Thought leadership and actionable insights to help you grow faster."
          }
          color={"black"}
        />
        <div className={Styles.card_cont}>
            <BlogCard heading={"What are the trending technology used now a days for software development?"} date={"Jaunary 4, 2024"} img={images.blog_1}/>
            <BlogCard heading={"How to match fonts to your design: a comprehensive guide for designers "} date={"August 23, 2023"} img={images.blog_2}/>
        </div>
       <div className={Styles.btn_cont}>
          <Button animate={true}>view all</Button>
       </div>
      </div>
    </section>
  );
};

export default BlogSection;
