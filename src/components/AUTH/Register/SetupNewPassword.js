import { Formik, Form } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/common/useAuth";
import ModalSide from "../../custom/ModalSide";
// import { Button } from "../../Buttons/Button";
import { Button } from "../../../ui";
import React from "react";
import { LabledInputBox } from "../../FormControles/LabledInputBox/LabledInputBox";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../../utils/notify";

export function SetupNewPassword({ hash, setOpen, type = "CREATE_NEW_ACCT" }) {
  const { setPassword } = useAuth();
  const navigate = useNavigate();
  const validate = Yup.object({
    password: Yup.string()
      .required("No password provided.")
      .min(6, "Password is too short"),

    confirmPassword: Yup.string()
      .required("No password provided.")
      .min(6, "Password is too short")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const onDone = (status) => {
    setOpen(false)
    navigate('/')
  }

  return (
    <>
      {
        <div className="section-login" style={{ height: '450px' }}>
          <div className="login">
            <div className="login-section">
              {/* <ModalSide /> */}
              <div className="form-login">
                <span className="verify-suc-main heading-margin">
                  <span className="heading-primary-txt  form-padding">
                    Set Your Password <br />
                  </span>
                  <div className="vs-content ">
                    Your new password must be different to previously used
                    password.
                  </div>
                </span>
                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  validationSchema={validate}
                  onSubmit={async (values, { setSubmitting }) => {
                    const res = await setPassword({
                      hash,
                      password: values.password,
                      type,
                    }, onDone);
                    if (res === "Password set successfully") {
                      setOpen(false);
                      notifySuccess("Password set successfully");
                      setSubmitting(false);
                      window.location.replace("/");
                    }
                  }}
                >
                  {({ isValid, values, errors }) => {
                    const isDisabled = values.password ? !isValid : true;
                    return (
                      <Form>
                        <div>
                          <div className="form-padding margin-bottom">
                            <LabledInputBox
                              name="password"
                              type="password"
                              placeholder="New password"
                              autoComplete="off"
                            />
                          </div>
                          <div className="form-padding margin-bottom">
                            <LabledInputBox
                              name="confirmPassword"
                              type="password"
                              placeholder="Confirm password"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="form-padding">
                          <Button
                            highlight={!isDisabled}
                            disable={isDisabled}
                            width={"100%"}
                            type={"submit"}
                          >Set a password</Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
                <div style={{ height: '50px;' }}></div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
