import React from 'react'
import Styles from "./style.module.css"

const SectionHeader = ({color, heading, gradient, para, paraWidth, textAlign = "center", alignItems = "center", width}) => {
  return (
    <div className={Styles.header_cont} style={{alignItems:alignItems, margin:alignItems=="flex-start"?0:'', width:width}}>
        <h2 className={Styles.main_header} style={{color:color, textAlign:textAlign}}>{heading} {gradient&&(<><br/> <span className={Styles.gredient_animation}>{gradient}</span></>)}</h2>
        {para && <p className={Styles.para} style={{width:paraWidth, color:color, textAlign:textAlign}}>{para}</p>}
    </div>
  )
}

export default SectionHeader