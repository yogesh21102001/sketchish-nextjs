import { Formik, Form } from "formik";
import * as Yup from "yup";
// import ModalSide from "../../custom/ModalSide";
import { Button } from "../../Buttons/Button";
import useAuth from "../../../hooks/common/useAuth";
import React from "react";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";

// const [isForgotPassword, sttForgotPassword] = useState(false);
// const handelforgotpassword = () => {
//   sttForgotPassword(false);
// };
export function ForgotPassword({ isEmail, setOpen, setIsLoginOpen, setVerifyMailOpen }) {
  const { setForgotPassword } = useAuth();

  const validate = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is require"),
  });

  // const handleBackClick = () => {
  //   setOpen(false);
  //   setIsLoginOpen(true);
  // };

  const handelLogin = () => {
    setOpen(false);
    setIsLoginOpen(true);
  };
  return (
    <>
      {
        <div className="section-login">
          <div className="login">
            <div className="login-section">
              {/* <ModalSide /> */}
              <div className="form-login">
                <div className="verify-suc-main heading-margin">
                  <span className="heading-primary-txt  form-padding">
                    Reset password.
                  </span>
                  <span className="heading-primary-txt-body">
                    Enter your email to get a reset <br /> password link.
                  </span>
                </div>
                <Formik
                  initialValues={{ email: isEmail || '' }}
                  validationSchema={validate}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(false);
                    const res = await setForgotPassword({
                      userEmail: values?.email,
                    });
                    localStorage.setItem("verifyMail", values?.email);
                    localStorage.setItem("verifrom", "resetPassword");
                    if (res) {
                      setOpen(false);
                      setVerifyMailOpen(true);
                    }
                  }}
                >
                  {({ values, isDisabled, outlined = true }) => {
                    return (
                      <Form>
                        <div>
                          <div className="form-padding margin-bottom">
                            <LabledInputBox
                              defaultValue={isEmail}
                              name="email"
                              type="email"
                              placeholder="email"
                              autoComplete="off"
                              disabled={isEmail}
                            />
                          </div>
                        </div>
                        <div className="form-padding">
                          <Button
                            styleName={"advance-btn margin-top"}
                            lable={"Send reset password link"}
                            type={"submit"}
                            btnSize="lg"
                            disabled={isDisabled}
                          />
                        </div>
                        {/* <div className="form-padding">
                          <Button
                            styleName={"margin-top"}
                            lable={"Back to login"}
                            btnSize="full"
                            outlined={outlined}
                            onClick={handleBackClick}
                          />
                        </div> */}
                      </Form>
                    );
                  }}
                </Formik>{" "}
                {setIsLoginOpen && <p className="account-text-primary margin-t-20">
                  Already have an account? &nbsp;
                  <u className="account-text-primary" onClick={handelLogin}>
                    Login
                  </u>
                </p>}
                {!setIsLoginOpen && <p></p>}
                {!setIsLoginOpen && <p></p>}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
