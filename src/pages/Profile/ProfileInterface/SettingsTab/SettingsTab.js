import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Checkbox from '../../../../ui/Checkbox/Checkbox'
import Textarea from '../../../../ui/Textarea/Textarea'
import { ResponsiveModal } from "../../../../components/ResponsiveModal";
import { ForgotPassword } from "../../../../components/AUTH";

import './styles.scss'

const SettingsTab = ({ email }) => {
  const navigate = useNavigate();
  const [isSetupNewPassword, setSetupNewPassword] = useState(false);
  const [isVerifyMailOpen, setVerifyMailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div style={{width:"100%"}}>
      <span className='profile-interface__table_header'>
        Emailers
      </span>

      <div className='profile-interface__table_row'>
        <span>
          Your account get renew
        </span>

        <Checkbox />
      </div>

      <div className='profile-interface__table_row'>
        <span>
          New icons collection are available
        </span>

        <Checkbox />
      </div>
      <span className='profile-interface__table_header'>
        Billing Information
      </span>

      <Textarea
        placeholder='This information shows on your invoices.'
        className='settings-tab__table_textarea'
      />


      <span className='profile-interface__table_header'>
        Security
      </span>

      <div className='profile-interface__table_row'>
        <span>
          Password
        </span>

        <span style={{ cursor: 'pointer' }} onClick={() => setSetupNewPassword(true)}>
          Reset password
        </span>
      </div>
      <ResponsiveModal
        isOpen={isSetupNewPassword}
        onClose={() => {
          setSetupNewPassword(false);
          navigate("/");
        }}
        showCloseIcon={true}
        closeOnOverlayClick={false}
        component={
          <ForgotPassword
            isEmail={email}
            setOpen={setSetupNewPassword}
            setVerifyMailOpen={setVerifyMailOpen}
          />
        }
      />
    </div>
  )
}

export default SettingsTab