import React, {useState} from 'react'
import Styles from "./style.module.css"

export const InputField = ({
  placeHolder,
  value,
  onChange,
  type,
  width,
  maxLength,
  onCross,
  height,
  textarea,
  className
}) => {
  const [isFocus, setFocus] = useState(false);
  const [inputType, setType] = useState(type);
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className={`${Styles.inp_cont} ${
        isFocus ? Styles.focused : ""
      } ${className}`}
      style={{ width: width ? width : "100%", height: height ? height : "" }}
    >
      {textarea ? (
        <textarea
          className={Styles.text_area}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      ) : (
        <input
          className={Styles.inp}
          type={type == "password" ? (showPass ? "text" : "password") : type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeHolder}
          value={value}
          maxLength={maxLength && maxLength}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      )}
      {type == "password" ? (
        <>
          {showPass ? (
            <svg
              onClick={() => setShowPass(false)}
              width="48px"
              height="48px"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.5389 16.4611C39.0591 19.3507 43 23 43 23C43 23 33.9411 33 24 33C22.2119 33 20.4846 32.6765 18.8542 32.1458M14.7085 30.2915C9.48947 27.33 5 23 5 23C5 23 14.0589 13 24 13C26.3325 13 28.5613 13.5505 30.6068 14.3932"
                stroke="#676f7eff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28 23C28 25.2091 26.2091 27 24 27C21.7909 27 20 25.2091 20 23C20 20.7909 21.7909 19 24 19C26.2091 19 28 20.7909 28 23Z"
                stroke="#676f7eff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 37L36 9"
                stroke="#676f7eff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              onClick={() => setShowPass(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21.5 11.5C21.5 11.5 16.9706 16.5 12 16.5C7.02944 16.5 2.5 11.5 2.5 11.5C2.5 11.5 7.02944 6.5 12 6.5C16.9706 6.5 21.5 11.5 21.5 11.5Z"
                stroke="#676F7E"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 11.5C14 12.6046 13.1046 13.5 12 13.5C10.8954 13.5 10 12.6046 10 11.5C10 10.3954 10.8954 9.5 12 9.5C13.1046 9.5 14 10.3954 14 11.5Z"
                stroke="#676F7E"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </>
      ) : (
        ""
      )}
      {onCross && (
        <svg
          onClick={onCross}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g opacity="0.6">
            <circle cx="8" cy="8" r="8" fill="#676F7E" />
            <path
              d="M10.4 5.60022L7.97094 8.0293M5.60007 10.4002L7.97094 8.0293M7.97094 8.0293L5.54187 5.60022M7.97094 8.0293L10.4 10.4584"
              stroke="white"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
};