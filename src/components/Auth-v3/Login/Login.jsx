import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";

import { InputField, Button } from "../../../ui";
import SocialLogin from "../../SocialLogin";

import useAuth from "../../../hooks/common/useAuth";
import useUser from "../../../hooks/user/user";
import { useNavigate } from "react-router-dom";

export const Login = ({
  setOpen,
  figmaLoginId,
  setIsLoginAtempted,
  setIsSignUpSuccess
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("loaded", true);
  }, []);

  const { setLogin, findAccountInDB, verifyEmail, setForgotPassword } =
    useAuth();
  const { setRegisterUser } = useUser();
  const [findAccountResp, setFindAccountResp] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [forgotPassword, setForgotPasswordLink] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [signUpCode, setSignUpCode] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const [key, setKey] = useState(Math.random());

  const onSubmitHandler = async (v) => {
    const resp = await findAccountInDB({
      userEmail: v,
    });

    setFindAccountResp(resp);

    console.log(">>>Find Account Resp>>>", resp);
  };

  const hendelEmailInput = (v) => {
    setEmailValue(v);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(v));
  };

  const loginHandler = async (v) => {
    const res = await setLogin(v.email, v.password, "User", figmaLoginId);
    if (res && "token" in res) {
      console.log("::::::::::::", res);
      setOpen(false);
      sessionStorage.removeItem("accountInfo");
      sessionStorage.removeItem("loaded");
      if (res?.user?.role === "admin") navigate("/admin/icons");
    }
    if (setIsLoginAtempted && typeof setIsLoginAtempted === "function") {
      setIsLoginAtempted(true);
    }
    // setOpen(false);
  };

  const verifyOTPhendler = async (v) => {
    const payload = {
      userEmail: v.userEmail,
      code: v.code,
    };

    const resp = await verifyEmail(payload);
    if (resp) {
      const data = sessionStorage.getItem("accountInfo");
      setFindAccountResp(JSON.parse(data));
    }
  };

  const resetPassLinkHandler = async (v) => {
    const resp = await setForgotPassword({
      userEmail: v,
    });
    if (resp) {
      setForgotPasswordLink(false);
      sessionStorage.removeItem("loaded");
    }
  };

  const signUpHendler = async (values) => {
    const res = await setRegisterUser({
      email: values?.email,
      password: values?.password,
      firstName: values?.firstName,
    });

    if (!res) {
      setOpen(false);
      sessionStorage.removeItem("accountInfo");
      sessionStorage.removeItem("loaded");
    } else {
      sessionStorage.removeItem("accountInfo");
      sessionStorage.removeItem("loaded");
      setIsSignUpSuccess(true)
      setOpen(false);
    }
  };

  const handleFindEmailKeyPress = (event) => {
    if (event.key === "Enter" || event.key === "Return") {
      loginHandler({
        email: emailValue,
        password: password,
      });
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem("accountInfo");
    const userEmail = sessionStorage.getItem("userEmail");
    if (data) {
      setFindAccountResp(JSON.parse(data));
      setEmailValue(userEmail);
    }
  }, []);

  return (
    <div className={Styles.login_wraper}>
      <div className={Styles.login_cont}>
        {findAccountResp?.hasAccount &&
        !findAccountResp?.hasPassword &&
        findAccountResp?.emailVerified ? (
          <>
            <div className={Styles.top}>
              <div className={Styles.wlc_txt_cont}>
                <h3 className={Styles.wlc_text}>
                  Welcom to opentroke<span>icons</span>
                </h3>
                <p>First things first, tell us a bit about yourself.</p>
              </div>
              <div className={Styles.inp_field_cont}>
                <div className={Styles.inp_cont}>
                  <InputField
                    placeHolder={"What should we call you?"}
                    value={firstName}
                    onChange={setFirstName}
                  />

                  <InputField
                    placeHolder={"Password"}
                    value={password}
                    type={"password"}
                    onChange={setPassword}
                  />
                </div>

                <Button
                  onClick={() =>
                    signUpHendler({
                      email: emailValue,
                      password: password,
                      firstName: firstName,
                    })
                  }
                  highlight={firstName && password ? true : false}
                  className={Styles.social_login_btn}
                  style={{ fontWeight: "400" }}
                  textStyle={"capitalize"}
                  disable={firstName && password ? false : true}
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {!findAccountResp.userVerified && (
              <>
                <div className={Styles.top}>
                  <h2>Log In</h2>
                  <SocialLogin
                    className={Styles.social_login_btn}
                    setOpen={setOpen}
                  />
                  <div className={Styles.hr_line}></div>
                  <div className={Styles.inp_field_cont}>
                    <div className={Styles.inp_cont}>
                      <InputField
                        onKeyDown={(event) => handleFindEmailKeyPress(event)}
                        placeHolder={"Email"}
                        value={emailValue}
                        onChange={hendelEmailInput}
                        onCross={
                          emailValue
                            ? () => {
                                setEmailValue("");
                                if (!forgotPassword) {
                                  sessionStorage.removeItem("accountInfo");
                                  setFindAccountResp("");
                                }
                              }
                            : ""
                        }
                      />

                      {!forgotPassword && (
                        <>
                          {findAccountResp &&
                            !findAccountResp?.sentVerificationCode &&
                            findAccountResp?.hasPassword && (
                              <InputField
                                placeHolder={"Password"}
                                value={password}
                                type={"password"}
                                onChange={setPassword}
                              />
                            )}

                          {findAccountResp?.sentVerificationCode && (
                            <>
                              <p className={Styles.sign_up_code_txt}>
                                We just sent you a temporary sign up code. Paste
                                the sign up code below.
                              </p>

                              <InputField
                                placeHolder={"Paste sign up code"}
                                value={signUpCode}
                                onChange={setSignUpCode}
                                maxLength={6}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {!findAccountResp?.sentVerificationCode &&
                      !findAccountResp?.hasPassword &&
                      !findAccountResp?.hasAccount &&
                      !findAccountResp?.emailVerified &&
                      !forgotPassword && (
                        <Button
                          onClick={() => onSubmitHandler(emailValue)}
                          highlight={emailValue && isValid ? true : false}
                          className={Styles.social_login_btn}
                          style={{ fontWeight: "400" }}
                          textStyle={"capitalize"}
                          disable={emailValue && isValid ? false : true}
                        >
                          Continue with email
                        </Button>
                      )}

                    {findAccountResp?.sentVerificationCode &&
                      !forgotPassword && (
                        <Button
                          onClick={() =>
                            verifyOTPhendler({
                              userEmail: emailValue,
                              code: signUpCode,
                            })
                          }
                          highlight={signUpCode ? true : false}
                          className={Styles.social_login_btn}
                          style={{ fontWeight: "400" }}
                          textStyle={"capitalize"}
                          disable={signUpCode ? false : true}
                        >
                          Create new account
                        </Button>
                      )}

                    {findAccountResp &&
                      !findAccountResp?.sentVerificationCode &&
                      findAccountResp?.hasPassword &&
                      !forgotPassword && (
                        <Button
                          onClick={() =>
                            loginHandler({
                              email: emailValue,
                              password: password,
                            })
                          }
                          highlight={isValid && password ? true : false}
                          className={Styles.social_login_btn}
                          style={{ fontWeight: "400" }}
                          textStyle={"capitalize"}
                          disable={isValid && password ? false : true}
                        >
                          Continue with password
                        </Button>
                      )}

                    {forgotPassword && (
                      <Button
                        onClick={() => resetPassLinkHandler(emailValue)}
                        highlight={emailValue && isValid ? true : false}
                        className={Styles.social_login_btn}
                        style={{ fontWeight: "400" }}
                        textStyle={"capitalize"}
                        disable={emailValue && isValid ? false : true}
                      >
                        Send reset code
                      </Button>
                    )}
                    {/* Forgot pass link */}

                    {findAccountResp &&
                      findAccountResp?.hasPassword &&
                      !forgotPassword && (
                        <p onClick={() => setForgotPasswordLink(true)}>
                          Forgot password?
                        </p>
                      )}

                    {forgotPassword && (
                      <p
                        onClick={() => {
                          setForgotPasswordLink(false);
                          const userEmail = sessionStorage.getItem("userEmail");
                          if (userEmail) {
                            setEmailValue(userEmail);
                          }
                        }}
                      >
                        Continue login
                      </p>
                    )}
                  </div>
                </div>
                <p className={Styles.btm_txt}>
                  By clicking “Continue with Google/Email” above, you
                  acknowledge that you have read and <br /> understood, and
                  agree to Openstrokeicons®{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      setOpen(false);
                      sessionStorage.removeItem("loaded");
                      navigate("/termsandconditions");
                    }}
                  >
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      setOpen(false);
                      sessionStorage.removeItem("loaded");
                      navigate("/privacypolicy");
                    }}
                  >
                    Privacy policy.
                  </span>
                </p>
              </>
            )}
          </>
        )}
        {findAccountResp.userVerified && (
          <>
            <div className={Styles.top}>
              <div className={Styles.wlc_txt_cont}>
                <h3 className={Styles.wlc_text}>
                  Welcom to opentroke<span>icons</span>
                </h3>
                <p>First things first, tell us a bit about yourself.</p>
              </div>
              <div className={Styles.inp_field_cont}>
                <div className={Styles.inp_cont}>
                  <div className={Styles.input_field_placeholder}>
                    <p>What should we call you?</p>
                    <InputField
                      placeHolder={"Enter your name"}
                      value={firstName}
                      onChange={setFirstName}
                    />
                  </div>
                  <div className={Styles.input_field_placeholder}>
                    <p>Set a password</p>
                    <InputField
                      placeHolder={"Password"}
                      value={password}
                      type={"password"}
                      onChange={setPassword}
                    />
                  </div>
                </div>

                <Button
                  onClick={() =>
                    signUpHendler({
                      email: emailValue,
                      password: password,
                      firstName: firstName,
                    })
                  }
                  highlight={firstName && password ? true : false}
                  className={Styles.social_login_btn}
                  style={{ fontWeight: "400" }}
                  textStyle={"capitalize"}
                  disable={firstName && password ? false : true}
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
