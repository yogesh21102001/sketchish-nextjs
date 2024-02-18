import React from 'react'
import { useNavigate } from "react-router-dom";
import dots from '../pictures/dots.svg'

import './styles.scss'
const HistoryTab = (props) => {
  const navigate = useNavigate();
  const { openTabs, userHis, hendelDownload } = props
  return (
    <>
      <div className='profile-interface__table_header'>
        <span className='profile-interface__table_date'>
          Date
        </span>
        <span className='profile-interface__table_item'>
          Item
        </span>
        <span className='profile-interface__table_subscription'>
          Subscription
        </span>
        <span className='profile-interface__table_royalty'>
          License
        </span>
      </div>

      {userHis?.map((element, index) => index >= openTabs * 50 && index < openTabs * 50 + 50 ? (
        <div key={index} className='profile-interface__table_row'>
          <span className='profile-interface__table_date'>
            {element.date || new Date(element.updatedAt).toLocaleDateString()}
          </span>
          <div style={{ cursor: 'pointer' }} className='profile-interface__table_item' onClick={() => navigate(`/icons/${element?.label || element?.roductVariants?.label}?t=${element?.productVariants?.type}&s=${element?.productVariants?.styleSet}`)}>

            <img alt='item' src={element?.url || element?.productVariants?.previewUrl} />
            <span>
              {`${element?.label || element?.productVariants?.label} ${element?.productVariants?.type.toLowerCase()} ${element?.productVariants?.styleSet.toLowerCase()}`}.{element?.type}
            </span>
          </div>
          <span className='profile-interface__table_subscription'>
            {element?.subscription || 'basic'}
          </span>
          <div className='profile-interface__table_royalty'>
            <span>
              {element?.productVariants.licence ? element?.productVariants.licence : element?.paid == 1 ? 'Royalty Free' : 'Must Attribute'}
            </span>
            <svg style={{ cursor: "pointer" }} onClick={() => hendelDownload({
              id: element?.productId,
              isCopy: false,
              label: element?.label,
              isFileType: element?.type,
              styleset: element?.productVariants?.styleSet.toLowerCase()
            })} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M9 14.6L16 21M16 21L23 14.6M16 21V7" stroke="#1E3050" stroke-width="2" />
              <path d="M23 25H9" stroke="#1E3050" stroke-width="2" />
            </svg>
          </div>
        </div>
      ) : null)}
    </>
  )
}

export default HistoryTab