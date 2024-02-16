import Image from 'next/image'

import Styles from './style.module.css'

import logo from './logo.svg'

const Foundations = () => {

  return (
    <div className={Styles.container}>
      <div className={Styles.block}>
        <div className={Styles.title_container}>
          <p className={Styles.title}>
            Strong foundation because
          </p>
          <Image alt='logo' src={logo} />
        </div>

        <div className={Styles.foundations_container}>
          <p className={Styles.foundation}>
            We do what we love
          </p>
          <p className={Styles.foundation}>
            We are skilled, honest, and transparent
          </p>
          <p className={Styles.foundation}>
            Always adding a value
          </p>
          <p className={Styles.foundation}>
            Super collaborative
          </p>
          <p className={Styles.foundation}>
            Good people around us
          </p>
        </div>
      </div>
    </div>
  )
}

export default Foundations