import React, { useState } from "react";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import {
  ForgotPassword,
  SetupNewPassword,
  SetupProfile,
  VerifyMail,
  VerifyMailSuccess,
} from "../../components/AUTH";

import { Signup } from "../../components/AUTH-v2";
import { Login } from "../../components/Auth-v3/Login/Login";
import { CongPopUp, SetNewPassword } from "../../components/Auth-v3";

export default function Modal() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isVerifyMailOpen, setVerifyMailOpen] = useState(false);
  const [isSetupNewPassword, setSetupNewPassword] = useState(false);
  const [isSetupProfile, setSetupProfile] = useState(false);
  const [isForgotPassword, setForgotPassword] = useState(false);

  const [getExistingEmail, setExistingEmail] = useState("");
  const [resetHash, setResetHash] = useState("");
  const [passResetType, setPassResetType] = useState("CREATE_NEW_ACCT");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  return {
    ModalMain: () => {
      return (
        <>
          <ResponsiveModal
            isOpen={isLoginOpen}
            onClose={() => {
              sessionStorage.removeItem("accountInfo");
              sessionStorage.removeItem("loaded");
              setIsLoginOpen(false);
            }}
            closeOnOverlayClick={false}
            component={
              <Login
                setOpen={setIsLoginOpen}
                ForgotPassword={setForgotPassword}
                userEmail={getExistingEmail}
                CreateAccount={setIsVerifyOpen}
                setIsSignUpSuccess={setIsSignUpSuccess}
              />
            }
          />

          <ResponsiveModal
            isOpen={isSignUpSuccess}
            onClose={() => {
              sessionStorage.removeItem("accountInfo");
              sessionStorage.removeItem("loaded");
              setIsSignUpSuccess(false);
            }}
            closeOnOverlayClick={false}
            component={
              <CongPopUp
                setOpen={setIsSignUpSuccess}
              />
            }
          />

          <ResponsiveModal
            isOpen={isForgotPassword}
            onClose={() => setForgotPassword(false)}
            closeOnOverlayClick={false}
            component={
              <ForgotPassword
                setOpen={setForgotPassword}
                setVerifyMailOpen={setVerifyMailOpen}
                setIsLoginOpen={setIsLoginOpen}
              />
            }
          />

          <ResponsiveModal
            isOpen={isSetupNewPassword}
            onClose={() => {
              setSetupNewPassword(true);
            }}
            showCloseIcon={false}
            component={
              <SetNewPassword
                hash={resetHash}
                setOpen={setSetupNewPassword}
                type={passResetType}
              />
            }
          />
        </>
      );
    },
    setIsLoginOpen,
    setIsVerifyOpen,
    setVerifyMailOpen,
    setSetupNewPassword,
    setSetupProfile,
    setForgotPassword,
    setPassResetType,
    setResetHash,
  };
}
