import "./style.css";
const Index = ({ ...props }) => {
    return (
        <div className="container email-container">
            <div className="container-frame plugin-frame">
                <div className="content">
                    <svg
                        className="email-icon"
                        width="96"
                        height="62"
                        viewBox="0 0 96 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 59V3H93V59H3Z"
                            fill="white"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                        />
                        <path
                            d="M93 3H3L46.9166 31.3018C47.5763 31.727 48.4237 31.727 49.0834 31.3018L93 3Z"
                            fill="#FAD338"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <rect
                            width="6"
                            height="6"
                            rx="3"
                            fill="white"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                        />
                        <rect
                            x="90"
                            width="6"
                            height="6"
                            rx="3"
                            fill="white"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                        />
                        <rect
                            y="56"
                            width="6"
                            height="6"
                            rx="3"
                            fill="white"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                        />
                        <rect
                            x="90"
                            y="56"
                            width="6"
                            height="6"
                            rx="3"
                            fill="white"
                            stroke="#3F5AD3"
                            strokeWidth="2"
                        />
                        <g filter="url(#filter0_d_10549_63854)">
                            <path
                                d="M77.1454 60.3478L67 36L91.3478 45.9424L80.7478 49.4424L77.1454 60.3478Z"
                                fill="black"
                            />
                            <path
                                d="M77.1454 60.3478L67 36L91.3478 45.9424L80.7478 49.4424L77.1454 60.3478Z"
                                stroke="#F0F1F3"
                                strokeLinejoin="round"
                            />
                        </g>
                        <rect x="46.5" y="23.5" width="3" height="17" rx="1.5" stroke="black" />
                        <rect
                            x="45"
                            y="27"
                            width="6"
                            height="6"
                            rx="3"
                            transform="rotate(-90 45 27)"
                            fill="#E5412E"
                        />
                        <rect
                            x="45"
                            y="43"
                            width="6"
                            height="6"
                            rx="3"
                            transform="rotate(-90 45 43)"
                            fill="#E5412E"
                        />
                        <defs>
                            <filter
                                id="filter0_d_10549_63854"
                                x="63.4565"
                                y="33.9783"
                                width="31.4348"
                                height="31.4346"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy="1.52174" />
                                <feGaussianBlur stdDeviation="1.52174" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_10549_63854"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_10549_63854"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>

                    <div className="content2">
                        <div className="get-latest-updates-to-your-inbox">
                            Get Latest updates to your Inbox{" "}
                        </div>
                        <div className="we-keep-adding-new-icons-every-week-get-the-latest-updates-to-your-inbox-subscribe-to-your-newsletter-today">
                            We keep adding new icons every week, get the latest updates to your
                            inbox. Subscribe to your newsletter today!{" "}
                        </div>
                    </div>
                    <div className="form">
                        <div className="input-box">
                            <div className="email-address">Email address </div>
                        </div>
                        <div className="button">
                            <div className="button2">Subscribe </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;