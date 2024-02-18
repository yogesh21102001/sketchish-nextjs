import "../style.css";
import { Button } from "../../../ui";

import { EmailSVG } from "../../../assets/svg";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/common/useAuth";

export function VerifyMailSuccess({ setOpen, setIsLoginOpen }) {

  const { setForgotPassword, setVerifyMail } = useAuth();

  const handelResendEmail = async()=>{

    const email = localStorage.getItem("verifyMail")
    const verifyFrom = localStorage.getItem("verifrom")

    if (verifyFrom == "resetPassword"){
      const res = await setForgotPassword({
        userEmail: email,
      });
    }
    
  }

  const handleBackClick = () => {
    setOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      <div className="section-login">
        <div className="login">
          <div className="login-section">
            {/* <ModalSide /> */}
            <div className="form-login">
              <div className="verify-suc-main-c">
                <div className="vs-mail-main">
                  <div className="vs-mail-con">
                    <EmailSVG />
                  </div>
                </div>
                <div>
                  <div className="form-padding margin-bottom"></div>
                </div>
                <div className="vs-title">
                  <h4>Verify your email</h4>
                </div>
                <div className="vs-content">
                  Click on the link we have sent to <br />
                  {localStorage.getItem("verifyMail")}
                </div>
                <div className="vs-content">
                  Didn't receive email?
                  <span style={{ textDecoration: "underline", color:"#3F5AD3", marginLeft:".3rem", cursor:"pointer"}} onClick={() => handelResendEmail()}>
                    Resend Email
                  </span>
                </div>
                <div className="form-padding">
                  <Button
                    className={"margin-top"}
                    onClick={handleBackClick}
                    style={{ textTransform: "capitalize" }}
                    width={"100%"}
                  >Login <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <path d="M8.49999 12.7992L13.3 7.99923L8.49999 3.19922" stroke="#1E3050" stroke-width="2" />
                      <path d="M13.3 8L2.09999 8" stroke="#1E3050" stroke-width="2" />
                    </svg></Button>
                </div>
                <div>
                  {/* <p className="form-footer-text">
                    “Continue with Google/Email/Facebbok” above, you acknowledge
                    that you have read and
                    <br />
                    understood, and agree to OpenStroke® Terms & Conditions and
                    Privacy Policy.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
