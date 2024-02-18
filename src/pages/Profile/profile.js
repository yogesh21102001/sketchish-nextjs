import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { UpdateEmail } from "../../components/updateEmail/updateEmail";
import UpdateProfile from "./EditProfile"
import useUser from "../../hooks/user/user";
import AuthContext from "../../context/AuthProvider";
import { isAuthenticated } from "../../utils/helpers";
import ProfileInterface from './ProfileInterface/ProfileInterface'
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import pencil from './pictures/pencil.svg'
import rocket from './pictures/rocket.svg'

import 'react-circular-progressbar/dist/styles.css';
import './styles.scss'

import { notifyError, notifySuccess } from "../../utils/notify";
import useProduct from "../../hooks/product/useProduct";
import Footer from '../../components/Footer-v2/Footer';
import NavBar from '../../components/NavBar/NavBar';


export const Profile = () => {
  const { auth } = useContext(AuthContext);
  const { userLimit } = auth;
  // modal states
  const [isUpdateEmailOpen, setIsUpdateEmailOpen] = useState(false);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [getDisabled, setIsDisabled] = useState(true);

  const { getDownloadProduct } =
    useProduct();
  const navigate = useNavigate();
  const { useGetProfile, UseDownloadHistory, useGetInvoice } = useUser();
  const { invoice } = useGetInvoice();
  console.log(invoice);
  const { userDet, mutate } = useGetProfile();
  const handelEdit = () => {
    setIsDisabled(!getDisabled);
  };
  const [userHis, setUserHis] = useState([])
  const getUserHistory = async () => {
    try {
      const data = await UseDownloadHistory();
      setUserHis(data)
      console.log(data);
    } catch (err) { }
  }

  const handleDownload = async ({ id, isCopy, label, isFileType, styleset }) => {
    const setPreferences = {
      id,
      name: label,
      type: isFileType,
      size: 48,
      isCopy,
      searchKeyword: null,
      strokeWidth: styleset.toLowerCase() == "slim"
        ? 1.0
        : styleset.toLowerCase() == "light"
          ? 1.5
          : 2.0,
      bgColor: "notset",
      brokeStroke: false,
      oldColors: "rgb(30, 48, 80)",
      // newColors: [],
      animated: false,
    };
    getDownloadProduct(setPreferences);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      getUserHistory()
    }
    if (userDet && userDet.photo){
      localStorage.setItem("profileImg", userDet?.photo);
    }
    if (!isAuthenticated()) {
      navigate("/")
    }
  }, [])

  //const handelEmailUpdate = async () => setIsUpdateEmailOpen(true);
  return (
    <div style={{ background: "#f9fcfe" }}>
      <NavBar />
      <div className='profile'>
        <div className='profile__block profile__container'>
          <div className='profile__greeting'>
            <span>
              HELLO
            </span>
            <span>
              {userDet?.firstName?.toUpperCase()} {userDet?.lastName?.toUpperCase()}
            </span>
          </div>

          <div className='profile__short-info'>
            <div className='profile__avatar_container'>
              <div className='profile__avatar'>
                {[userDet?.firstName?.charAt(0)?.toUpperCase(), userDet?.lastName?.charAt(0)?.toUpperCase()].join('')}
              </div>

              <img className='profile__pencil' alt='pencil' src={pencil} onClick={() => setIsUpdateProfileOpen(true)} />
            </div>

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
                  <img className='profile__pencil' alt='pencil' src={pencil} onClick={() => setIsUpdateEmailOpen(true)} />
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
                value={Number(userLimit?.userLimit || 0) / Number(userLimit?.planLimit || 0) * 100}
                text={`${userLimit?.userLimit}/${userLimit?.planLimit}`}
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
                  {userLimit?.planName} - Monthly
                </span>
              </div>

              <div className='profile__plan_block'>
                <span className='profile__plan_title'>
                  Expiry
                </span>
                <span className='profile__plan_text'>
                  {userLimit?.planExpiry ? new Date(userLimit?.planExpiry).toLocaleDateString() : '--'}
                </span>
              </div>
            </div>

            <div className='profile__upgrade' onClick={() => navigate('/pricing')}>
              <span className='profile__upgrade_text'>
                Upgrade to Advance
              </span>
              <img alt='rocket' src={rocket} />
            </div>
          </div>
        </div>
        <ProfileInterface userInvoices={invoice} email={userDet?.email} userHis={userHis} hendelDownload={handleDownload} />
      </div>
      <ResponsiveModal
        isOpen={isUpdateEmailOpen}
        onClose={() => setIsUpdateEmailOpen(true)}
        showCloseIcon={false}
        component={
          <UpdateEmail setOpen={setIsUpdateEmailOpen} user={userDet} />
        }
      />
      <ResponsiveModal
        isOpen={isUpdateProfileOpen}
        onClose={() => setIsUpdateProfileOpen(true)}
        showCloseIcon={false}
        component={
          <UpdateProfile mutate={mutate} setOpen={setIsUpdateProfileOpen} user={userDet} />
        }
      />
    </div>
  )
}

export default Profile;