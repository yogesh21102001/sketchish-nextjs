import Image from 'next/image'

import Styles from './style.module.css'

const WhatWeDid = ({texts, schemes}) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.container_block}>
        <p className={Styles.title}>
          What we did
        </p>

        {texts.map(text => (
          <div key={text} className={Styles.text_container}>
            {text.paragraph &&
              <p className={Styles.paragraph}>
                {text.paragraph}
              </p>
            }
            <p className={Styles.text}>
              {text.text}
            </p>
          </div>
        ))}
      </div>
      {schemes && schemes.map(scheme => (
        <div key={scheme.description} className={Styles.scheme}>
          <Image alt='scheme' className={Styles.scheme_picture} src={scheme.picture} />
          <p className={Styles.scheme_description}>
            {scheme.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default WhatWeDid