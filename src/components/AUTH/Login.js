import { Formik, Form } from "formik";
import * as Yup from "yup";

import useAuth from "../../hooks/common/useAuth";
import { Button } from "../Buttons/Button";
import SocialLogin from "../SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LabledInputBox } from "../FormControles/LabledInputBox/LabledInputBox";

export function Login({ setOpen, figmaLoginId, userEmail, ForgotPassword, CreateAccount, setIsLoginAtempted }) {
  const navigate = useNavigate();
  const { setLogin } = useAuth();
  const [isShakeAnim, setShakeAnim] = useState(false);

  const handleClick = () => {
    setOpen(false);
    ForgotPassword(true);
  };

  const handleAccount = () => {
    setOpen(false);
    CreateAccount(true);
  };
  return (
    <div className={`section-login`}>
      <div className="login">
        <div className="login-section">
          <div className="form-login">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="heading-primary-txt heading-margin form-padding">
                Login to continue.
              </span>
              <div className="form-padding">
                <SocialLogin
                  styleClass={"form-google-button margin-bottom"}
                  type={"GOOGLE"}
                  setOpen={setOpen}
                  figmaLoginId={figmaLoginId}
                />
              </div>
              <p className="form-text-padding margin-bottom">or</p>
            </div>
            <Formik
              initialValues={{ email: userEmail || "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email address is require"),
                password: Yup.string().required("Password is require"),
              })}
              onSubmit={async (values) => {
                setShakeAnim(false);
                const res = await setLogin(values.email, values.password, "User", figmaLoginId);
                if (res && "token" in res) {
                  setOpen(false);
                  if (res?.user?.role === "admin") navigate("/admin/icons");
                  //else navigate("/");
                } else {
                  setShakeAnim(true);
                }
                if (setIsLoginAtempted && typeof setIsLoginAtempted === "function") {
                  setIsLoginAtempted(true)
                }
                setOpen(false);
              }}
            >
              {({ values, isValid }) => {
                const isDisabled =
                  values.email && values.password ? !isValid : true;
                return (
                  <Form>
                    <div>
                      <div className="form-padding margin-bottom">
                        <LabledInputBox
                          name="email"
                          type={"text"}
                          placeholder="Email"
                          autoComplete="off"
                          values={values.email}
                        />
                      </div>
                      <div className="form-padding">
                        <LabledInputBox
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="form-forgot-password">
                      <Link
                        className="form-forgot-password-txt"
                        onClick={handleClick}
                      >
                        Reset Password
                      </Link>
                    </div>
                    <div className="form-padding">
                      <Button
                        customStyle="advance-btn form-button margin-top false"
                        styleName={`margin-top ${
                          isShakeAnim && "animate-share"
                        }`}
                        lable={"Login"}
                        type={"submit"}
                        btnSize="xlg"
                        disabled={isDisabled}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div>
              <p className="account-text-primary">
                Don't have an account?&nbsp;
                <u className="form-forgot-password-txt" onClick={handleAccount}>
                  Sign Up
                </u>
              </p>
            </div>
            <div className="form-padding">
              <SocialLogin
                styleClass={"form-google-button margin-bottom"}
                type={"FACEBOOK"}
                setOpen={setOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
