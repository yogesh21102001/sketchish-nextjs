import Image from 'next/image'

import { columns } from './data'

import cactus from './cactus.svg'

import CommonStyles from "@/utils/commonStyles.module.css";
import Styles from './style.module.css'

const WorkingSides = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.wraper}>
        <div className={Styles.header}>
          <p className={Styles.heading}>
            Good sides working
          </p>
          <p className={Styles.gradient}>
            with Sketchish
          </p>
        </div>

        <div className={Styles.board}>
          <p className={Styles.board_title}>
            The right way to build products
          </p>

          <p className={Styles.board_text}>
            Our services are tailored to meet the needs of each client. We applydigital product methodologies, including rapid prototyping, ongoing usability testing, and iterative development to bridge the gap between the digital experiences of users & their physical.
          </p>

          <p className={Styles.board_signature}>
            Team Sketchish
          </p>
          
          <Image className={Styles.board_cactus} src={cactus} />
        </div>

        <div className={Styles.columns}>
          {columns.map((column, i) => (
            <div key={i} className={Styles.column}>
              <p className={Styles.column_title}>
                {column.title}
              </p>
              <div className={Styles.column_items}>
                {column.items.map((item, index) => (
                  <p key={index} className={Styles.column_item}>
                    <span className={Styles.checkmark}>&#10003;</span> {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkingSides