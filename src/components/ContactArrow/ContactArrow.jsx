import Styles from "./style.module.css";

const ContactArrow = ({ color, contactLinkMod, contactLinkText }) => {

  return (
    <p
      className={`${Styles.contact_link} ${
        contactLinkMod === 'gradient' && Styles.contact_link_gradient
      }`}
      style={{ color: color }}
    >
      {contactLinkText}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="51"
        height="17"
        viewBox="0 0 51 17"
        fill="none"
      >
        <path
          d="M0.5 8.5H49.5M49.5 8.5L42 1M49.5 8.5L42 16"
          stroke={contactLinkMod === 'gradient' ? 'url(#paint0_linear_1864_152670)' : '#000000'}
        />
        <defs>
          <linearGradient
            id="paint0_linear_1864_152670"
            x1="49.5"
            y1="8"
            x2="19.6184"
            y2="-15.9016"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FA38A1" />
            <stop offset="0.568946" stopColor="#8F00FF" />
          </linearGradient>
        </defs>
      </svg>
    </p>
  )
}

export default ContactArrow