import React from 'react'

import './styles.scss'

const Textarea = (props) => {

  return (
    <textarea
      placeholder={props.placeholder}
      className={`textarea ${props.className}`}
      rows={props.rows}
    />
  )
}

export default Textarea