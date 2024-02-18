import React from 'react'
import Styles from "./styles.module.css"

export const IconResultNotFound = ({fromBucket}) => {
  return (
    <div className={Styles.result_not_found_cont}>
      <div className={Styles.main_cont}>
        {!fromBucket ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
            >
              <path
                d="M17 36C17 32.6863 19.6863 30 23 30H137C140.314 30 143 32.6863 143 36V110H17V36Z"
                fill="#E9EAEE"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M23 37C23 36.4477 23.4477 36 24 36H136C136.552 36 137 36.4477 137 37V110H23V37Z"
                fill="white"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M5 110H155V112C155 116.418 151.418 120 147 120H13C8.58172 120 5 116.418 5 112V110Z"
                fill="#E9EAEE"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M67 110H97V112C97 113.105 96.1046 114 95 114H69C67.8954 114 67 113.105 67 112V110Z"
                fill="#E9EAEE"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M51 58C51 57.4477 51.4477 57 52 57H108C108.552 57 109 57.4477 109 58V94C109 94.5523 108.552 95 108 95H52C51.4477 95 51 94.5523 51 94V58Z"
                fill="white"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M51 57H109V53C109 52.4477 108.552 52 108 52H52C51.4477 52 51 52.4477 51 53V57Z"
                fill="#E9EAEE"
                stroke="#4B5973"
                stroke-width="2"
              />
              <path
                d="M76 75L67 66"
                stroke="#4B5973"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M76 66L67 75"
                stroke="#4B5973"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M93 75L84 66"
                stroke="#4B5973"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M93 66L84 75"
                stroke="#4B5973"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M67 83H93.042C93.2493 83 93.4515 83.0644 93.6206 83.1843L99 87"
                stroke="#4B5973"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <div>
              <h3>We are missing it</h3>
              <p>
                We have misplaced it or need to add. <br /> We can help you to
                get it.
              </p>
            </div>
            <button
              onClick={() =>
                window.open("https://discord.com/invite/QN3Zwf4KWK")
              }
            >
              Request Icon Now
            </button>
          </>
        ) : (
          <>
            <svg
              className={Styles.bucket_icon}
              width="201"
              height="253"
              viewBox="0 0 201 253"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M162.704 57.4529C162.704 57.4529 109.865 8.64732 69.3846 29.0873C38.4704 44.6969 23.1238 71.308 25.0447 105.886C27.5605 151.174 96.2043 172.634 96.2043 172.634"
                fill="#FFF9F5"
                stroke="url(#paint0_linear_290_3741)"
                stroke-width="2.5"
              />
              <path
                d="M172.203 40.9985L86.7031 189.089"
                stroke="url(#paint1_linear_290_3741)"
                stroke-width="2.5"
              />
              <path
                d="M151.772 77.0977C173.812 79.0149 192.197 96.212 194.799 119.044C197.402 141.877 183.359 162.77 162.316 169.598"
                stroke="url(#paint2_linear_290_3741)"
                stroke-width="2.5"
              />
              <rect
                x="136.258"
                y="158.794"
                width="12"
                height="12"
                transform="rotate(45 136.258 158.794)"
                fill="#FF627D"
              />
              <path
                d="M119.848 209.957L104.771 207.743L114.227 195.794L119.848 209.957Z"
                fill="#50F9A8"
              />
              <circle cx="158.771" cy="199.794" r="8" fill="#50B8F9" />
              <circle cx="99.7715" cy="244.794" r="8" fill="#FF627D" />
              <path
                d="M179.771 224.794L191.771 236.794"
                stroke="#FA9F54"
                stroke-width="2"
                stroke-linecap="square"
              />
              <path
                d="M179.771 236.794L191.771 224.794"
                stroke="#FA9F54"
                stroke-width="2"
                stroke-linecap="square"
              />
              <rect
                x="136.771"
                y="231.794"
                width="15"
                height="15"
                fill="#7238FA"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_290_3741"
                  x1="266.115"
                  y1="74.6654"
                  x2="24.271"
                  y2="269.608"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFC109" />
                  <stop offset="1" stop-color="#FF0AE6" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_290_3741"
                  x1="193.521"
                  y1="5.87217"
                  x2="186.615"
                  y2="2.06067"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFC109" />
                  <stop offset="1" stop-color="#FF0AE6" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_290_3741"
                  x1="220.927"
                  y1="46.7045"
                  x2="131.547"
                  y2="201.251"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFC109" />
                  <stop offset="1" stop-color="#FF0AE6" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <h3>We are missing it</h3>
              <p>
                We have misplaced it or need to add. <br /> We can help you to
                get it.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};