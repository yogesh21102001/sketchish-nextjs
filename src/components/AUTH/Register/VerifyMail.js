import "../style.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import useUser from "../../../hooks/user/user";
import { Button } from "../../Buttons/Button";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";

export function VerifyMail({
  setOpen,
  setVerifyMailOpen,
  setLoginOpen,
}) {
  const { setRegisterUser } = useUser();
  const validate = Yup.object({
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
    firstName: Yup.string().required("First name is required"),
  });
  const handelTerns = () => {
    window.open("/termsandconditions");
  };
  const handelPolicy = () => {
    window.open("/privacypolicy");
  };
  const handelLogin = (e) => {
    e.preventDefault()
    setOpen(false);
    setLoginOpen(true);
  };
  return (
    <>
      <div className="section-login">
        <div className="login">
          <div className="login-section">
            <div className="form-login">
              <div>
                <span className="heading-primary-txt heading-margin form-padding">
                  Sign up for a free.
                </span>
              </div>
              <Formik
                initialValues={{ email: "", password: "", firstName: "" }}
                validationSchema={validate}
                validateOnBlur={false}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(false);
                  const res = await setRegisterUser({
                    email: values?.email,
                    password: values?.password,
                    firstName: values?.firstName,
                  });

                  localStorage.setItem("verifyMail", values?.email);
                  if (!res) {
                    setOpen(false);
                    setLoginOpen(true);
                  } else {
                    setOpen(false);
                    setVerifyMailOpen(true);
                  }
                }}
              >
                {({ isValid, values }) => {
                  const isDisabled = values.email ? !isValid : true;
                  return (
                    <Form>
                      <div>
                        <div className="form-padding">
                          <LabledInputBox
                            name="email"
                            type="text"
                            placeholder="Email"
                            autoComplete="off"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                            style={{ color: "red", marginTop: "5px", fontSize: "12px" }}
                          />
                        </div>
                        <div className="form-padding margin-t-20">
                          <LabledInputBox
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            autoComplete="off"
                          />
                        </div>
                        <div className="form-padding margin-t-20">
                          <LabledInputBox
                            name="firstName"
                            type="text"
                            placeholder="What should we call you?"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="form-padding">
                        <Button
                          customStyle="advance-btn form-button margin-top false"
                          styleName={"margin-top"}
                          lable={"Continue"}
                          type={"submit"}
                          btnSize="lg"
                          disabled={isDisabled}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <p className="account-text-primary margin-t-20">
                Already have an account? &nbsp;
                <u
                  className="account-text-primary"
                  onClick={handelLogin}
                >
                  Login
                </u>
              </p>
              <div>
                <p className="form-footer-text margin-t-50">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
