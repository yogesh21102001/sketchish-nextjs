import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../state'
import './style.css';
export const AdminSidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isCompact] = useGlobalState('isCompact')

    const isActive = (v) => location.pathname == '/admin/' + v;
    const getActiveColor = (v) => location.pathname == '/admin/' + v ? '#7238FA' : '#1E3050';
    return (
        <div className={isCompact ? "side-menu compact" : "side-menu"}>
            <div className="primary">
                <div className={isActive('dashboard') ? "adminSide-icon-btn active" : "adminSide-icon-btn"}>
                    <svg
                        className="f"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15Z"
                            stroke={getActiveColor()}
                            strokeWidth="2"
                        />
                        <path d="M15 18.75L18.75 10" stroke={getActiveColor('dashboard')} strokeWidth="2" />
                        <path d="M4.38965 18.75H25.6094" stroke={getActiveColor('dashboard')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Dashboard </div>
                </div>
                <div className={isActive('icons') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/icons')}>
                    <svg
                        className="p"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.16089 23.8391L9.69612 23.8387L25.606 7.92884L22.0705 4.39331L6.16064 20.3033L6.16089 23.8391Z"
                            stroke={getActiveColor('icons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M18.5352 7.92969L22.0707 11.4652"
                            stroke={getActiveColor('icons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M11.4632 14.9995L4.39209 7.92848L7.92762 4.39294L14.9987 11.464"
                            stroke={getActiveColor('icons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M14.9995 18.5343L22.0705 25.6055L25.6061 22.0699L18.535 14.9989"
                            stroke={getActiveColor('icons')}
                            strokeWidth="2"
                        />
                    </svg>
                    <div className="icons2">Icons </div>
                </div>
                <div className={isActive('reviewicons') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/reviewicons')}>
                    <svg
                        className="p"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.16089 23.8391L9.69612 23.8387L25.606 7.92884L22.0705 4.39331L6.16064 20.3033L6.16089 23.8391Z"
                            stroke={getActiveColor('reviewicons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M18.5352 7.92969L22.0707 11.4652"
                            stroke={getActiveColor('reviewicons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M11.4632 14.9995L4.39209 7.92848L7.92762 4.39294L14.9987 11.464"
                            stroke={getActiveColor('reviewicons')}
                            strokeWidth="2"
                        />
                        <path
                            d="M14.9995 18.5343L22.0705 25.6055L25.6061 22.0699L18.535 14.9989"
                            stroke={getActiveColor('reviewicons')}
                            strokeWidth="2"
                        />
                    </svg>
                    <div className="icons2">Review Icons </div>
                </div>
                <div className={isActive('customers') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/customers')}>
                    <svg
                        className="user-circle-3"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M26.875 15C26.875 21.5584 21.5584 26.875 15 26.875C8.44162 26.875 3.125 21.5584 3.125 15C3.125 8.44162 8.44162 3.125 15 3.125C21.5584 3.125 26.875 8.44162 26.875 15Z"
                            stroke={getActiveColor('customers')}
                            strokeWidth="2"
                        />
                        <path
                            d="M18.125 10.625C18.125 12.3509 16.7259 13.75 15 13.75C13.2741 13.75 11.875 12.3509 11.875 10.625C11.875 8.89911 13.2741 7.5 15 7.5C16.7259 7.5 18.125 8.89911 18.125 10.625Z"
                            stroke={getActiveColor('customers')}
                            strokeWidth="2"
                        />
                        <path
                            d="M21.5198 20.9375C20.6061 18.213 18.0323 16.25 15.0001 16.25C11.9679 16.25 9.39422 18.213 8.48047 20.9375"
                            stroke={getActiveColor('customers')}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="icons2">Customers </div>
                </div>
                <div className={isActive('report') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/report')}>
                    <svg
                        className="i"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.25 3.75H5V26.25H21.25V3.75Z"
                            stroke={getActiveColor('report')}
                            strokeWidth="2"
                        />
                        <path
                            d="M21.2501 15H25.0001V26.25H20"
                            stroke={getActiveColor('report')}
                            strokeWidth="2"
                        />
                        <path d="M8.75 22.5H17.5" stroke={getActiveColor('report')} strokeWidth="2" />
                        <path d="M8.75 18.75H17.5" stroke={getActiveColor('report')} strokeWidth="2" />
                        <path d="M8.75 15H17.5" stroke={getActiveColor('report')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Reports </div>
                </div>
            </div>
            <div className="secondary">
                <div className={isActive('privacy') ? "adminSide-icon-btn active" : "adminSide-icon-btn"}>
                    <svg
                        className="l"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 26.25H22.5V11.25H7.5V26.25Z"
                            stroke={getActiveColor('privacy')}
                            strokeWidth="2"
                        />
                        <path
                            d="M16.25 17.5C16.25 18.1904 15.6904 18.75 15 18.75C14.3096 18.75 13.75 18.1904 13.75 17.5C13.75 16.8096 14.3096 16.25 15 16.25C15.6904 16.25 16.25 16.8096 16.25 17.5Z"
                            stroke={getActiveColor('privacy')}
                            strokeWidth="2"
                        />
                        <path
                            d="M22.5 11.25V3.75H7.5V11.25"
                            stroke={getActiveColor('privacy')}
                            strokeWidth="2"
                        />
                        <path d="M15 22.5V18.75" stroke={getActiveColor('privacy')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Privacy Policy </div>
                </div>
                <div className={isActive('terms') ? "adminSide-icon-btn active" : "adminSide-icon-btn"}>
                    <svg
                        className="d"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M23.8943 8.75L26.25 11.106L17.3508 20H15V17.612L23.8943 8.75Z"
                            stroke={getActiveColor('terms')}
                            strokeWidth="2"
                        />
                        <path
                            d="M21.25 6.25V3.75H3.75V26.25H21.25V23.75"
                            stroke={getActiveColor('terms')}
                            strokeWidth="2"
                        />
                        <path d="M7.5 12.5H16.25" stroke={getActiveColor('terms')} strokeWidth="2" />
                        <path d="M7.5 16.25H11.25" stroke={getActiveColor('terms')} strokeWidth="2" />
                        <path d="M7.5 20H15" stroke={getActiveColor('terms')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Terms &amp; Conditions </div>
                </div>
            </div>
            <div className="tertiary">
                <div className={isActive('settings') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/settings')}>
                    <svg
                        className="s"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16.25 22.5H26.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M22.5 15H26.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M3.75 15H13.75" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M15 7.5L26.25 7.5" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M3.75 7.5H6.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path
                            d="M12.5 22.5C12.5 23.8807 11.3807 25 10 25C8.61929 25 7.5 23.8807 7.5 22.5C7.5 21.1193 8.61929 20 10 20C11.3807 20 12.5 21.1193 12.5 22.5Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path
                            d="M18.75 15C18.75 16.3807 17.6307 17.5 16.25 17.5C14.8693 17.5 13.75 16.3807 13.75 15C13.75 13.6193 14.8693 12.5 16.25 12.5C17.6307 12.5 18.75 13.6193 18.75 15Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path
                            d="M11.25 7.5C11.25 8.88071 10.1307 10 8.75 10C7.36929 10 6.25 8.88071 6.25 7.5C6.25 6.11929 7.36929 5 8.75 5C10.1307 5 11.25 6.11929 11.25 7.5Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path d="M3.75 22.5H7.5" stroke={getActiveColor('settings')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Settings </div>
                </div>

                <div className={isActive('settings') ? "adminSide-icon-btn active" : "adminSide-icon-btn"} onClick={() => navigate('/admin/blogs')}>
                    <svg
                        className="s"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16.25 22.5H26.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M22.5 15H26.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M3.75 15H13.75" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M15 7.5L26.25 7.5" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path d="M3.75 7.5H6.25" stroke={getActiveColor('settings')} strokeWidth="2" />
                        <path
                            d="M12.5 22.5C12.5 23.8807 11.3807 25 10 25C8.61929 25 7.5 23.8807 7.5 22.5C7.5 21.1193 8.61929 20 10 20C11.3807 20 12.5 21.1193 12.5 22.5Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path
                            d="M18.75 15C18.75 16.3807 17.6307 17.5 16.25 17.5C14.8693 17.5 13.75 16.3807 13.75 15C13.75 13.6193 14.8693 12.5 16.25 12.5C17.6307 12.5 18.75 13.6193 18.75 15Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path
                            d="M11.25 7.5C11.25 8.88071 10.1307 10 8.75 10C7.36929 10 6.25 8.88071 6.25 7.5C6.25 6.11929 7.36929 5 8.75 5C10.1307 5 11.25 6.11929 11.25 7.5Z"
                            stroke={getActiveColor('settings')}
                            strokeWidth="2"
                        />
                        <path d="M3.75 22.5H7.5" stroke={getActiveColor('settings')} strokeWidth="2" />
                    </svg>
                    <div className="icons2">Admin Blog Editor </div>
                </div>

            </div>
        </div>
    );
};

