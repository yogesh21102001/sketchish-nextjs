import Image from "next/image";

import { images } from "@/assets/images";

import Styles from './style.module.css'

const Review = ({ score, text, reviewer }) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.container_block}>
        <div className={Styles.score}>
          {[...Array(score)].map((_, index) => (
            <Image
              alt='Star'
              className={Styles.star}
              src={images.whiteStar}
              height={30}
              width={30}
              key={index}
            />
          ))}
        </div>

        <p className={Styles.text}>
          {text}
        </p>

        <p className={Styles.reviewer}>
          {reviewer}
        </p>
      </div>
    </div>
  )
}

export default Review