import Image from 'next/image'

import update1 from './update1.webp'
import update2 from './update2.webp'

import Styles from './style.module.css'
import { Button } from '@/components'
import CalendlyEmbed from '@/components/CalendlyEmbed/CalendlyEmbed'

const ServicesBlog = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <p className={Styles.title}>
          Featured Resources
        </p>

        <p className={Styles.subgraph}>
          Thought leadership and actionable insights to help you grow faster.
        </p>
      </div>

      <div className={Styles.updates}>
        <div className={Styles.update}>
          <Image src={update1} alt='random picture' className={Styles.update_picture} />
          <div className={Styles.description}>
            <p className={Styles.date}>
              Jaunary 4, 2024
            </p>

            <p className={Styles.update_text}>
              What are the trending technology used now a days for software development?
            </p>
          </div>
        </div>

        <div className={Styles.update}>
          <Image src={update2} alt='random picture' className={Styles.update_picture} />
          <div className={Styles.description}>
            <p className={Styles.date}>
              Jaunary 4, 2024
            </p>

            <p className={Styles.update_text}>
              What are the trending technology used now a days for software development?
            </p>
          </div>
        </div>
      </div>

      <div className={Styles.button}>
          <CalendlyEmbed animate={true} margin={0} text="view all" />
      </div>
    </div>
  )
}

export default ServicesBlog