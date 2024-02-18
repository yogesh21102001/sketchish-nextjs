import React, { useState } from "react";
import Styles from "../Login/style.module.css";

import { IconSlot } from "../assets";
import { Button, InputField } from "../../../ui";
import SocialLogin from "../../SocialLogin";
import useUser from "../../../hooks/user/user";
import { Link, useNavigate } from "react-router-dom";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export const Signup = ({ setOpen, setVerifyMailOpen, setLoginOpen }) => {
  const navigate = useNavigate();
  const { setRegisterUser } = useUser();
  const [isShakeAnim, setShakeAnim] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
  });

  const handelLogin = (e) => {
    e.preventDefault();
    setOpen(false);
    setLoginOpen(true);
  };

    const handelTerns = () => {
      window.open("/termsandconditions");
    };
    const handelPolicy = () => {
      window.open("/privacypolicy");
    };

  const onSubmitHandler = async (values) => {
    const res = await setRegisterUser({
      email: values?.email,
      password: values?.password,
      firstName: values?.firstName,
    });

    localStorage.setItem("verifyMail", values?.email);
    localStorage.setItem("verifrom", "sugnUp");
    if (!res) {
      setOpen(false);
      setLoginOpen(true);
    } else {
      setOpen(false);
      setVerifyMailOpen(true);
    }
  };

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
        <IconSlot className={Styles.icon_slot} />
      </div>
      <div className={Styles.rgt}>
        <Formik
          initialValues={{
            email: values.email,
            password: values.password,
            firstName: values.firstName,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Invalid email address"
              )
              .required("Email address is required"),
            password: Yup.string().required("Password is required"),
            firstName: Yup.string().required("First name is required"),
          })}
        >
          {({ isValid }) => {
            return (
              <Form className={Styles.input_fields_cont}>
                <div className={Styles.header}>
                  <h3>Create free account</h3>
                  <p>
                    15 premium svg icons free, access to free quality vector
                    icons
                  </p>
                </div>
                {/* <SocialLogin className={Styles.btn} />
                <p>OR</p> */}
                <div className={Styles.fields_wraper}>
                  <InputField
                    placeHolder={"Email"}
                    onChange={(v) => setValues({ ...values, email: v })}
                    value={values.email}
                  />
                  <InputField
                    placeHolder={"Password"}
                    type={"password"}
                    onChange={(v) => setValues({ ...values, password: v })}
                    value={values.password}
                  />

                  <InputField
                    placeHolder={"What should we call you?"}
                    onChange={(v) => setValues({ ...values, firstName: v })}
                    value={values.firstName}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <Button
                    className={`${Styles.btn} ${Styles.login}`}
                    type="submit"
                    onClick={() => onSubmitHandler(values)}
                    disable={
                      values.email && values.password && values.firstName
                        ? false
                        : true
                    }
                  >
                    Continue
                  </Button>
                  <p className={Styles.other_link}>
                    Already have an account?{" "}
                    <span onClick={handelLogin}>Login here</span>
                  </p>
                </div>
                <p className={Styles.terms_conditions}>
                  By clicking “Continue” above, you acknowledge that you have
                  read and understood,
                  <br />
                  and agree to OpenStroke®&nbsp;
                  <u className="footer-text-primary" onClick={handelTerns}>
                    Terms & Conditions
                  </u>
                  &nbsp; and &nbsp;
                  <u className="footer-text-primary" onClick={handelPolicy}>
                    Privacy policy.
                  </u>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
