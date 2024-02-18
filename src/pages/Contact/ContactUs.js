import "./style.css";

import { Form, Formik } from "formik";
import {
  LabledInputBox,
  LabelTextBox,
} from "../../components/FormControles/index";
import { Button } from "../../components/Buttons/Button";
import useUser from "../../hooks/user/user";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { S } from "../../assets/svg";
import Footer from "../../components/Footer-v2/Footer";
import NavBar from "../../components/NavBar/NavBar";

function ContactUsForm({ userDet, setContactUs, openModalVerifyMail }) {
  return (
    <Formik
      initialValues={{
        name: userDet?.fullName,
        email: userDet?.email,
        message: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string(),
        email: Yup.string().email(),
        message: Yup.string(),
      })}
      onSubmit={async (values, {resetForm}) => {
        const resp = await setContactUs(values);
        console.log(values);
        if (resp){ 
          resetForm({values:''})
          openModalVerifyMail()
        };
      }}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <div className="signin-input-body">
              <div className="contact-us-text">Contact Us</div>
              <div>
                <LabledInputBox
                  name="name"
                  type="text"
                  placeholder="Name"
                  defaultValue={values.name}
                  value={values.name}
                />
              </div>
              <div>
                <LabledInputBox
                  defaultValue={values.email}
                  value={values.email}
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <LabelTextBox
                  name="message"
                  type="text"
                  placeholder="Message"
                  defaultValue={values.message}
                  value={values.message}
                  onChange={(e) =>
                    setFieldValue("message", e.target.value)
                  }
                />
              </div>
              <div>
                <Button
                  customStyle="advance-btn form-button false"
                  lable={"Send message"}
                  type={"submit"}
                  btnSize={"full"}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export function ContactUs() {
  const { setContactUs } = useUser();
  const navigate = useNavigate();
  const [menuOpenState, setMenuOpenState] = useState(true);

  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const openModalVerifyMail = async () => setIsVerifyOpen(true);
  const { useGetProfile} = useUser();
  const { userDet} = useGetProfile();
  const [user, setUser] = useState(false)
  const [key, setKey] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  useEffect(() => {
    setUser(userDet)
    setKey(Math.random())
  }, [userDet])

  return (
    <>
      <NavBar />
      <div className="contanct-main">
        <div className="contact-container">
          <div className="contact-input-container">
            <div className="contact-us-body">
              <ContactUsForm
                key={key}
                userDet={user}
                setContactUs={setContactUs}
                openModalVerifyMail={openModalVerifyMail}
              />
            </div>
          </div>
        </div>
        <Footer/>
        <ResponsiveModal
          isOpen={isVerifyOpen}
          onClose={() => setIsVerifyOpen(false)}
          closeOnOverlayClick={false}
          component={
           <div className="contact-us-success-modal">
              <S/>
                <h3>
                  We are listening!
                </h3>
                <p>
                  Thank you for contacting us. We’ll get back to you soon.
                </p>
           </div>
          }
        />
      </div>
    </>
  );
}