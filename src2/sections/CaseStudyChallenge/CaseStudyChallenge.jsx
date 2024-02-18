import Image from "next/image"

import Styles from './style.module.css'

const CaseStudyChallenge = ({texts, picture, description}) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.container_block}>
        <div className={Styles.text_container}>
          <p className={Styles.title}>
            Challenge
          </p>

          <div className={Styles.texts}>
            {texts.map(text => (
              <p key={text} className={Styles.text}>
                {text}
              </p>
            ))}
          </div>
        </div>
        
        <div className={Styles.image_container}>
          <Image alt='screenshot' src={picture} className={Styles.image} />
        </div>
        {description &&
          <p className={Styles.description}>
            {description}
          </p>
        }
      </div>
    </div>
  )
}

export default CaseStudyChallenge