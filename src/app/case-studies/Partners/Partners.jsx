
import Image from 'next/image'

import { interfaces, partners } from './data'

import Styles from './style.module.css'

const Partners = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.partners}>
        {partners.map(partner => (
          <div key={partner.name} className={Styles.partner}>
            <Image
              className={Styles.interface}
              alt={`${partner.title} interface`}
              src={interfaces[partner.name]}
            />
            <p className={Styles.title}>
              {partner.title}
            </p>
            <p className={Styles.text}>
              {partner.text}
            </p>
            <p className={`${Styles.services} ${Styles.text}`}>
              {partner.services}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partners