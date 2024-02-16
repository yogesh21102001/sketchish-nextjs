import CommonStyles from "../../../utils/commonStyles.module.css";
import Styles from "./style.module.css";

import { SectionHeader } from "@/components";
import Image from "next/image";

import { images } from "@/assets/images";

const Brands = () => {
  return (
    <section className={`${CommonStyles.show_container} ${Styles.section}`}>
      <div className={Styles.wraper}>
        <SectionHeader
          heading={"Brands trust on us"}
          para={"Different brands, different industries, consistent outcome."}
          color={"black"}
        />
        <div className={Styles.motion_div_cont}>
          <div className={`${Styles.other_brands_cont} ${Styles.motion_div}`}>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Accord} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.AVG} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Arrow} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Automate} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Disnep} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.GoDaddy} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Kaplan} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.PAndG} />
            </div>
          </div>
          <div className={`${Styles.other_brands_cont} ${Styles.motion_div}`}>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Accord} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.AVG} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Arrow} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Automate} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Disnep} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.GoDaddy} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.Kaplan} />
            </div>
            <div className={Styles.img_cont}>
              <Image alt='logo' src={images.PAndG} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
