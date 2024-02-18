import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import useUser from "../../../hooks/user/user";

import ProfileInterface from '../../Profile/ProfileInterface/ProfileInterface'

import 'react-circular-progressbar/dist/styles.css';
import '../../Profile/styles.scss'
import './profile_view.css'


export const ProfileView = ({ userId }) => {
    const { getAdminCustomerProfile } = useUser();
    const [userDet, setUserDet] = useState({});
    useEffect(() => {
        (async () => {
            const { userDet } = await getAdminCustomerProfile(userId);
            setUserDet(userDet)
        })();
    }, [userId])
    console.log('userDet', userDet)
    //const handelEmailUpdate = async () => setIsUpdateEmailOpen(true);
    return (
        <div className="profile_view" style={{ background: "#f9fcfe", padding: 50 }}>
            <div className='profile'>
                <div className='profile__block profile__container'>
                    <div className='profile__short-info'>
                        <div className='profile__short-info_text'>
                            <div className='profile__short-info_text_row'>
                                <span className='profile__short-info_parameter'>
                                    Name
                                </span>
                                <span className='profile__short-info_value'>
                                    {userDet?.firstName} {userDet?.lastName}
                                </span>
                            </div>

                            <div className='profile__short-info_text_row'>
                                <span className='profile__short-info_parameter'>
                                    Email
                                </span>
                                <div className='profile__short-info_edit-container'>
                                    <span className='profile__short-info_value'>
                                        {userDet?.email}
                                    </span>
                                </div>
                            </div>

                            <div className='profile__short-info_text_row'>
                                <span className='profile__short-info_parameter'>
                                    Title
                                </span>
                                <span className='profile__short-info_value'>
                                    {userDet?.title}
                                </span>
                            </div>

                            <div className='profile__short-info_text_row'>
                                <span className='profile__short-info_parameter'>
                                    Country
                                </span>
                                <span className='profile__short-info_value'>
                                    {userDet?.country}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='profile__status'>
                        <div className='profile__counter'>
                            <CircularProgressbar
                                value={Number(userDet?.userLimit || 0) / Number(userDet?.planLimit || 0) * 100}
                                text={`${userDet?.userLimit || 0}/${userDet?.planLimit || 0}`}
                                styles={{
                                    ...buildStyles({
                                        strokeLinecap: 'butt',
                                        pathColor: '#1E3050',
                                        trailColor: '#F0F3F5',
                                        textSize: '1.5rem',
                                    }),
                                    text: {
                                        fontWeight: '800',
                                        fill: '#1E3050',
                                    }
                                }}
                            />
                        </div>
                        <span className='profile__counter_text'>
                            pro icons remaining
                        </span>

                        <div className='profile__plan'>
                            <div className='profile__plan_block'>
                                <span className='profile__plan_title'>
                                    Current Plan
                                </span>
                                <span className='profile__plan_text'>
                                    {userDet?.planName} - Monthly
                                </span>
                            </div>

                            <div className='profile__plan_block'>
                                <span className='profile__plan_title'>
                                    Expiry
                                </span>
                                <span className='profile__plan_text'>
                                    {userDet?.planExpiry ? new Date(userDet?.planExpiry).toLocaleDateString() : '--'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfileInterface admin userInvoices={userDet?.invoices || []} email={userDet?.email} userHis={userDet?.history || []} />
            </div>
        </div>
    )
}

export default ProfileView;