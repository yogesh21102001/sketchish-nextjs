import React from 'react'
import Styles from "./styles.module.css"
import { OSBrandLogo, NotFoundIcon } from '../../assets/svg'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

 const navigate = useNavigate()

  return (
    <div className={Styles.not_found_page}>
      {/* <div className={Styles.header}>
        <OSBrandLogo className={Styles.brand_logo} onClick={() => navigate("/")} />
      </div> */}
      <div className={Styles.txt_cont}>
        <NotFoundIcon />
        <div className={Styles.txt}>
          <h3>Page not found</h3>
          <p>The page you are looking for could not be found.</p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage