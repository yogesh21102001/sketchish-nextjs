import React from 'react'

import choosed from './choosed.svg'

import './styles.scss'

const Button = (props) => {

  return (
    <button 
      onClick={props.onClick}
      className={`styled-button styled-button__${props.style} ${props.choosed ? 'styled-button__choosed' : ''} ${props.className}`}
    >
      {props.choosed ? <img alt='choosed' src={choosed} /> : props.text}
    </button>
  )
}

export default Button