
import Image from 'next/image'

import line from './line.svg'

import Styles from './style.module.css'

const WhatWeDo = ({ heading, gradient, stages }) => {

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <p className={Styles.heading}>
          {heading}
        </p>
        <p className={Styles.gradient}>
          {gradient}
        </p>
      </div>

      <div className={Styles.stages}>
        {stages?.map((stage, index) => (
          <div key={stage.title} className={Styles.stage_container}>
            <div className={Styles.stage} style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
              <div className={Styles.stage_block}>
                <div className={Styles.number} style={{ backgroundColor: stage.backgroundColor }}>
                  {index + 1}
                </div>
                <div className={Styles.text}>
                  <p className={Styles.title}>
                    {stage.title}
                  </p>
                  <p className={Styles.description}>
                    {stage.description}
                  </p>
                </div>
              </div>
              <Image className={Styles.picture} alt={`interpretation of ${stage.title}`} src={stage.picture} />
            </div>

            <Image className={`${Styles.picture} ${Styles.picture_mobile}`} alt={`interpretation of ${stage.title}`} src={stage.picture} />

            {stages?.length - 1 > index &&
              <div className={Styles.line} style={{ transform: index % 2 === 0 ? '' : 'scaleX(-1)'}}>
                <Image alt='line' key={`${stage}-line`} src={line} />
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatWeDo