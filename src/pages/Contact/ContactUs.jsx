import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "./style.module.css";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer-v2/Footer";

import { SupportCard } from "./component/SupportCards/SupportCard";

import { SupportGradient, OSBadge, Success } from "./assets";

import { InputField, Button } from "../../ui";
import { isAuthenticated } from "../../utils/helpers";
import AuthContext from "../../context/AuthProvider";
import useUser from "../../hooks/user/user";
import { Helmet } from "react-helmet";

export const ContactUs = () => {

   const { setContactUs } = useUser();

  const supportCards = [
    {
      label: "Email",
      description:
        "Reach out to us for invoices, renewals, enterprise plans etc.",
      btnLabel: "Send Email",
      btnColor: "#3863FA",
      btnShadow: "0px 6px 30px 0px rgba(56, 99, 250, 0.50)",
      navigate: () => {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Chat",
      description: "Chat with us for quick questions and answers.",
      btnLabel: "Start a Chat Now",
      btnColor: "#A538FA",
      btnShadow: "0px 6px 30px 0px rgba(165, 56, 250, 0.50)",
      navigate: () => {
        if (window.$crisp) {
          window.$crisp.push(["do", "chat:open"]);
        }
      },
    },
    {
      label: "Community",
      description:
        "say hi and post icons request, features, bugs, feedback, and ideas.",
      btnLabel: "Access Community",
      btnColor: "#7238FA",
      btnShadow: "0px 6px 30px 0px rgba(114, 56, 250, 0.50)",
      navigate: function () {
        window.open("https://discord.com/invite/QN3Zwf4KWK");
      },
    },
  ];

  const { auth, setAuth } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [isValid, setIsValid] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const hendelEmailInput = (v) => {
    setValues({
      ...values,
      email: v,
    });
    setIsValid(emailRegex.test(v));
  };
  const hendelNameInput = (v) => {
    setValues({
      ...values,
      name: v,
    });
  };
  const hendelMessageInput = (v) => {
    setValues({
      ...values,
      message: v,
    });
  };

  const handelSubmit = async (values) => {
    const resp = await setContactUs(values);
    console.log(values);
    if (resp) {
      setValues({
        ...values,
        message: "",
      });
      setIsSuccess(true);
    }
  };

  const sectionRef = useRef()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setValues({
        ...values,
        email: user.email,
        name: user?.fullName ? user?.fullName : user?.firstName,
      });
      setIsValid(emailRegex.test(user.email));
    }
  }, [auth]);

  return (
    <div className={Styles.wraper}>
      <NavBar />
      <div className={Styles.support_card_sec}>
        <SupportGradient className={Styles.gradient} />
        <h1>Support</h1>
        <div className={Styles.cards_cont}>
          {supportCards?.map((item, index) => (
            <SupportCard
              key={index}
              label={item?.label}
              btnColor={item?.btnColor}
              btnShadow={item.btnShadow}
              btnlabel={item?.btnLabel}
              description={item?.description}
              navigate={item?.navigate}
            />
          ))}
        </div>
        <div className={Styles.text_cont}>
          <div className={Styles.text_group}>
            <h3>Sales</h3>
            <p>
              If you're a big company or a small one or need something special,
              let us know and we'll find a solution.
            </p>
          </div>
          <div className={Styles.text_group}>
            <h3>Affiliates</h3>
            <p>
              Earn some extra money by promoting our products on your website or
              online media? Contact us to find out how.
            </p>
          </div>
          <div className={Styles.text_group}>
            <h3>Influencers and social media managers</h3>
            <p>
              Use our social media to discuss what creative we can do together.
            </p>
          </div>
        </div>
      </div>
      <div className={Styles.form_sec} ref={sectionRef}>
        <div className={Styles.lft_and_rgt_cont}>
          <div className={Styles.lft}>
            <OSBadge className={Styles.os_badge} />
            <h3>Email us</h3>
            <p>Reach out to us for invoices, renewals, enterprise plans etc.</p>
          </div>
          <div className={Styles.rgt}>
            <div className={Styles.form_cont}>
              {!isSuccess ? (
                <div className={Styles.field_cont}>
                  <InputField
                    width={"100%"}
                    height={"3.125rem"}
                    placeHolder={"Name*"}
                    value={values.name}
                    onChange={hendelNameInput}
                  />
                  <InputField
                    width={"100%"}
                    height={"3.125rem"}
                    placeHolder={"Enter your email address*"}
                    value={values.email}
                    onChange={hendelEmailInput}
                  />
                  <InputField
                    textarea={true}
                    height={"7.5rem"}
                    width={"100%"}
                    placeHolder={"Describe the matter.*"}
                    value={values.message}
                    onChange={hendelMessageInput}
                  />
                  <Button
                    highlight={
                      values.email && values.message && values.name && isValid
                    }
                    disable={!isValid}
                    onClick={() => handelSubmit(values)}
                  >
                    Send Now
                  </Button>
                </div>
              ) : (
                <div className={Styles.success_message}>
                  <Success />
                  <p>
                    Thanks for reaching out. We’ll get back to you as soon as
                    possible.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
