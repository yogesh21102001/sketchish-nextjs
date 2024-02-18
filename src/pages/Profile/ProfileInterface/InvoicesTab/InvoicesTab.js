import React from 'react'
import { months } from '../ProfileInterface'
import { format } from "date-fns";
import dots from '../pictures/dots.svg'
import paid from './paid.svg'
import fail from './fail.svg'
import './styles.scss'
import CustomDropDown from "../../../../components/custom-dropdown/CustomDropDown"

const InvoicesTab = (props) => {
  const { userInvoices, openTabs } = props
  const DUMMY_DATA = [{
    _id: "63c7b36b8cc47282496c302c",
    userId: "63bbb7d312349159bdda34b1",
    description: "subscription",
    currency: "inr",
    amount: 500,
    status: "paid",
    paymentLink: null,
    invoiceLink: "https://pay.stripe.com/invoice/acct_1MEtS7SFKhHIh7Gb/test_YWNjdF8xTUV0UzdTRktoSEloN0diLF9OQnZEdlk1RUpHNVdndllycjNFNUlkVXNFUE4zMVU5LDY0NTcyNzc502005pkeJ4OE/pdf?s=ap",
    date: "2023-01-18T07:24:16.165Z",
    createdAt: "2023-01-18T08:52:59.883Z",
    updatedAt: "2023-01-18T08:52:59.883Z",
    __v: 0
  },]
  return (
    <>
      <div className='profile-interface__table_header'>
        <span className='profile-interface__table_date'>
          Date
        </span>
        <span className='profile-interface__table_item'>
          Plan
        </span>
        <span className='profile-interface__table_subscription'>
          Amount
        </span>
        <span className='profile-interface__table_royalty'>
          Status
        </span>
      </div>

      {userInvoices?.map((element, index) => index >= openTabs * 10 && index < openTabs * 10 + 10 ? (
        <div key={index} className='profile-interface__table_row'>
          <span className='profile-interface__table_date'>
            {format(new Date(element?.date), "dd MMM yyyy")}
          </span>
          <span className='invoice-tab__table_plan'>
            {element?.description}
            {element?.planDuration ? ` (${element?.planDuration})` : ''}
          </span>
          <span className='profile-interface__table_subscription'>
            ${element?.amount}
          </span>
          <div className='profile-interface__table_royalty'>
            <div className='invoice-tab__status_container'>
              {
                element?.status?.toLowerCase() == "failed" ? <img alt='paid' src={fail} /> : <img alt='paid' src={paid} />
              }
              
              <span>
                {element?.status}
              </span>
              {element?.refunded && (
                <span className='invoice-tab__status_refund'>
                  REFUNDED
                </span>
              )}
            </div>
            <svg style={{ cursor: "pointer" }} onClick={() => window.open(element?.invoiceLink)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M9 14.6L16 21M16 21L23 14.6M16 21V7" stroke="#1E3050" stroke-width="2" />
              <path d="M23 25H9" stroke="#1E3050" stroke-width="2" />
            </svg>
          </div>
        </div>
      ) : null)}
    </>
  )
} 

export default InvoicesTab