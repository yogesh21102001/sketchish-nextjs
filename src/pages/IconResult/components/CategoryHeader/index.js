import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdsComponent from "../../../../components/AdsComponent"
import AuthContext from "../../../../context/AuthProvider";
import Tooltip from '@mui/material/Tooltip';
import "./style.css";

export const CategoryHeader = ({ name, count, freeCount, productLoading, adKey }) => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);
    const [isAds, setAds] = useState(true)  

    useEffect(() => {
        if (auth?.userLimit?.planName && auth?.userLimit?.planName?.toLowerCase() != "basic") {
            setAds(false);
        }
    }, [auth])
    return (
        <div className="page-img">
            <div className="content">
                <div className="content2">
                    <div className="page-img-text">
                        <div className="communication-icons">{name} Icons</div>
                        <div className="no-need-to-reinvent-the-wheel-openstroke-io-let-you-focus-on-project-we-focus-on-icons">
                            No need to reinvent the wheel. Openstrokeicons.com let you focus on
                            project, We focus on icons.
                        </div>
                    </div>
                    <div className="tags">
                        <div className="tag">
                            <div className="body-1">{count} Icons</div>
                        </div>

                        <div className="tag">
                            <div className="body-1">{freeCount} free</div>
                        </div>
                    </div>

                    <div className="ad">
                        {isAds && <div className="ads">
                            <Tooltip
                                title="Remove Ad"
                                placement="right-start"
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            color: "white",
                                            backgroundColor: "red",
                                            fontSize: "1em"
                                        }
                                    }
                                }}
                            >
                                <svg
                                    onClick={() => navigate('/pricing')}
                                    className="group-37151__icon-close-circle"
                                    width="27"
                                    height="26"
                                    viewBox="0 0 27 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="13.5" cy="13" r="13" fill="#1E3050" />
                                    <path
                                        d="M18.2096 8.29043L13.4429 13.0571M8.79045 17.7096L13.4429 13.0571M13.4429 13.0571L8.67623 8.29043M13.4429 13.0571L18.2096 17.8238"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Tooltip>
                            <AdsComponent key={adKey} adBy={"google"} dataAdSlot={3875215187}></AdsComponent>
                            
                        </div>}
                    </div>
                </div>

                <div className="grid">
                    <svg
                        className="h"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M25.5996 16.0002L30.3957 22.3135M25.5996 16.0002L15.9967 3.18457L6.39572 15.9986M25.5996 16.0002L25.6 30.4002L6.39648 30.4002L6.39572 15.9986M6.39572 15.9986L1.59961 22.3133"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 30.3999L30.3996 30.3999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.0004 20.8001C15.1167 20.8001 14.4004 20.0838 14.4004 19.2001C14.4004 18.3164 15.1167 17.6001 16.0004 17.6001C16.884 17.6001 17.6004 18.3164 17.6004 19.2001C17.6004 20.0838 16.884 20.8001 16.0004 20.8001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M29.6663 17.3332C29.6663 24.8811 23.5476 30.9998 15.9997 30.9998C8.45178 30.9998 2.33301 24.8811 2.33301 17.3332C2.33301 9.78528 8.45178 3.6665 15.9997 3.6665C23.5476 3.6665 29.6663 9.78528 29.6663 17.3332Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.667 0.666504H19.3337"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 8.6665V17.9998H25.3333"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 0.666504V2.6665"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 9.5998C1.59961 8.71615 2.31595 7.9998 3.19961 7.9998H8.93687C9.36121 7.9998 9.76818 7.83123 10.0682 7.53118L12.331 5.26843C12.631 4.96838 13.038 4.7998 13.4624 4.7998H18.5369C18.9612 4.7998 19.3682 4.96838 19.6682 5.26843L21.931 7.53118C22.231 7.83123 22.638 7.9998 23.0624 7.9998H28.7996C29.6833 7.9998 30.3996 8.71615 30.3996 9.5998V25.5998C30.3996 26.4835 29.6833 27.1998 28.7996 27.1998H3.19961C2.31595 27.1998 1.59961 26.4835 1.59961 25.5998V9.5998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 17.5998C20.8002 20.2508 18.6512 22.3998 16.0002 22.3998C13.3492 22.3998 11.2002 20.2508 11.2002 17.5998C11.2002 14.9488 13.3492 12.7998 16.0002 12.7998C18.6512 12.7998 20.8002 14.9488 20.8002 17.5998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="b"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24 14.3999V17.5999C24 19.6143 24.9484 21.5112 26.56 22.7199C27.7901 23.6425 27.1376 25.5999 25.6 25.5999H6.39998C4.86236 25.5999 4.20988 23.6425 5.43998 22.7199C7.05154 21.5112 7.99998 19.6143 7.99998 17.5999V14.3999C7.99998 9.98162 11.5817 6.3999 16 6.3999C20.4183 6.3999 24 9.98162 24 14.3999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 6.4002L16 3.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.0002 30.4001C18.6512 30.4001 20.8002 28.2511 20.8002 25.6001H11.2002C11.2002 28.2511 13.3492 30.4001 16.0002 30.4001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="b2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.9996 6.45321C20.0093 3.76873 25.9713 5.20005 29.2399 6.12122C29.928 6.31515 30.3996 6.94662 30.3996 7.66155V25.8727C30.3996 27.1379 28.9955 27.904 27.8871 27.2938C22.8847 24.54 19.4684 24.3601 15.9996 27.2537C11.5413 24.185 8.62591 25.0495 3.97901 27.5067C2.90317 28.0755 1.59961 27.3111 1.59961 26.0941V7.67161C1.59961 6.95114 2.0779 6.31706 2.77332 6.12871C6.23123 5.19221 12.4172 3.75878 15.9996 6.45321Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 6.45312V27.2536"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="e"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 3.38705L18.6039 11.8134C18.8628 12.6514 19.6376 13.2229 20.5147 13.2229H29.0437L22.0587 18.559C21.3926 19.0678 21.1145 19.938 21.362 20.7388L24.0094 29.3061L17.2141 24.1149C16.4973 23.5673 15.5027 23.5673 14.7859 24.1149L7.99059 29.3061L10.638 20.7388C10.8855 19.938 10.6074 19.0678 9.94131 18.559L2.9563 13.2229L11.4853 13.2229C12.3624 13.2229 13.1372 12.6514 13.3961 11.8134L16 3.38705Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="f"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.2002 3.32138C3.2002 2.61705 3.66174 2.00421 4.35647 1.88835C6.12433 1.59353 9.85949 1.2654 15.1469 2.34474C19.1554 3.16303 22.7516 3.29493 25.2458 3.23827C26.6263 3.20691 27.6018 4.81597 26.8442 5.97047L24.0391 10.245C23.7134 10.7413 23.6893 11.3772 23.9764 11.8967L27.5818 18.4208C28.0762 19.3152 27.6083 20.4046 26.5968 20.5501C24.3222 20.8773 20.244 21.1028 15.3776 19.759C9.70763 18.1936 5.66131 18.7601 4.01597 19.0979C3.50176 19.2035 3.2002 18.9621 3.2002 18.4371V3.32138Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.2002 30.4L3.2002 16"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="h2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.63943 22.4003C1.1976 21.635 1.4598 20.6565 2.22507 20.2146C2.99034 19.7728 3.96888 20.035 4.41071 20.8003L9.21071 29.1141C9.65254 29.8794 9.39034 30.8579 8.62507 31.2998C7.8598 31.7416 6.88126 31.4794 6.43943 30.7141L1.63943 22.4003Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.73611 21.3676C4.29428 20.6023 4.55648 19.6237 5.32175 19.1819C6.08702 18.7401 7.06556 19.0023 7.50739 19.7676L11.6526 26.9473C12.0945 27.7126 11.8323 28.6911 11.067 29.1329C10.3017 29.5748 9.32317 29.3126 8.88134 28.5473L4.73611 21.3676Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4354 22.4009C30.8772 21.6356 30.615 20.6571 29.8497 20.2153C29.0845 19.7734 28.1059 20.0356 27.6641 20.8009L22.8641 29.1147C22.4223 29.88 22.6845 30.8586 23.4497 31.3004C24.215 31.7422 25.1935 31.48 25.6354 30.7147L30.4354 22.4009Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M27.3398 21.3627C27.7816 20.5974 27.5194 19.6189 26.7542 19.177C25.9889 18.7352 25.0103 18.9974 24.5685 19.7627L20.4178 26.952C19.9759 27.7173 20.2381 28.6958 21.0034 29.1376C21.7687 29.5795 22.7472 29.3173 23.189 28.552L27.3398 21.3627Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2.226 20.214C1.81873 18.8811 1.59961 17.4662 1.59961 16"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4018 16C30.4018 17.4662 30.1827 18.8811 29.7754 20.214"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 16.0001C1.59961 8.0472 8.04671 1.6001 15.9996 1.6001C23.9525 1.6001 30.3996 8.0472 30.3996 16.0001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="l"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.7998 15.9999C4.7998 15.1162 5.51615 14.3999 6.3998 14.3999H25.5998C26.4835 14.3999 27.1998 15.1162 27.1998 15.9999V28.7999C27.1998 29.6836 26.4835 30.3999 25.5998 30.3999H6.39981C5.51615 30.3999 4.7998 29.6836 4.7998 28.7999V15.9999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.6004 22.3998C17.6004 23.2835 16.884 23.9998 16.0004 23.9998C15.1167 23.9998 14.4004 23.2835 14.4004 22.3998C14.4004 21.5161 15.1167 20.7998 16.0004 20.7998C16.884 20.7998 17.6004 21.5161 17.6004 22.3998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 14.4001V9.6001C8 5.18182 11.5817 1.6001 16 1.6001C20.4183 1.6001 24 5.18182 24 9.6001V14.4001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="e2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.3993 20.8003H6.39933L2.64355 9.27197C3.53049 10.3281 4.89447 10.965 6.38713 10.8584L7.19935 10.8004L10.3993 20.8003Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21.6006 32H25.6006L29.3564 20.4717C28.4694 21.5278 27.1054 22.1648 25.6128 22.0581L24.8006 22.0001L21.6006 32Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 6.40075C1.59961 3.80699 3.80024 1.75794 6.38741 1.94274L9.0846 2.1354C11.1778 2.28491 12.7996 4.02668 12.7996 6.12523V6.67628C12.7996 8.77483 11.1778 10.5166 9.0846 10.6661L6.38741 10.8588C3.80024 11.0436 1.59961 8.99452 1.59961 6.40075Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4002 17.601C30.4002 15.0072 28.1996 12.9581 25.6124 13.1429L22.9152 13.3356C20.822 13.4851 19.2002 15.2269 19.2002 17.3254V17.8765C19.2002 19.975 20.822 21.7168 22.9152 21.8663L25.6124 22.059C28.1996 22.2438 30.4002 20.1947 30.4002 17.601Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.7998 8.34971V4.45069C12.7998 3.7329 13.5174 3.14533 14.398 3.20428C15.0723 3.24941 15.7367 3.32285 16.3894 3.42312C17.1068 3.53332 17.5998 4.05686 17.5998 4.64988V8.15052C17.5998 8.74354 17.1068 9.26707 16.3894 9.37727C15.7367 9.47754 15.0723 9.55098 14.398 9.59611C13.5174 9.65506 12.7998 9.0675 12.7998 8.34971Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.2004 19.5494V15.6504C19.2004 14.9326 18.4828 14.345 17.6022 14.404C16.9279 14.4491 16.2635 14.5226 15.6108 14.6228C14.8934 14.733 14.4004 15.2566 14.4004 15.8496V19.3502C14.4004 19.9432 14.8934 20.4668 15.6108 20.577C16.2635 20.6773 16.9279 20.7507 17.6022 20.7958C18.4828 20.8548 19.2004 20.2672 19.2004 19.5494Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.4002 6.3999L3.2002 6.3999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M25.5996 17.6001L28.7996 17.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="r"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 11.2001C1.59961 10.3164 2.31595 9.6001 3.19961 9.6001H28.7996C29.6833 9.6001 30.3996 10.3164 30.3996 11.2001V27.2001C30.3996 28.0838 29.6833 28.8001 28.7996 28.8001H3.19961C2.31595 28.8001 1.59961 28.0838 1.59961 27.2001V11.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6.40039 19.1999C6.40039 21.8509 8.54942 23.9999 11.2004 23.9999C13.8514 23.9999 16.0004 21.8509 16.0004 19.1999C16.0004 16.5489 13.8514 14.3999 11.2004 14.3999C8.54942 14.3999 6.40039 16.5489 6.40039 19.1999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M28.7998 3.2002L6.18834 6.21506C5.39345 6.32104 4.7998 6.9991 4.7998 7.80102V9.6002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.7998 24L25.5998 24"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22.4004 19.2002L25.6004 19.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.7998 14.3999L25.5998 14.3999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="p"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 3.2001C1.59961 2.31644 2.31595 1.6001 3.19961 1.6001H28.7996C29.6833 1.6001 30.3996 2.31644 30.3996 3.2001V28.8001C30.3996 29.6838 29.6833 30.4001 28.7996 30.4001H3.19961C2.31595 30.4001 1.59961 29.6838 1.59961 28.8001V3.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14.4 11.2C14.4 12.9673 12.9673 14.4 11.2 14.4C9.43269 14.4 8 12.9673 8 11.2C8 9.43269 9.43269 8 11.2 8C12.9673 8 14.4 9.43269 14.4 11.2Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14.4004 30.3999C14.4004 21.5633 21.5638 14.3999 30.4004 14.3999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="d"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.12859 2.86485C6.28667 2.12714 6.93861 1.6001 7.69307 1.6001H24.3061C25.0606 1.6001 25.7125 2.12714 25.8706 2.86485L30.3996 24.0001V28.8001C30.3996 29.6838 29.6833 30.4001 28.7996 30.4001H3.19961C2.31595 30.4001 1.59961 29.6838 1.59961 28.8001V24.0001L6.12859 2.86485Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 24H30.3996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.2002 12.7998L16.0002 17.5998L20.8002 12.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 17.6L16 8"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="b3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M25.5998 1.6001H6.3998C5.51615 1.6001 4.7998 2.31644 4.7998 3.2001V19.2001C4.7998 20.0838 5.51615 20.8001 6.39981 20.8001H25.5998C26.4835 20.8001 27.1998 20.0838 27.1998 19.2001V3.2001C27.1998 2.31644 26.4835 1.6001 25.5998 1.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.7998 14.3999H27.1998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 30.3998C18.2091 30.3998 20 28.6089 20 26.3998L19.3993 20.7998H12.6615L12 26.3998C12 28.6089 13.7909 30.3998 16 30.3998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.2002 1.6001V8.0001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.5564 28.9136C4.80608 30.1633 6.8322 30.1633 8.08188 28.9136L12.6074 24.3882C13.2322 23.7633 13.2322 22.7503 12.6074 22.1254L10.3446 19.8627C9.71979 19.2378 8.70672 19.2378 8.08188 19.8627L3.5564 24.3882C2.30672 25.6378 2.30672 27.664 3.5564 28.9136Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.4746 20.9937L27.4746 4.99365"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.3438 10.3438L21.6575 21.6575"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.3445 3.55579C12.219 5.43031 12.219 8.4695 10.3445 10.344C8.46999 12.2185 5.43079 12.2185 3.55628 10.344C1.68176 8.4695 1.68176 5.43031 3.55628 3.55579C5.43079 1.68127 8.46999 1.68127 10.3445 3.55579Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M28.4441 21.6559C30.3186 23.5304 30.3186 26.5696 28.4441 28.4441C26.5696 30.3186 23.5304 30.3186 21.6559 28.4441C19.7814 26.5696 19.7814 23.5304 21.6559 21.6559C23.5304 19.7814 26.5696 19.7814 28.4441 21.6559Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.55664 3.55469L5.81938 5.81743"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.1816 26.1812L28.4444 28.4439"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 19.1998C1.59961 23.6181 5.18133 27.1998 9.59961 27.1998H23.1996C27.1761 27.1998 30.3996 23.9763 30.3996 19.9998C30.3996 16.8364 28.3595 14.1495 25.5232 13.183C24.9253 8.45556 20.8894 4.7998 15.9996 4.7998C11.6313 4.7998 7.94444 7.71744 6.78145 11.7103C3.75366 12.8502 1.59961 15.7734 1.59961 19.1998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c4"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 31.9998L30.3996 20.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.3996 31.9998L1.59961 20.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.375 15.3057C8.375 21.627 12.9379 24.9704 15.69 26.4003C24.0753 20.4918 24.1937 12.6719 23.2048 9.50045C21.5019 13.1384 17.6576 15.6175 15.9482 16.4023C20.0506 10.855 17.034 3.64142 15.0129 0.728027C15.69 6.43655 8.375 7.79112 8.375 15.3057Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="m"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 13.6563C1.59961 13.1213 1.86697 12.6217 2.31209 12.325L15.1121 3.79167C15.6495 3.43338 16.3497 3.43338 16.8871 3.79167L29.6871 12.325C30.1322 12.6217 30.3996 13.1213 30.3996 13.6563V28.8C30.3996 29.6836 29.6833 30.4 28.7996 30.4H3.19961C2.31595 30.4 1.59961 29.6836 1.59961 28.8V13.6563Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M2.40039 13.6001L15.1312 21.8377C15.6601 22.1799 16.3407 22.1799 16.8696 21.8377L29.6004 13.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="n"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.0004 26.3998C9.60039 17.8722 6.40039 14.8647 6.40039 9.75981C6.40039 4.81133 10.6985 0.799805 16.0004 0.799805C21.3023 0.799805 25.6004 4.81133 25.6004 9.75981C25.6004 14.8712 22.4004 17.8197 16.0004 26.3998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24.199 23.2002C26.0609 24.0499 27.1998 25.1894 27.1998 26.4419C27.1998 29.0701 22.1854 31.2006 15.9998 31.2006C9.81422 31.2006 4.7998 29.0701 4.7998 26.4419C4.7998 25.1894 5.93874 24.0499 7.80059 23.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.1998 10.4002C19.1998 12.1675 17.7671 13.6002 15.9998 13.6002C14.2325 13.6002 12.7998 12.1675 12.7998 10.4002C12.7998 8.63288 14.2325 7.2002 15.9998 7.2002C17.7671 7.2002 19.1998 8.63288 19.1998 10.4002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="f2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 6.39981C1.59961 5.51615 2.31595 4.7998 3.19961 4.7998H8.93687C9.36121 4.7998 9.76818 4.96838 10.0682 5.26843L12.331 7.53118C12.631 7.83123 13.038 7.9998 13.4624 7.9998H28.7996C29.6833 7.9998 30.3996 8.71615 30.3996 9.5998V25.5998C30.3996 26.4835 29.6833 27.1998 28.7996 27.1998H3.19961C2.31595 27.1998 1.59961 26.4835 1.59961 25.5998V6.39981Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="i"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.4002 1.6001H4.8002C3.91654 1.6001 3.2002 2.31644 3.2002 3.2001V28.8001C3.2002 29.6838 3.91654 30.4001 4.8002 30.4001H24.0002V3.2001C24.0002 2.31644 23.2839 1.6001 22.4002 1.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24 30.4V16H27.2C28.0837 16 28.8 16.7163 28.8 17.6V28.8C28.8 29.6837 28.0837 30.4 27.2 30.4H24Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 25.6001H19.2"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 20.7998H19.2"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 16H19.2"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="d2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.9526 22.4002H19.0478M4.8002 22.4002H27.2002C28.0839 22.4002 28.8002 21.6839 28.8002 20.8002V4.8002C28.8002 3.91654 28.0839 3.2002 27.2002 3.2002H4.8002C3.91654 3.2002 3.2002 3.91654 3.2002 4.80019V20.8002C3.2002 21.6838 3.91654 22.4002 4.8002 22.4002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.2002 17.6001H28.8002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.8 22.3999H19.2L24 28.7999H8L12.8 22.3999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="p2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M28.7996 9.6001H3.19961C2.31595 9.6001 1.59961 10.3164 1.59961 11.2001V25.6001C1.59961 26.4838 2.31595 27.2001 3.19961 27.2001H7.99961V25.6001C7.99961 24.7164 8.71595 24.0001 9.59961 24.0001H22.3996C23.2833 24.0001 23.9996 24.7164 23.9996 25.6001V27.2001H28.7996C29.6833 27.2001 30.3996 26.4838 30.3996 25.6001V11.2001C30.3996 10.3164 29.6833 9.6001 28.7996 9.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M25.6 15.1999C25.6 15.6417 25.2418 15.9999 24.8 15.9999C24.3582 15.9999 24 15.6417 24 15.1999C24 14.7581 24.3582 14.3999 24.8 14.3999C25.2418 14.3999 25.6 14.7581 25.6 15.1999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 25.6V28.8C8 29.6837 8.71634 30.4 9.6 30.4H22.4C23.2837 30.4 24 29.6837 24 28.8V25.6C24 24.7163 23.2837 24 22.4 24H9.6C8.71634 24 8 24.7163 8 25.6Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 9.6001H24V3.2001C24 2.31644 23.2837 1.6001 22.4 1.6001H9.6C8.71634 1.6001 8 2.31644 8 3.2001V9.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c5"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3996 16.0001C30.3996 23.953 23.9525 30.4001 15.9996 30.4001C8.04671 30.4001 1.59961 23.953 1.59961 16.0001C1.59961 8.0472 8.04671 1.6001 15.9996 1.6001C23.9525 1.6001 30.3996 8.0472 30.3996 16.0001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M10.4004 15.9998L13.4404 20.7998L22.4004 12.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c6"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3996 16.0001C30.3996 23.953 23.9525 30.4001 15.9996 30.4001C8.04671 30.4001 1.59961 23.953 1.59961 16.0001C1.59961 8.0472 8.04671 1.6001 15.9996 1.6001C23.9525 1.6001 30.3996 8.0472 30.3996 16.0001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4 16.0001L16 16.0001V1.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="m2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M27.2002 9.6001C26.4002 3.2001 23.6185 1.6001 19.2002 1.6001H4.8002C3.91654 1.6001 3.2002 2.31644 3.2002 3.2001V9.6001C3.2002 10.4838 3.91654 11.2001 4.8002 11.2001H14.847C15.5357 11.2001 16.1471 11.6408 16.3649 12.2941L22.0355 29.3061C22.2533 29.9594 22.8647 30.4001 23.5534 30.4001H27.0724C28.0044 30.4001 28.7392 29.6067 28.6677 28.6774L27.2002 9.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.5998 17.6001L12.7998 17.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.59961 11.2001V1.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c7"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.3997 17.6001L30.3997 30.4001H23.9998L19.3652 22.4553L22.3997 17.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.7996 11.2002L23.9996 30.4002H1.59961L12.7996 11.2002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23.9998 9.6C23.9998 10.4837 23.2835 11.2 22.3998 11.2C21.5161 11.2 20.7998 10.4837 20.7998 9.6C20.7998 8.71634 21.5161 8 22.3998 8C23.2835 8 23.9998 8.71634 23.9998 9.6Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22.4004 1.6001V3.2001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M29.328 13.5998L27.9424 12.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16.8563 6.4001L15.4707 5.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M29.328 5.6001L27.9424 6.4001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="p3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.46666 30.3999H25.5272C26.439 30.3999 27.1787 29.6344 27.0206 28.7364C26.3578 24.972 24.0263 22.3365 20.4329 21.1417C19.7233 20.9058 19.2005 20.2689 19.2005 19.5211V14.3999H12.8009V19.4941C12.8009 20.2541 12.2613 20.8972 11.5375 21.1292C7.95185 22.2791 5.62221 24.9893 4.97373 28.7431C4.81897 29.6389 5.5576 30.3999 6.46666 30.3999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 8.0001H25.6C26.4837 8.0001 27.2 7.28375 27.2 6.4001V3.2001C27.2 2.31644 26.4837 1.6001 25.6 1.6001H17.6C16.7163 1.6001 16 2.31644 16 3.2001V8.0001ZM16 8.0001V14.4001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 14.3999H11.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="f3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.8002 30.4001H27.1975C28.0822 30.4001 28.799 29.6821 28.7975 28.7974L28.7627 8.0001L22.3627 1.6001H4.8002C3.91654 1.6001 3.2002 2.31644 3.2002 3.2001V28.8001C3.2002 29.6838 3.91654 30.4001 4.8002 30.4001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M28.7623 8.0001L22.3623 1.6001V8.0001H28.7623Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 19.2002H11.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 14.3999V23.9999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="m3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 3.2001C1.59961 2.31644 2.31595 1.6001 3.19961 1.6001H28.7996C29.6833 1.6001 30.3996 2.31644 30.3996 3.2001V28.8001C30.3996 29.6838 29.6833 30.4001 28.7996 30.4001H3.19961C2.31595 30.4001 1.59961 29.6838 1.59961 28.8001V3.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 22.3999H8.61076C9.21679 22.3999 9.77081 22.7423 10.0418 23.2844L10.7574 24.7154C11.0284 25.2575 11.5824 25.5999 12.1885 25.5999H19.8108C20.4168 25.5999 20.9708 25.2575 21.2418 24.7154L21.9574 23.2844C22.2284 22.7423 22.7824 22.3999 23.3885 22.3999H30.3996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 14.3999L16.0002 19.1999L11.2002 14.3999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 6.3999L16 19.1999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="t"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.3598 2.81153L19.366 9.96346C19.2205 11.0112 19.9159 11.9911 20.953 12.1995L27.3043 13.4757L11.5806 29.164L12.6407 21.9347C12.7957 20.878 12.0931 19.886 11.0448 19.6816L4.7045 18.4449L20.3598 2.81153Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="c8"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 3.2001C1.59961 2.31644 2.31595 1.6001 3.19961 1.6001H28.7996C29.6833 1.6001 30.3996 2.31644 30.3996 3.2001V28.8001C30.3996 29.6838 29.6833 30.4001 28.7996 30.4001H3.19961C2.31595 30.4001 1.59961 29.6838 1.59961 28.8001V3.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 8H30.3996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.2002 14.3999H22.4002V23.9999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.59961 14.3999H12.7996V23.9999"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="e3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.8002 22.4001L16.3814 9.6001H15.5814L11.2002 22.4001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.4184 18.3999H12.5684"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.7998 7.9998V23.9998M7.9998 4.7998H23.9998M27.1998 7.9998V23.9998M23.9998 27.1998H7.9998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.99961 4.8001C7.99961 6.56741 6.56692 8.0001 4.79961 8.0001C3.0323 8.0001 1.59961 6.56741 1.59961 4.8001C1.59961 3.03279 3.0323 1.6001 4.79961 1.6001C6.56692 1.6001 7.99961 3.03279 7.99961 4.8001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.99961 27.2C7.99961 28.9673 6.56692 30.4 4.79961 30.4C3.0323 30.4 1.59961 28.9673 1.59961 27.2C1.59961 25.4327 3.0323 24 4.79961 24C6.56692 24 7.99961 25.4327 7.99961 27.2Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4 4.8001C30.4 6.56741 28.9673 8.0001 27.2 8.0001C25.4327 8.0001 24 6.56741 24 4.8001C24 3.03279 25.4327 1.6001 27.2 1.6001C28.9673 1.6001 30.4 3.03279 30.4 4.8001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.4 27.2C30.4 28.9673 28.9673 30.4 27.2 30.4C25.4327 30.4 24 28.9673 24 27.2C24 25.4327 25.4327 24 27.2 24C28.9673 24 30.4 25.4327 30.4 27.2Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="h3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.3125 6.64893C6.92746 2.51755 12.0992 3.70718 15.7331 6.88683C19.367 3.70718 24.5388 2.51755 28.1537 6.64893C31.0632 9.97403 30.7262 15.0281 27.4012 17.9376L15.7331 28.1471L4.06508 17.9376C0.739988 15.0281 0.403048 9.97403 3.3125 6.64893Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="g"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.7998 20.7998H19.1998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 19.2002L3.05553 4.64099C3.13732 3.82307 3.82559 3.2002 4.64759 3.2002H6.39961"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.3996 19.2002L28.9437 4.64099C28.8619 3.82307 28.1736 3.2002 27.3516 3.2002H25.5996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 19.2001C1.59961 18.3164 2.31595 17.6001 3.19961 17.6001H11.1996C12.0833 17.6001 12.7996 18.3164 12.7996 19.2001V25.6001C12.7996 26.4838 12.0833 27.2001 11.1996 27.2001H3.19961C2.31595 27.2001 1.59961 26.4838 1.59961 25.6001V19.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.1816 19.2C19.1817 18.3164 19.898 17.6001 20.7816 17.6001H28.7818C29.6654 17.6001 30.3818 18.3164 30.3818 19.2001V25.6001C30.3818 26.4838 29.6654 27.2001 28.7818 27.2001H20.7817C19.8981 27.2001 19.1818 26.4838 19.1817 25.6002L19.1816 19.2Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="f4"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 3.2001C1.59961 2.31644 2.31595 1.6001 3.19961 1.6001H28.7996C29.6833 1.6001 30.3996 2.31644 30.3996 3.2001V28.8001C30.3996 29.6838 29.6833 30.4001 28.7996 30.4001H3.19961C2.31595 30.4001 1.59961 29.6838 1.59961 28.8001V3.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23.9996 7.9999H20.7996V6.3999H17.5996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23.9996 12.8002H20.7996V11.2002H17.5996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M23.9996 17.6H20.7996V16H17.5996"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.7998 1.6001V22.4001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.5996 23.9999L20.7996 25.5999L23.9996 23.9999V22.3999H17.5996V23.9999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="n2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.59961 3.69937C1.59961 2.643 2.6052 1.87657 3.62377 2.15661L11.1999 4.23955L20.7996 1.6001L29.3056 4.43542C29.9589 4.6532 30.3996 5.26462 30.3996 5.95331V26.9114C30.3996 27.9001 29.5118 28.6521 28.5366 28.4896L20.7996 27.2001L11.1999 29.8396L2.81156 27.7425C2.09929 27.5645 1.59961 26.9245 1.59961 26.1903V3.69937Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.2002 29.8396V4.23955M20.8 27.2001V1.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="m4"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 7.9999C1.59961 7.11625 2.31595 6.3999 3.19961 6.3999H23.9996C24.8833 6.3999 25.5996 7.11625 25.5996 7.9999V28.7999C25.5996 29.6836 24.8833 30.3999 23.9996 30.3999H3.19961C2.31595 30.3999 1.59961 29.6836 1.59961 28.7999V7.9999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.7998 1.6001H28.7998C29.6835 1.6001 30.3998 2.31644 30.3998 3.2001V27.2001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.2002 20.8001V13.1518C19.2002 12.1421 18.2765 11.3849 17.2864 11.5829L12.4864 12.5429C11.7385 12.6925 11.2002 13.3491 11.2002 14.1118V24.0001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M11.2 23.9999C11.2 24.8836 10.4837 25.5999 9.6 25.5999C8.71634 25.5999 8 24.8836 8 23.9999C8 23.1162 8.71634 22.3999 9.6 22.3999C10.4837 22.3999 11.2 23.1162 11.2 23.9999Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.2 20.8002C19.2 21.6839 18.4837 22.4002 17.6 22.4002C16.7163 22.4002 16 21.6839 16 20.8002C16 19.9165 16.7163 19.2002 17.6 19.2002C18.4837 19.2002 19.2 19.9165 19.2 20.8002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="v"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.59961 12.7998V19.1998C1.59961 20.0835 2.31595 20.7998 3.19961 20.7998H6.39961L15.9996 27.1998V4.7998L6.39961 11.1998H3.19961C2.31595 11.1998 1.59961 11.9161 1.59961 12.7998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5.7334 11.2007V20.8007"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.1504 6.3999C31.7388 11.9542 31.7388 21.2728 26.1504 26.8271"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21.6625 10.9639C24.7386 14.0468 24.7358 19.1918 21.6562 22.2713"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="l2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.7209 8.10676C15.3609 7.25345 16.6409 7.25348 17.2809 8.10683L25.6004 19.2001H6.40039L14.7209 8.10676Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 6.4001V1.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 30.4002V27.2002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.6 25.6001L8 27.2001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M24.0004 27.2001L22.4004 25.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M17.6004 20.8002C17.6004 21.6839 16.884 22.4002 16.0004 22.4002C15.1167 22.4002 14.4004 21.6839 14.4004 20.8002C14.4004 19.9165 15.1167 19.2002 16.0004 19.2002C16.884 19.2002 17.6004 19.9165 17.6004 20.8002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.59961 28.8C9.59961 29.6837 10.316 30.4 11.1996 30.4H20.7996C21.6833 30.4 22.3996 29.6837 22.3996 28.8V22.4C22.3996 18.8654 19.5342 16 15.9996 16C12.465 16 9.59961 18.8654 9.59961 22.4V28.8Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.59961 3.2001C9.59961 2.31644 10.316 1.6001 11.1996 1.6001H20.7996C21.6833 1.6001 22.3996 2.31644 22.3996 3.2001V9.6001C22.3996 13.1347 19.5342 16.0001 15.9996 16.0001C12.465 16.0001 9.59961 13.1347 9.59961 9.6001V3.2001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="t2"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3996 4.7998H1.59961"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8004 4.8001V3.2001C20.8004 2.31644 20.084 1.6001 19.2004 1.6001H12.8002C11.9165 1.6001 11.2002 2.31644 11.2002 3.2001V4.8001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M25.6936 28.8996L27.1998 4.7998H4.7998L6.30604 28.8996C6.35875 29.7429 7.05803 30.3998 7.90293 30.3998H24.0967C24.9416 30.3998 25.6409 29.7429 25.6936 28.8996Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.7998 9.6001V25.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.2002 9.6001V25.6001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M30.3996 16.0001L1.59961 30.4001L7.35961 16.0001L1.59961 1.6001L30.3996 16.0001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.35938 16L15.9994 16"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s4"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9997 4.85442C17.8955 4.85442 19.4596 3.43449 19.6866 1.60014C21.0704 1.95338 22.3765 2.50082 23.5741 3.21173C22.4385 4.66928 22.5407 6.7786 23.8809 8.11878C25.2211 9.45896 27.3304 9.56122 28.788 8.42556C29.4989 9.62326 30.0464 10.9294 30.3996 12.3132C28.5653 12.5402 27.1454 14.1043 27.1454 16.0001C27.1454 17.8959 28.5653 19.46 30.3996 19.687C30.0464 21.0708 29.4989 22.3769 28.788 23.5747C27.3304 22.4392 25.2212 22.5415 23.8811 23.8816C22.541 25.2217 22.4387 27.3309 23.5742 28.7884C22.3765 29.4994 21.0704 30.0468 19.6867 30.4C19.4597 28.5657 17.8955 27.1457 15.9997 27.1457C14.1039 27.1457 12.5398 28.5657 12.3128 30.4001C10.929 30.0469 9.62283 29.4994 8.4251 28.7885C9.56092 27.3309 9.45871 25.2214 8.11847 23.8812C6.77823 22.541 4.66879 22.4388 3.21122 23.5746C2.50033 22.3769 1.95289 21.0708 1.59965 19.6871C3.43401 19.4601 4.85393 17.896 4.85393 16.0002C4.85393 14.1044 3.43398 12.5402 1.59961 12.3133C1.95285 10.9294 2.5003 9.62331 3.21124 8.4256C4.6688 9.56155 6.77836 9.45938 8.11865 8.11909C9.45893 6.77881 9.5611 4.66926 8.42516 3.2117C9.62287 2.50078 10.929 1.95333 12.3128 1.6001C12.5398 3.43447 14.1039 4.85442 15.9997 4.85442Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M27.1998 15.9998C27.1998 22.1854 22.1854 27.1998 15.9998 27.1998C9.81422 27.1998 4.7998 22.1854 4.7998 15.9998C4.7998 9.81422 9.81422 4.7998 15.9998 4.7998C22.1854 4.7998 27.1998 9.81422 27.1998 15.9998Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 16.0002C20.8002 18.6512 18.6512 20.8002 16.0002 20.8002C13.3492 20.8002 11.2002 18.6512 11.2002 16.0002C11.2002 13.3492 13.3492 11.2002 16.0002 11.2002C18.6512 11.2002 20.8002 13.3492 20.8002 16.0002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s5"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.9996 1.6001L20.2979 5.62308L26.1819 5.81776L26.3766 11.7018L30.3996 16.0001L26.3766 20.2984L26.1819 26.1824L20.2979 26.3771L15.9996 30.4001L11.7013 26.3771L5.81727 26.1824L5.62259 20.2984L1.59961 16.0001L5.62259 11.7018L5.81727 5.81776L11.7013 5.62308L15.9996 1.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.8002 16.0002C20.8002 18.6512 18.6512 20.8002 16.0002 20.8002C13.3492 20.8002 11.2002 18.6512 11.2002 16.0002C11.2002 13.3492 13.3492 11.2002 16.0002 11.2002C18.6512 11.2002 20.8002 13.3492 20.8002 16.0002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s6"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.33301 4.2665C1.33301 3.38285 2.04935 2.6665 2.93301 2.6665H28.533C29.4167 2.6665 30.133 3.38285 30.133 4.2665V27.4665C30.133 28.3502 29.4167 29.0665 28.533 29.0665H20.0537C19.3809 29.0665 18.7799 28.6456 18.55 28.0133L15.733 20.2665L12.916 28.0133C12.6861 28.6456 12.0851 29.0665 11.4123 29.0665H2.93301C2.04935 29.0665 1.33301 28.3502 1.33301 27.4665V4.2665Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.33301 9.86719H30.133"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s7"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.0414 2.77882C10.6167 2.1624 11.5716 2.09826 12.2242 2.6322L19.5054 8.58953C19.7397 8.78124 19.9148 9.0355 20.0104 9.32278L23.6129 20.1514C24.0323 21.4119 24.9554 22.4423 26.1625 22.9973L28.4008 24.0264C29.5364 24.5485 30.2641 25.6839 30.2641 26.9338C30.2641 28.7931 29.0761 30.483 27.0641 30.483H17.9896C17.1409 30.483 16.327 30.1459 15.7268 29.5458L3.1432 16.9621C1.31421 15.1331 1.26337 12.1838 3.02824 10.2929L10.0414 2.77882Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21.1439 12.7705L13.5996 13.6004"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.9629 19.5685L23.1237 18.7549"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s8"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M28.8002 18.5344C28.8002 25.6036 23.0694 31.3344 16.0002 31.3344C8.93095 31.3344 3.2002 25.6036 3.2002 18.5344C3.2002 11.4651 8.93095 5.73438 16.0002 5.73438C23.0694 5.73438 28.8002 11.4651 28.8002 18.5344Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 12.1328V18.5328H22.4"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M27.2002 4.95557C28.4144 5.95831 29.4918 7.12077 30.4002 8.41079"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.1998 0.932129H12.7998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 5.73213V0.932129"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s9"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22.3996 16.0001C22.3996 19.5347 19.5342 22.4001 15.9996 22.4001C12.465 22.4001 9.59961 19.5347 9.59961 16.0001C9.59961 12.4655 12.465 9.6001 15.9996 9.6001C19.5342 9.6001 22.3996 12.4655 22.3996 16.0001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M15.9996 4.8001V1.6001M15.9996 30.4001V27.2001M27.1996 16.0001H30.3996M1.59961 16.0001H4.79961M23.9192 8.08033L26.1819 5.81759M5.81727 26.1823L8.08001 23.9195M23.9192 23.9195L26.1819 26.1823M5.81727 5.81759L8.08001 8.08033"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="s10"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M27.0443 24.0002H4.95403C3.81367 17.3417 9.27832 11.2002 15.9992 11.2002C22.72 11.2002 28.1847 17.3417 27.0443 24.0002Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M30.3996 24H1.59961"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.2002 30.3999H28.8002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 1.6001V4.8001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5.59961 4.3877L7.19961 7.15898"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.3998 4.3877L24.7998 7.15898"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="t3"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24.667 16.3335C24.1147 16.3335 23.667 16.7812 23.667 17.3335C23.667 17.8858 24.1147 18.3335 24.667 18.3335V16.3335ZM24.667 18.3335H30.3337V16.3335H24.667V18.3335Z"
                            fill="#1E3050"
                        />
                        <path
                            d="M24.667 23C24.1147 23 23.667 23.4477 23.667 24C23.667 24.5523 24.1147 25 24.667 25L24.667 23ZM24.667 25L30.667 25L30.667 23L24.667 23L24.667 25Z"
                            fill="#1E3050"
                        />
                        <path
                            d="M8 12L8 26.6667"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.60059 13.6975V24.9403C1.60059 25.8199 2.31061 26.5345 3.19019 26.5402L7.58125 26.5688C7.85617 26.5706 8.12598 26.6432 8.36468 26.7795L13.2317 29.5607C13.4729 29.6986 13.746 29.7712 14.0238 29.7715H14.0256L28.8057 29.7412C29.6881 29.7394 30.4006 29.0236 30.4006 28.1412V12.1431C30.4006 11.2574 29.6811 10.5402 28.7954 10.5431L21.9347 10.5653C20.9308 10.5685 20.172 9.6572 20.3569 8.6705L20.7333 6.66259C20.9887 4.91383 21.6006 2.52997 19.2006 1.72994C16.0006 0.930002 14.6558 3.98912 14.4005 5.73789C14.169 6.66879 14.0879 7.85637 13.6133 8.70091C11.5416 12.3873 7.04455 12.1778 3.16781 12.1298C2.29697 12.119 1.60059 12.8266 1.60059 13.6975Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <svg
                        className="b4"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M16 9.6001C11.5817 9.6001 8 13.1818 8 17.6001C8 20.8806 9.97455 23.6999 12.8 24.9344V28.8001C12.8 29.6838 13.5163 30.4001 14.4 30.4001H17.6C18.4837 30.4001 19.2 29.6838 19.2 28.8001V24.9344C22.0254 23.6999 24 20.8806 24 17.6001C24 13.1818 20.4183 9.6001 16 9.6001Z"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.7998 24.9346H19.1998"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M1.59961 16H4.79961"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M4.7002 4.69922L8.08205 8.08107"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 1.6001V4.8001"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M27.3229 4.67822L23.9316 8.06944"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M27.2002 16H30.4002"
                            stroke="#1E3050"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};