import React from 'react'

import './styles.scss'

const InfoContainer = (props) => {

  return (
    <div className='info-container'>
      {props.title && props.text && (
        <div className='info-container__header'>
          <span className='info-container__title'>
            {props.title}
          </span>

          <span className='info-container__text'>
            {props.text}
          </span>
        </div>
      )}
      
      <div className='info-container__blocks'>
        {props.blocks.map(block => (
          <div className={`info-container__block ${props.wide ? 'info-container__wide-block' : ''}`}>
            <img
              src={`assets/freeLicence/${block.name}.svg`}
              alt={block.name}
              className='info-container__block_picture'
            />
            <span className='info-container__block_title'>
              {block.title}
            </span>
            <span className='info-container__block_text'>
              {block.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoContainer