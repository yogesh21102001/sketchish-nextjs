import React, { useState } from "react";
import Styles from "./style.module.css";

import { IconSlot } from "../assets";
import { Button, InputField } from "../../../ui";
import SocialLogin from "../../SocialLogin";
import useAuth from "../../../hooks/common/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export const Login = ({
  setOpen,
  figmaLoginId,
  userEmail,
  ForgotPassword,
  CreateAccount,
  setIsLoginAtempted,
}) => {
  const navigate = useNavigate();
  const { setLogin } = useAuth();
  const [isShakeAnim, setShakeAnim] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleClick = () => {
    setOpen(false);
    ForgotPassword(true);
  };

  const handleAccount = () => {
    setOpen(false);
    CreateAccount(true);
  };

  const onSubmitHandler = async (v) => {
    console.log(values);
    setShakeAnim(false);
    const res = await setLogin(
      v.email,
      v.password,
      "User",
      figmaLoginId
    );
    if (res && "token" in res) {
      setOpen(false);
      if (res?.user?.role === "admin") navigate("/admin/icons");
    } else {
      setShakeAnim(true);
    }
    if (setIsLoginAtempted && typeof setIsLoginAtempted === "function") {
      setIsLoginAtempted(true);
    }
    setOpen(false);
  };

  const onKeyDownHandler = (event)=>{
    if (event.key === "Enter" || event.key === "Return") {
      onSubmitHandler();
    }
  }

  return (
    <div className={Styles.login_cont}>
      <div className={Styles.lft}>
        <div className={Styles.top_cont}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M5 16.666H27.9169H30.4169H35V29.6949L20 36.7537L5 29.6949V16.666Z"
              fill="white"
            />
            <path
              d="M20.002 5.83398C16.1227 5.83398 12.8927 8.62556 12.2159 12.3098L11.9901 13.5392L9.53125 13.0876L9.75708 11.8582C10.6479 7.00868 14.8945 3.33398 20.002 3.33398C25.755 3.33398 30.4187 7.99768 30.4187 13.7507V16.6673H27.9187V13.7507C27.9187 9.3784 24.3743 5.83398 20.002 5.83398Z"
              fill="white"
            />
            <circle cx="20" cy="25" r="3" fill="#36DC5E" />
          </svg>
          <p>Unlock 15 premium svg icons for free</p>
          <p>+</p>
          <p>ACCESS free 4,654 VECTOR ICONS</p>
        </div>
        <IconSlot className={Styles.icon_slot}/>
      </div>
      <div className={Styles.rgt}>
          <Formik
            initialValues={{ email: values.email, password: values.password }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email address is require"),
              password: Yup.string().required("Password is require"),
            })}
          >
            {({isValid }) => {
              return (
                <Form className={Styles.input_fields_cont}>
                  <div className={Styles.header}>
                    <h3>Login to your account</h3>
                    <p>
                      Don’t have an account?{" "}
                      <span onClick={handleAccount}>Create a free account</span>
                    </p>
                  </div>
                  <SocialLogin className={Styles.btn} setOpen={setOpen} />
                  <p>OR</p>
                  <div className={Styles.fields_wraper}>
                    <InputField
                      placeHolder={"Email"}
                      onChange={(v) => setValues({ ...values, email: v })}
                      value={values.email}
                    />
                    <div>
                      <InputField
                        placeHolder={"Password"}
                        type={"password"}
                        onChange={(v) => setValues({ ...values, password: v })}
                        value={values.password}
                      />
                    </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <Button
                      onKeyDown={onKeyDownHandler}
                      className={`${Styles.btn} ${Styles.login}`}
                      type="submit"
                      onClick={() => onSubmitHandler(values)}
                      disable={values.email && values.password ? false : true}
                    >
                      Continue{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M8.49999 12.7992L13.3 7.99923L8.49999 3.19922"
                          stroke="#1E3050"
                          stroke-width="2"
                        />
                        <path
                          d="M13.3 8L2.09999 8"
                          stroke="#1E3050"
                          stroke-width="2"
                        />
                      </svg>
                    </Button>
                    <span onClick={handleClick}>Forgot your password?</span>
                  </div>
                </Form>
              );
            }}
          </Formik>
        <div >
        </div>
      </div>
    </div>
  );
};
