import React from 'react'

import Styles from "./style.module.css"

const Partners = () => {
  const partners = ['invision', 'medium', 'notion', 'slack', 'zoom', 'anydesk']

  return (
    <div className={Styles.wraper}>
      <span className={Styles.header}>
        Trusted by businesses and professionals
      </span>

      <div className={Styles.partners_container}>
        {partners.map((partner) => (
          <img
            alt={`partner ${partner}`}
            key={partner}
            src={`assets/main/partners/${partner}.svg`}
          />
        ))}
      </div>
    </div>
  );
}

export default Partners