

import Image from 'next/image'

import ContactArrow from '@/components/ContactArrow/ContactArrow'

import accordLogo from './logos/accord.svg'
import faceoffLogo from './logos/faceoff.svg'
import godaddyLogo from './logos/godaddy.svg'
import arrowLogo from './logos/arrow.svg'

import accordInterface from './interfaces/accord.webp'
import faceoffInterface from './interfaces/faceoff.webp'
import godaddyInterface from './interfaces/godaddy.webp'
import arrowInterface from './interfaces/arrow.webp'

import Styles from './style.module.css'
import Link from 'next/link'

const StudyCase = ({ name, focusPoints, title, description, services, backgroundColor, href }) => {
  const logos = {
    accord: accordLogo,
    faceoff: faceoffLogo,
    godaddy: godaddyLogo,
    arrow: arrowLogo,
  }
  
  const interfaces = {
    accord: accordInterface,
    faceoff: faceoffInterface,
    godaddy: godaddyInterface,
    arrow: arrowInterface,
  }

  return (
    <div
      className={Styles.container}
      style={{
        backgroundColor: backgroundColor
      }}
      key={name}
    >
      <div className={Styles.container_block}>
        <div className={Styles.main_information}>
          <div className={Styles.company}>
            <Image
              alt={`${name} logo`}
              src={logos[name]}
              className={Styles.logo}
            />
            <div className={Styles.focus_points}>
              {focusPoints.map((focusPoint) => (
                <p key={focusPoint} className={Styles.property}>
                  {focusPoint}
                </p>
              ))}
            </div>
          </div>

          <p className={Styles.title}>
            {title}
          </p>

          <p className={Styles.description}>
            {description}
          </p>

          <Link href={`/case-studies/${href}`} className={Styles.contact_arrow_container}>
            <ContactArrow
              contactLinkMod='black'
              contactLinkText='read full case study'
            />
          </Link>
        </div>

        <div className={Styles.secondary_information}>
          <Image
            alt={`interface ${name}`}
            src={interfaces[name]}
            className={Styles.interface}
          />

          <div className={Styles.services}>
            {services.map((service, index) => (
              <p key={`${service}-${index}`} className={Styles.property}>
                {service}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyCase